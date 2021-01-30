import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild} from '@angular/router';
import {UserStorage} from '../core/storage/user.storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(public auth: UserStorage) {
  }

  canActivate(): Promise<boolean> {
    return this.auth.isAuthenticated();
  }

  canActivateChild(): Promise<boolean> {
    return this.canActivate();
  }


}
