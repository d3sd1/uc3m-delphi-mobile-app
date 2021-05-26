import {User} from '../../model/user';

export class LoginResponse {
  id: number;
  user: User;
  creationDate: Date;
  jwt: string;
  enabled: boolean;
}
