import {User} from '../../../logged-in/user';

export class LoginResponse {
  id: number;
  user: User;
  creationDate: Date;
  jwt: string;
  enabled: boolean;
}
