import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {WsService} from '../../ws/ws.service';
import {UserConsumer} from '../../consumer/user/user.consumer';
import {LangService} from '../../lang/lang.service';
import {PushNotificationService} from '../../push-notification/push-notification.service';

@Injectable()
export class PushNotificationResolver implements Resolve<any> {

  constructor(private pushNotificationService: PushNotificationService) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this.pushNotificationService.init();
  }
}
