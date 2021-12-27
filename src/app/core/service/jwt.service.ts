import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private jwt: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor() {
    this.initialJwt();
  }

  getJwt(): BehaviorSubject<string> {
    return this.jwt;
  }

  setJwt(jwt: string): void {
    console.log('save jwt!!!');
    localStorage.setItem('jwt', jwt);
    this.jwt.next(jwt);
  }

  private initialJwt() {
    this.jwt.next(localStorage.getItem('jwt'));
  }
}
