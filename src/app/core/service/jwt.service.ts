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

  private initialJwt() {
    this.jwt.next(localStorage.getItem('jwt'));
  }

  getJwt(): BehaviorSubject<string> {
    return this.jwt;
  }

  setJwt(jwt: string): void {
    localStorage.setItem('jwt', jwt);
    this.jwt.next(jwt);
  }


}
