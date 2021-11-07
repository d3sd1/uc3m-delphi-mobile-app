import {WsAction} from './ws-action.model';
import {WsMode} from './ws-mode.model';
import {BehaviorSubject} from 'rxjs';

export class WsCommand {
  wsAction: WsAction;
  channel: string;
  body: any;
  privateChannel: boolean;
  mode: WsMode;
  subject: BehaviorSubject<any>;
}
