import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, Router, UrlTree} from '@angular/router';
import {UserStorage} from '../core/storage/user.storage';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate, CanActivateChild {

  constructor(public userStorage: UserStorage, private router: Router) {
  }

  async canActivate(): Promise<boolean | UrlTree> {
    const canActivate = await this.userStorage.isLoggedIn();
    if (!canActivate) {
      return this.router.parseUrl('/logged-out');
    }
    return true;
  }

  canActivateChild(): Promise<boolean | UrlTree> {
    return this.canActivate();
  }


}
