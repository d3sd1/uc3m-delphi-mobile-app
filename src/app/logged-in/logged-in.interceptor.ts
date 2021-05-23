import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {UserConsumer} from '../core/consumer/user/user.consumer';

@Injectable()
export class LoggedInInterceptor implements HttpInterceptor {
  constructor(private userConsumer: UserConsumer) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    const jwt = await this.userConsumer.getJwt();
    const authReq = req.clone({
      headers: new HttpHeaders({
        //'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt
      })
    });
    return next.handle(authReq).toPromise();
  }
}
