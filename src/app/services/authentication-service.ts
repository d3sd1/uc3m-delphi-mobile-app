import {Platform, ToastController} from '@ionic/angular';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UserLogin} from '../login/user-login';
import {JwtHelperService} from '@auth0/angular-jwt';


const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform, private http: HttpClient, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
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
      this.http.post<UserLogin>('http://localhost:8080/v1/session/login', user).subscribe((userLogin: UserLogin) => {
        this.storage.set(TOKEN_KEY, userLogin.jwt).then(() => {
          this.authenticationState.next(true);
          this.sendToast('Conexión satisfactoria').then(r => resolve(userLogin));
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
      });
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.storage.get(TOKEN_KEY).then((jwt) => {
        const helper = new JwtHelperService();
        //const decodedToken = helper.decodeToken(jwt);
        //const expirationDate = helper.getTokenExpirationDate(jwt);
        const isExpired = helper.isTokenExpired(jwt);
        if (!isExpired) {
          resolve(true);
        }
        resolve(false);
      });
    });
    // return this.authenticationState.value; // TODO check if this works when opening app as logged or not logged user
  }

}
