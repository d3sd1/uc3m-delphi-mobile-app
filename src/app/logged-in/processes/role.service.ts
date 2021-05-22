import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Process} from './process';
import {WsService} from '../../core/ws/ws.service';
import {Role} from '../role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  roles: Role[];

  constructor(private httpClient: HttpClient, private wsService: WsService) {
    this.httpClient.get<Process[]>(environment.apiUrl + '/v1/process/roles')
      .toPromise().then((roles: Role[]) => {
      this.roles = roles.sort((a,b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      });
    });
    // TODO this could cause nullpointers.xd
  }

  getRoles(): Role[] {
    return this.roles;
  }

  getRoleByName(name: string): Role {
    return this.roles?.find(role => role.name.toLowerCase() === name.toLowerCase());
  }
}
