import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AuthenticationService} from '../services/authentication-service';
import {UserChat} from '../model/user-chat';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  callingRest = false;

  private subject = new Subject<any>();

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {
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
