import {Platform} from '@ionic/angular';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../../logged-in/user';
import {LoginResponse} from '../consumer/login/login.response';


@Injectable({
  providedIn: 'root'
})
export class UserStorage {
  private jwt: string;
  private user: User;

  constructor(private  storage: Storage,
              private plt: Platform) {
    this.readStorageJwt();
    this.readStorageUser();
  }

  getJwt() {

  }

  getUser() {
    this.storage.get('JWT_TOKEN');
  }

  setUser() {

  }

  setJwt(userLogin: LoginResponse) {

  }

  needsOnboard(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      /*this.getUser().then((user: User) => {
        resolve(user.needsOnboard);
      }).catch(() => {
        reject();
      });*/
    });
  }

  private readStorageUser() {

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

  private readStorageJwt() {

  }

}
