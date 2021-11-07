import {User} from './user';

export class ChatMessage {
  id: number;
  user: User;
  content: string;
  timestamp: Date;
}
