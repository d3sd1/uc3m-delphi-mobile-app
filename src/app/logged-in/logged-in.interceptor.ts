import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserStorage} from '../core/storage/user.storage';
import {from} from 'rxjs';

@Injectable()
export class LoggedInInterceptor implements HttpInterceptor {
  constructor(private userStorage: UserStorage) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {

    console.log('INTERCEPTORRR');
    const jwt = await this.userStorage.getJwt();
    console.log('jwwttt',jwt);
    const authReq = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt
      })
    });
    return next.handle(authReq).toPromise();
  }
}
