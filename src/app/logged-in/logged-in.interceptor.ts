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
    const authReq = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + (await (await this.userConsumer.getJwt()))
      })
    });
    return next.handle(authReq).toPromise();
  }
}
