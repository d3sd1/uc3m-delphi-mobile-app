import {Injectable} from '@angular/core';
import {LoginResponse} from './login.response';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LoginUser} from './login.user';
import {Storage} from '@ionic/storage';
import {UserStorage} from '../../storage/user.storage';
import {WsService} from '../../ws/ws.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LoginConsumer {

  constructor(private http: HttpClient,
              private storage: Storage,
              private userStorage: UserStorage,
              private wsService: WsService,
              private translate: TranslateService) {
  }

  doLogin(user: LoginUser): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.http.post<LoginResponse>(environment.apiUrl + '/v1/session/login', user).subscribe(async (userLogin: LoginResponse) => {
        await this.userStorage.setJwt(userLogin.jwt);
        await this.userStorage.setUser(userLogin.user);
        await this.wsService.connectWs(userLogin.jwt);
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

}
