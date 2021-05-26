import {Injectable} from '@angular/core';
import {CanActivateChild, Router, UrlTree} from '@angular/router';
import {UserConsumer} from '../../consumer/user/user.consumer';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivateChild {

  constructor(public userConsumer: UserConsumer, private router: Router) {
  }

  async canActivateChild(): Promise<boolean | UrlTree> {
    const canActivate = await this.userConsumer.isLoggedIn();
    if (!canActivate) {
      return this.router.parseUrl('/logged-out');
    }
    return true;
  }


}
