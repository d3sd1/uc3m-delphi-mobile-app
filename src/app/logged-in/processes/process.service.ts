import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {UserStorage} from '../../core/storage/user.storage';
import {Process} from './process';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  callingRest = false;

  private subject = new Subject<any>();

  constructor(private httpClient: HttpClient, private authenticationService: UserStorage) {
  }

/*
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
  }*/

  getAllProcesses(): Observable<Process[]> {
    this.updCurrentUserChats();
    return this.subject.asObservable();
  }

  private updCurrentUserChats() {
    if (this.callingRest) {
      return;
    }
    this.callingRest = true;
    this.httpClient.get<Process[]>(environment.apiUrl + '/v1/process/list').subscribe((userChats: Process[]) => {
      console.log(userChats)
      this.subject.next(userChats);
      this.callingRest = false;
    }, (e) => {
      console.error(e);
    });
  }
}
