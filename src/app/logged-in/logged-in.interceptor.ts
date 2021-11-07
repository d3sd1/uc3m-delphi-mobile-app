import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {JwtService} from '../core/service/jwt.service';

@Injectable()
export class LoggedInInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.jwtService.getJwt().getValue()
      })
    });
    return next.handle(authReq).toPromise();
  }
}
