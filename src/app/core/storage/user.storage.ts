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
  private jwt: string = null;
  private user: User = null;

  constructor(private storage: Storage) {
  }

  async getJwt(): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      if (this.jwt === null) {
        this.jwt = await this.storage.get(this.JWT_KEY_NAME);
      }
      resolve(this.jwt);
    });
  }

  getUser(): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      if (this.user === null) {
        this.user = JSON.parse(await this.storage.get(this.USER_KEY_NAME));
      }
      resolve(this.user);
    });
  }

  async setUser(user: User) {
    await this.storage.set(this.USER_KEY_NAME, JSON.stringify(user));
  }

  async setJwt(jwt) {
    await this.storage.set(this.JWT_KEY_NAME, jwt);
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


  isLoggedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getJwt().then((jwt: string) => {
        if (jwt === null || jwt === '') {
          resolve(false);
        }
        const helper = new JwtHelperService();
        const isExpired = helper.isTokenExpired(jwt);
        resolve(!isExpired);
      }).catch(e => {
        reject(e);
      });
    });
  }
}
