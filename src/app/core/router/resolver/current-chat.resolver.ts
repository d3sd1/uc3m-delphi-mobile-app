import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {Process} from '../../model/process';
import {ProcessConsumer} from '../../consumer/process/process.consumer';
import {ChatConsumer} from '../../consumer/chat/chat.consumer';
import {UserChat} from '../../model/user-chat';

@Injectable()
export class CurrentChatResolver implements Resolve<UserChat> {
  constructor(private chatConsumer: ChatConsumer) {
  }
  resolve(route: ActivatedRouteSnapshot): Promise<UserChat> {
    return this.chatConsumer.getById(route.params['chatId']);
  }
}

