import {Injectable} from '@angular/core';
import {LoginResponse} from './login.response';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LoginUser} from './login.user';
import {Storage} from '@ionic/storage';
import {WsService} from '../../service/ws.service';
import {TranslateService} from '@ngx-translate/core';
import {DatabaseService} from '../database.service';
import {User} from '../../model/user';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BehaviorSubject} from 'rxjs';
import {Router, UrlTree} from '@angular/router';
import {JwtService} from '../../service/jwt.service';
import {WsMode} from '../../ws/ws-mode.model';

@Injectable({
  providedIn: 'root'
})
export class UserConsumer {

  private connectedUser = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
              private storage: Storage,
              private wsService: WsService,
              private translate: TranslateService,
              private databaseService: DatabaseService,
              private router: Router,
              private jwtService: JwtService) {
    this.handleUser();
  }

  private handleUser() {
    this.wsService.subscribe('profile', true, this.connectedUser);
  }

  async recoverPassword(email) {
    await this.http.put(environment.apiUrl + '/password/recover', {email}).toPromise();
  }

  async resetPassword(email, code): Promise<any> {
    return this.http.post(environment.apiUrl + '/password/reset', {email, code}).toPromise();
  }

  updateUserOnboarding(name: string, surnames: string) {
    this.wsService.publish('profile', {name, surnames, needsOnboard: false}, WsMode.UPDATE);
  }

  getUser(): BehaviorSubject<User> {
    return this.connectedUser;
  }


  doLogin(user: LoginUser): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.http.post<LoginResponse>(environment.apiUrl + '/login', user).subscribe(async (loginResponse: LoginResponse) => {
        this.jwtService.setJwt(loginResponse.jwt);
        resolve(this.translate.get('login.response.ok').toPromise());
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

  doLogout() {
    this.connectedUser.next(null);
    this.jwtService.setJwt(null);
    this.wsService.disconnectWs();
  }


}
