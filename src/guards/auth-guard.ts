import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild} from '@angular/router';
import {AuthenticationService} from '../services/authentication-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(public auth: AuthenticationService) {
  }

  canActivate(): Promise<boolean> {
    return this.auth.isAuthenticated();
  }

  canActivateChild(): Promise<boolean> {
    return this.canActivate();
  }


}
