import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, Router, UrlTree} from '@angular/router';
import {UserConsumer} from '../core/consumer/user/user.consumer';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate, CanActivateChild {

  constructor(public userConsumer: UserConsumer, private router: Router) {
  }

  async canActivate(): Promise<boolean | UrlTree> {
    const canActivate = await this.userConsumer.isLoggedIn();
    if (!canActivate) {
      return this.router.parseUrl('/logged-out');
    }
    return true;
  }

  canActivateChild(): Promise<boolean | UrlTree> {
    return this.canActivate();
  }


}
