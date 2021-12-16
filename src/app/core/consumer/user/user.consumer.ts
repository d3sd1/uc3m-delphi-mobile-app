import {Injectable} from '@angular/core';
import {LoginResponse} from './login.response';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LoginUser} from './login.user';
import {Storage} from '@ionic/storage';
import {WsService} from '../../service/ws.service';
import {TranslateService} from '@ngx-translate/core';
import {User} from '../../model/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
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
              private router: Router,
              private jwtService: JwtService) {
    this.handleUser();
  }

  private handleUser() {
    this.wsService.subscribe('profile', true, this.connectedUser);
  }

  recoverPassword(email) {
    this.http.put(environment.apiUrl + '/password/recover', {email}).subscribe((res) => {
      console.log('pass recover ok');
    });
  }

  resetPassword(email, code, then, catched, finallied) {
    this.http.put(environment.apiUrl + '/password/reset', {email, code}).subscribe(then, catched, finallied);
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
        resolve('Conexión satisfactoria.');
      }, async (err: HttpErrorResponse) => {
        if (err.status === 400 && err.error.message === 'INVALID_LOGIN') {
          reject('Conexión inválida.');
        } else if (err.status === 400 && err.error.message === 'USER_BLOCKED') {
          reject('Tu usuario ha sido bloqueado.');
        } else if (err.status === 400) {
          reject('Conexión incorrecta.');
        } else if (err.status === 500) {
          reject('Conexión incorrecta.');
        }
        reject('No se ha podido conectar con el servidor.');
      });
    });
  }

  async doLogout() {
    await this.connectedUser.next(null);
    await this.jwtService.setJwt(null);
    await this.wsService.disconnectWs();
  }


}
