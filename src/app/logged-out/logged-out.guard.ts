import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserConsumer} from '../core/consumer/user/user.consumer';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate {
  constructor(private userConsumer: UserConsumer, private router: Router) {

  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const canActivate = !(await this.userConsumer.isLoggedIn());
    if (!canActivate) {
      return this.router.parseUrl('/logged-in');
    }
    return true;
  }

}
