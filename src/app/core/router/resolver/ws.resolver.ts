import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {WsService} from '../../ws/ws.service';
import {UserConsumer} from '../../consumer/user/user.consumer';

@Injectable()
export class WsResolver implements Resolve<any> {

  constructor(private ws: WsService, private userConsumer: UserConsumer) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this.ws.connectWs((await this.userConsumer.getJwt()).getValue());
  }
}
