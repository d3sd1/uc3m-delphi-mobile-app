import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserConsumer} from '../../consumer/user/user.consumer';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivateChild {

  constructor(public userConsumer: UserConsumer, private router: Router) {
  }

  async canActivateChild(): Promise<boolean | UrlTree> {
    const canActivate = !(await this.userConsumer.isLoggedIn());
    if (!canActivate) {
      return this.router.parseUrl('/logged-in');
    }
    return true;
  }


}
