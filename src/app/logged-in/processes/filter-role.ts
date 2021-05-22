import {DelphiProcessUser} from './delphi-process-user';

export class FilterRole {
  proccessUsers: DelphiProcessUser[];
  role: string[];

  constructor(proccessUsers: DelphiProcessUser[], role: string[]) {
    this.proccessUsers = proccessUsers;
    this.role = role;
  }
}
