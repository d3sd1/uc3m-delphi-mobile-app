import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {WsService} from '../../ws/ws.service';
import {UserConsumer} from '../../consumer/user/user.consumer';
import {LangService} from '../../lang/lang.service';

@Injectable()
export class LangResolver implements Resolve<any> {

  constructor(private langService: LangService) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this.langService.init();
  }
}
