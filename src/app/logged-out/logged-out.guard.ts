import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserStorage} from '../core/storage/user.storage';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate {
  constructor(private userStorage: UserStorage, private router: Router) {

  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const canActivate = !(await this.userStorage.isLoggedIn());
    if (!canActivate) {
      return this.router.parseUrl('/logged-in');
    }
    return true;
  }

}
