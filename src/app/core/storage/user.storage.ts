import {Platform} from '@ionic/angular';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../../logged-in/user';


@Injectable({
  providedIn: 'root'
})
export class UserStorage {
  private JWT_KEY_NAME = 'JWT_TOKEN_STR';
  private USER_KEY_NAME = 'USER_ENCODED';
  private jwt: any;
  private user: User;

  constructor(private  storage: Storage,
              private plt: Platform) {
    this.readStorageJwt();
    this.readStorageUser();
  }

  getJwt(): object {
    return this.jwt;
  }

  getUser(): User {
    return this.user;
  }

  async setUser(user: User) {
    console.log('STORE USER: ', user);
    await this.storage.set(this.USER_KEY_NAME, JSON.stringify(user));
  }

  async setJwt(jwt) {
    await this.storage.set(this.JWT_KEY_NAME, JSON.stringify(jwt));
  }

  private async readStorageJwt() {
    this.jwt = new JwtHelperService().decodeToken(await this.storage.get(this.JWT_KEY_NAME));
    console.log(new JwtHelperService().decodeToken(await this.storage.get(this.JWT_KEY_NAME)));
  }

  private async readStorageUser() {
    this.user = JSON.parse(await this.storage.get(this.USER_KEY_NAME));
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

}
