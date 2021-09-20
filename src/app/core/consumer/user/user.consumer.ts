import {Injectable} from '@angular/core';
import {LoginResponse} from './login.response';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {LoginUser} from './login.user';
import {Storage} from '@ionic/storage';
import {WsService} from '../../ws/ws.service';
import {TranslateService} from '@ngx-translate/core';
import {DatabaseService} from '../database.service';
import {User} from '../../model/user';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Language} from '../../model/language';
import {Media} from '../../model/media';
import {BehaviorSubject} from 'rxjs';
import {LangService} from '../../lang/lang.service';

@Injectable({
  providedIn: 'root'
})
export class UserConsumer {

  private userConsumerCache;
  private userUpdater = new BehaviorSubject<User>(null);
  private jwtUpdater = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient,
              private storage: Storage,
              private wsService: WsService,
              private translate: TranslateService,
              private databaseService: DatabaseService,
              private langService: LangService) {
    this.reset();
  }

  async publishChanges() {
    if (this.userUpdater.getValue() !== null) {
      this.userUpdater.next(this.userConsumerCache.user);
    }
    await this.wsService.publish(`profile/${this.userConsumerCache.user.id}`, this.userConsumerCache.user);
  }

  async recoverPassword(email) {
    await this.http.post(environment.apiUrl + '/v1/session/password/recover', {email: email}).toPromise();
  }

  async resetPassword(email, code): Promise<any> {
    return this.http.post(environment.apiUrl + '/v1/session/password/reset', {email: email, code: code}).toPromise();
  }
  async getJwt(): Promise<string> {
    return localStorage.getItem('jwt');
  }

  async getUser(): Promise<BehaviorSubject<User>> {
    if (this.jwtUpdater.getValue() === null || this.userUpdater.getValue() == null) {
      await this.init();
    }
    return this.userUpdater;
  }

  async updatePicture(newPhoto: FormData) {
    const res = await this.http.post<Media>(environment.apiUrl + '/v1/media/upload', newPhoto, {headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})}).toPromise();
    this.userConsumerCache.user.photo = environment.apiUrl + '/v1/media/fetch/' + res.id;
await this.http.post(environment.apiUrl + '/v1/profile/photo', this.userConsumerCache.user).toPromise();
    await this.publishChanges();
  }

  async updateCv(cv: FormData) {
    await this.http.post(environment.apiUrl + '/v1/profile/cv', cv, {headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})}).toPromise();
    await this.publishChanges();
  }

  async changePass(reset) {
    this.http.post(environment.apiUrl + '/v1/profile/change_pass', reset).toPromise().then((suc) => {
      console.log(suc);
    }).catch((e) => {
      console.error(e);
    });
  }

  async updateNotificationPreferences(enabled: boolean) {
    await this.http.post(environment.apiUrl + '/v1/profile/notifications?enabled=' + enabled, {}).toPromise();
    this.userConsumerCache.user.notificationStatus = enabled;
    await this.publishChanges();
  }

  async updateOnboard(needsOnboard: boolean) {
    await this.http.post(environment.apiUrl + '/v1/profile/onboard?status=' + needsOnboard, {}).toPromise();
    this.userConsumerCache.user.needsOnboard = needsOnboard;
    await this.publishChanges();
  }

  async updateLanguage(lang: Language) {
    lang.name = lang.name.toLowerCase();
    this.userConsumerCache.user.language = lang;
    this.langService.changeLanguage(lang);
    await this.http.post(environment.apiUrl + '/v1/profile/lang?language_id=' + lang.id, {}).toPromise();
    await this.publishChanges();
  }

  async updateNameSurnames(name: string, surnames: string) {
    this.userConsumerCache.user.name = name;
    this.userConsumerCache.user.surnames = surnames;
    await this.http.post(environment.apiUrl + '/v1/profile/setup', this.userConsumerCache.user).toPromise();
    await this.publishChanges();
  }

  async fetchDatabaseCache() {

  }

  async createTable() {

  }

  async dropSession() {
    this.jwtUpdater.next(null);
  }

  async storeSession(userLogin: LoginResponse) {
    await localStorage.setItem('jwt', userLogin.jwt);
  }

  doLogin(user: LoginUser): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.http.post<LoginResponse>(environment.apiUrl + '/v1/session/login', user).subscribe(async (loginResponse: LoginResponse) => {
        await this.storeSession(loginResponse);
        await this.wsService.disconnectWs();
        await this.wsService.connectWs(loginResponse.jwt);
        resolve(await this.translate.get('login.response.ok').toPromise());
      }, async (err: HttpErrorResponse) => {
        if (err.status === 400 && err.error.message === 'INVALID_LOGIN') {
          reject(await this.translate.get('login.response.invalid').toPromise());
        } else if (err.status === 400 && err.error.message === 'USER_BLOCKED') {
          reject(await this.translate.get('login.response.blocked').toPromise());
        } else if (err.status === 400) {
          reject(await this.translate.get('login.response.err.app').toPromise());
        } else if (err.status === 500) {
          reject(await this.translate.get('login.response.err.server').toPromise());
        }
        reject(await this.translate.get('login.response.err.desc').toPromise());
      });
    });
  }

  async isLoggedIn(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      if (this.userConsumerCache.jwt === '' ||
        this.userConsumerCache.jwt === undefined ||
        this.userConsumerCache.jwt === null) {
        await this.fetchDatabaseCache();
      }
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(this.userConsumerCache.jwt);
      resolve(!isExpired);
    });
  }

  async doLogout() {
    this.reset();
    await this.dropSession();
    await this.wsService.disconnectWs();
    await this.databaseService.resetDatabase();
  }

  private reset() {
    this.userConsumerCache = {
      jwt: '',
      user: new User()
    };
  }

  private async init() {
    this.reset();
    await this.fetchDatabaseCache();
  }

}
