import {Platform} from '@ionic/angular';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../../logged-in/user';
import {WsService} from '../ws/ws.service';


@Injectable({
  providedIn: 'root'
})
export class UserStorage {
  private JWT_KEY_NAME = 'JWT_TOKEN_STR';
  private USER_KEY_NAME = 'USER_ENCODED';
  private user: User = null;

  constructor(private storage: Storage,
              private wsService: WsService) {
  }

  async getJwt(): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      resolve(await this.storage.get(this.JWT_KEY_NAME));
    });
  }

  getUser(): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      resolve(JSON.parse(await this.storage.get(this.USER_KEY_NAME)));
    });
  }

  async setUser(user: User) {
    await this.storage.set(this.USER_KEY_NAME, JSON.stringify(user));
  }

  async setJwt(jwt) {
    await this.storage.set(this.JWT_KEY_NAME, jwt);
  }

  async logout() {
    await this.storage.clear();
    await this.setUser(null);
    await this.setJwt(null);
    await this.storage.remove(this.USER_KEY_NAME);
    await this.storage.remove(this.JWT_KEY_NAME);

    await this.wsService.disconnectWs();
  }

  needsOnboard(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getUser().then((user: User) => {
        resolve(user.needsOnboard);
      }).catch(() => {
        reject();
      });
    });
  }

  async hasRole(roleName: string) {
    const user = await this.getUser();
    /*const roleIdx = user.roles.findIndex((role: Role) => {
      return role.name === roleName;
    });
    return roleIdx !== -1;*/
    return false;
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
