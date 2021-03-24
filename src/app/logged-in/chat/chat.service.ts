import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {UserStorage} from '../../core/storage/user.storage';
import {UserChat} from './user-chat';
import {ChatMessage} from './chat-conversation/chat-message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  callingRest = false;

  private subject = new Subject<any>();

  constructor(private httpClient: HttpClient, private authenticationService: UserStorage) {
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
        userChat.chatMessages.sort((chatMessage1: ChatMessage, chatMessage2: ChatMessage) => {
          let pos = 0;
          if (chatMessage1.sentDate < chatMessage2.sentDate) {
            pos = -1;
          } else if (chatMessage1.sentDate > chatMessage2.sentDate) {
            pos = 1;
          }
          return pos;
        });
        resolve(userChat);
      });
    });
  }

  getCurrentUserChats(): Observable<UserChat[]> {
    this.updCurrentUserChats();
    return this.subject.asObservable();
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