import {Injectable} from '@angular/core';
import {LoginResponse} from './login.response';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LoginUser} from './login.user';
import {Storage} from '@ionic/storage';
import {UserStorage} from '../../storage/user.storage';

@Injectable({
  providedIn: 'root'
})
export class LoginConsumer {

  constructor(private http: HttpClient,
              private storage: Storage,
              private userStorage: UserStorage) {
  }

  doLogin(user: LoginUser): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.http.post<LoginResponse>(environment.apiUrl + '/v1/session/login', user).subscribe((userLogin: LoginResponse) => {
        this.userStorage.setJwt(userLogin);
        resolve('Conexión satisfactoria');
      }, (err: HttpErrorResponse) => {
        if (err.status === 400 && err.error.message === 'INVALID_LOGIN') {
          reject('Credenciales inválidas');
        } else if (err.status === 400 && err.error.message === 'USER_BLOCKED') {
          reject('Usuario bloqueado');
        } else if (err.status === 400) {
          reject('Error en la aplicación');
        } else if (err.status === 500) {
          reject('Error en el servidor');
        }
        reject('Error desconocido');
      });
    });
  }

}
