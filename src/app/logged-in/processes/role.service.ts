import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {UserStorage} from '../../core/storage/user.storage';
import {Process} from './process';
import {ChatMessage} from '../chat/chat-conversation/chat-message';
import {WsService} from '../../core/ws/ws.service';
import {Role} from '../role';
import {Roles} from '../../core/Roles';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  roles: Role[];

  constructor(private httpClient: HttpClient, private wsService: WsService) {
    this.httpClient.get<Process[]>(environment.apiUrl + '/v1/process/roles')
      .toPromise().then((roles: Role[]) => {
      this.roles = roles;
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
