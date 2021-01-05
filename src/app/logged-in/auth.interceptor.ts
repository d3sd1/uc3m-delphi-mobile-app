import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {UserStorage} from '../core/storage/user.storage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: UserStorage) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authenticationService.getJwt().pipe(
      mergeMap((jwt: string) => {
        const authReq = req.clone({
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + jwt
          })
        });
        return next.handle(authReq);
      }));
  }
}
