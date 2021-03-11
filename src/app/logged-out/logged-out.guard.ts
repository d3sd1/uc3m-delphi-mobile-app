import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment} from '@angular/router';
import {Observable} from 'rxjs';
import {UserStorage} from '../core/storage/user.storage';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanLoad {
  constructor(private userStorage: UserStorage) {

  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userStorage.isLoggedIn().then(result => !result);
  }
}
