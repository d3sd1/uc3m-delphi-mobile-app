import {Injectable} from '@angular/core';
import {WsService} from '../../../../core/service/ws/ws.service';
import {BehaviorSubject} from 'rxjs';
import {WsMode} from '../../../../core/service/ws/ws-mode.model';
import {User} from '../../../../core/model/user';

@Injectable({
  providedIn: 'root'
})
export class InvitationConsumer {

  private users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private wsService: WsService) {
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
    this.wsService.listen('invitation', false, this.users);
    this.wsService.listen('invitation', true, this.users);
  }
}