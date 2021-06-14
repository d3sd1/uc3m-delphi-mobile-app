import {User} from './user';
import {ChatMessage} from './chat-message';


export class UserChat {
  chatMessages: ChatMessage[];
  id: number;
  toUser: User;
}
