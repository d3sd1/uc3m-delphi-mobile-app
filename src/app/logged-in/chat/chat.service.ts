import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {UserChat} from '../../core/model/user-chat';
import {ChatMessage} from '../../core/model/chat-message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  callingRest = false;

  private subject = new Subject<any>();

  constructor(private httpClient: HttpClient) {
  }

  public postReadChat(chatId: number) {
    return new Promise<void>((resolve, reject) => {
      this.httpClient.post<UserChat[]>(environment.apiUrl + '/v1/chat/read/' + chatId, {}).subscribe((userChats: UserChat[]) => {
        resolve();
      }, (e) => {
        console.error(e);
        reject();
      });
    });
  }

  public writeToChat(chatId: number, chatMessage: ChatMessage) {
    return new Promise<void>((resolve, reject) => {
      this.httpClient.post<UserChat>(environment.apiUrl + '/v1/chat/write/' + chatId, chatMessage).subscribe((userChat: UserChat) => {
        resolve();
      }, (e) => {
        console.error(e);
        reject();
      });
    });
  }

  public getChatById(chatId: number): Promise<UserChat> {
    return new Promise<UserChat>((resolve, reject) => {
      this.httpClient.get<UserChat>(environment.apiUrl + '/v1/chat/get/' + chatId).subscribe((userChat: UserChat) => {

        resolve(userChat);
      });
    });
  }

  getCurrentUserChats(): Subject<UserChat[]> {
    this.updCurrentUserChats();
    return this.subject;
  }

  private updCurrentUserChats() {
    if (this.callingRest) {
      return;
    }
    this.callingRest = true;
    this.httpClient.get<UserChat[]>(environment.apiUrl + '/v1/chat/list').subscribe((userChats: UserChat[]) => {
      this.subject.next(userChats);
      this.callingRest = false;
    }, (e) => {
      console.error(e);
    });
  }
}
