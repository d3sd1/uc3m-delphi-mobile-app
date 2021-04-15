import {Role} from './role';
import {Language} from './profile/language';

export class User {
  id: number;
  email: string;
  name: string;
  surnames: string;
  photo: any;
  enabled: boolean;
  blocked: boolean;
  chatStatus: string;
  needsOnboard: boolean;
  roles: Role[];
  language: Language;
  notificationStatus: boolean;
}
