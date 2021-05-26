import {User} from './user';

export class ChatMessage {
  id: number;
  sentBy: User;
  sentTo: User;
  message: string;
  read: boolean;
  sentDate: Date;
}
