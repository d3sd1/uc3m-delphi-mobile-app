import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {UserConsumer} from '../../consumer/user/user.consumer';
@Injectable()
export class UserResolver implements Resolve<any> {

  constructor(private userConsumer: UserConsumer) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this.userConsumer.fetchDatabaseCache();
  }
}

