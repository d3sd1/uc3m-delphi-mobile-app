import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {UserConsumer} from '../../consumer/user/user.consumer';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../../logged-in/user';

@Injectable()
export class UserResolver implements Resolve<BehaviorSubject<User>> {

  constructor(private userConsumer: UserConsumer) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<BehaviorSubject<User>> {
    return this.userConsumer.getUser();
  }
}

