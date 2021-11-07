import {User} from './user';
import {ChatMessage} from './chat-message';


export class UserChat {
  id: number;
  name: string;
  user1: User;
  user2: User;
  messages: ChatMessage[];
}
