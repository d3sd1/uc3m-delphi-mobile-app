import {Injectable} from '@angular/core';
import {CanActivateChild, Router, UrlTree} from '@angular/router';
import {UserConsumer} from '../../consumer/user/user.consumer';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivateChild {

  constructor(public userConsumer: UserConsumer) {
  }

  canActivateChild(): boolean {// BehaviorSubject<boolean | UrlTree> {
    return true; // TODO this.userConsumer.isLoggedIn();
  }


}
