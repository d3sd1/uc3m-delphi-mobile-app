import {Role} from './role';

export class User {
  id: number;
  email: string;
  name: string;
  surnames: string;
  photo: string;
  enabled: boolean;
  blocked: boolean;
  roles: Role[];
}
