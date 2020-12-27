import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Subject} from 'rxjs';
import {AuthenticationService} from '../../logged-out/login/authentication-service';
import {UserChat} from '../chat/user-chat';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  callingRest = false;

  private subject = new Subject<any>();

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {
  }

  public setOnboardingStatus(status: boolean) {
    return new Promise<void>((resolve, reject) => {
      this.httpClient.post<UserChat[]>(environment.apiUrl + '/v1/profile/onboard/' + status, {}).subscribe(() => {
        resolve();
      }, (e) => {
        console.error(e);
        reject();
      });
    });
  }

}
