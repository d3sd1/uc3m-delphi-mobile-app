import {Platform, ToastController} from '@ionic/angular';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UserLogin} from '../model/user-login';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../environments/environment';
import {User} from '../model/user';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private  storage: Storage,
              private plt: Platform,
              private http: HttpClient,
              private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get('JWT_TOKEN').then((jwt) => {
      if (jwt !== '' && jwt !== null) {
        this.authenticationState.next(true);
      }
    });
  }

  async sendToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    await toast.present();
  }


  login(user): Promise<UserLogin> {
    return new Promise<UserLogin>((resolve, reject) => {
      this.http.post<UserLogin>(environment.apiUrl + '/v1/session/login', user).subscribe((userLogin: UserLogin) => {
        this.storage.set('JWT_TOKEN', userLogin.jwt).then(() => {
          this.authenticationState.next(true);
          this.sendToast('Conexión satisfactoria').then(r => resolve(userLogin));
        }).catch((e) => {
          console.log('ERROR EN LOGIN -> ', e);
          reject();
        });

      }, (err: HttpErrorResponse) => {
        if (err.status === 400 && err.error.message === 'INVALID_LOGIN') {
          this.sendToast('Credenciales inválidas').then(r => reject());
        } else if (err.status === 400 && err.error.message === 'USER_BLOCKED') {
          this.sendToast('Usuario bloqueado').then(r => reject());
        } else if (err.status === 400) {
          this.sendToast('Error en la aplicación').then(r => reject());
        } else if (err.status === 500) {
          this.sendToast('Error en el servidor').then(r => reject());
        } else {
          this.sendToast('Error desconocido').then(r => reject());
        }
        reject();
      });
    });
  }

  async logout() {
    await this.storage.set('JWT_TOKEN', null);
    this.authenticationState.next(false);
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.storage.get('JWT_TOKEN').then((jwt) => {
        if (jwt === null || jwt === '') {
          resolve(false);
        }
        const helper = new JwtHelperService();
        const isExpired = helper.isTokenExpired(jwt);
        if (!isExpired) {
          resolve(true);
        }
        resolve(false);
      }).catch(e => {
        reject(false);
      });
    });
  }

  getUser(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.storage.get('JWT_TOKEN').then((jwt) => {
        if (jwt === null || jwt === '') {
          resolve(null);
        }
        const helper = new JwtHelperService();
        const jwtData = helper.decodeToken(jwt);
        resolve(jwtData.user);
      }).catch(e => {
        reject(false);
      });
    });
  }

}
