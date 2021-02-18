import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SessionStorageService} from './session-storage.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  constructor(private httpClient: HttpClient, private sessionStorageService: SessionStorageService) {

  }
/*
  public isLoggedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.post(environment.apiUrl + '/user/session', {jwt:}).subscribe(() => {
        if() {

        }
      }, () => {
        reject();
      });
    });
  }

  public needsTutorial(): Promise<boolean> {

  }

  public completeTutorial(): void {

  }

  public confirmEmail(): void {

  }

  public hasConfirmedEmail(): Promise<boolean> {

  }

  public hasCompletedInvitation(): Promise<boolean> {

  }

  public logout(): Promise<boolean> {

  }*/
}
