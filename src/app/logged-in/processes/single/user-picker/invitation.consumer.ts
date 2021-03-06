import {Injectable} from '@angular/core';
import {WsService} from '../../../../core/service/ws/ws.service';
import {BehaviorSubject} from 'rxjs';
import {WsMode} from '../../../../core/service/ws/ws-mode.model';
import {User} from '../../../../core/model/user';
import {JwtService} from '../../../../core/service/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class InvitationConsumer {

  private users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private wsService: WsService, private jwtService: JwtService) {
    this.listenUpdates();
  }

  getUsers(): BehaviorSubject<User[]> {
    return this.users;
  }

  sendInvitation(email: string, processId: number, type: string) {
    this.wsService.publish('invitation', {email, processId, type}, WsMode.CREATE);
  }

  addExistantUserToProcess(userId: number, processId: number, type: string) {
    this.wsService.publish('invitation', {userId, processId, type}, WsMode.UPDATE);
  }

  removeFromProcess(userId: number, processId: number) {
    this.wsService.publish('invitation', {userId, processId}, WsMode.DELETE);
  }

  /**
   * Needs both subscriptions (this is shared public and private mode).
   * @private
   */
  private listenUpdates() {
    this.jwtService.getJwt().subscribe((jwt) => {
      if (jwt === null || jwt === undefined || jwt === '' || jwt === 'null') {
        this.users.next([]);
        return;
      }
      this.wsService.listen('invitation', false, this.users, this.sortUsers);
      this.wsService.listen('invitation', true, this.users, this.sortUsers);
    });
  }

  private sortUsers(users) {
    // sort messages for each chat
    users.sort((u1: User, u2: User) => {
      if (!u1) {
        return -1;
      } else if (u2) {
        return 1;
      }
      return u1.name.localeCompare(u2.name);
    });
  }
}
