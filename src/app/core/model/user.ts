import {Language} from './language';

export class User {
  id: number;
  email: string;
  name: string;
  surnames: string;
  photo: string;
  enabled: boolean;
  blocked: boolean;
  chatStatus: string;
  needsOnboard: boolean;
  language: Language;
  notificationStatus: boolean;
}
