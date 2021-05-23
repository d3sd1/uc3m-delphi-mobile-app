import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, Router, UrlTree} from '@angular/router';
import {UserConsumer} from '../core/consumer/user/user.consumer';

@Injectable({
  providedIn: 'root'
})
export class OnboardMissingGuard implements CanActivate, CanActivateChild {

  constructor(public userConsumer: UserConsumer, private router: Router) {
  }

  async canActivate(): Promise<boolean | UrlTree> {
    const needsOnboard = this.userConsumer.getUser().getValue().needsOnboard;
    if (!needsOnboard) {
      return this.router.parseUrl('/logged-in/menu/processes');
    }
    return true;
  }

  canActivateChild(): Promise<boolean | UrlTree> {
    return this.canActivate();
  }
}
