import {Injectable} from '@angular/core';
import {WsService} from '../../service/ws.service';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {UserChat} from '../../model/user-chat';

@Injectable({
  providedIn: 'root'
})
export class ChatConsumer {

  private userChats: BehaviorSubject<UserChat[]> = new BehaviorSubject<UserChat[]>([]);
  private userChatsCache: UserChat[] = null;
  private userSingleChat: BehaviorSubject<UserChat>[] = [];

  constructor(private httpClient: HttpClient, private wsService: WsService) {
  }

  private async initializeLoaders() {
    if (this.userChatsCache === null) {
      // this.userChatsCache = (await this.httpClient.get<UserChat[]>(environment.apiUrl + '/v1/chat/list').toPromise());
      // this.userChats.next(this.userChatsCache);
      this.listenUpdates();
    }
  }


  async all(): Promise<BehaviorSubject<UserChat[]>> {
    await this.initializeLoaders();
    return this.userChats;
  }

  async getById(id: number): Promise<UserChat> {
    await this.initializeLoaders();
    console.log('chat id', id);
    return await this.httpClient.get<UserChat>(environment.apiUrl + '/v1/chat/get/' + id).toPromise();
  }

  /*
    async createProcess(name: string, description: string) {
      const process = new Process();
      process.name = name;
      process.description = description;
      (await this.httpClient.put<Process>(environment.apiUrl + '/v1/chat', process).toPromise());
    }
  */
  private listenUpdates() {
    // Bubble all with websocket
    this.wsService.subscribe('process', true, this.userChats);

    // Bubble single-round from websocket updated data (single-round-channel-simplicity)
    this.userChats.subscribe((userChats) => {
      userChats.forEach((userChat) => {

        if (!(userChat.id in this.userSingleChat)) {
          this.userSingleChat[userChat.id] = new BehaviorSubject<UserChat>(userChat);
        } else {
          this.userSingleChat[userChat.id].next(userChat);
        }
      });
    });
  }
}
