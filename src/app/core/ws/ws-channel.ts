import {BehaviorSubject} from 'rxjs';

export class WsChannel {
  privateChannel: boolean;
  channel: string;
  subject: BehaviorSubject<any[]>;

  constructor(channel: string, privateChannel: boolean, subject: BehaviorSubject<any[]>) {
    this.channel = channel;
    this.privateChannel = privateChannel;
    this.subject = subject;
  }
}
