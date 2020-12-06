import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AuthenticationService} from '../services/authentication-service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private userChats = [
    {
      id: 4545,
      userId: 1,
      userName: 'Andrei',
      userSurnames: 'García Cuadra',
      currentOpenProjects: ['Delphi', 'UC3M'],
      lastMesage: 'Me voy de la vida',
      profilePicture: 'https://scontent-cdt1-1.cdninstagram.com/v/t51.2885-19/s150x150/117404919_133007181832186_8444346173741060339_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com&_nc_ohc=ie93npz7gCoAX8kXJYz&tp=1&oh=b59532115434c1d42a4d3584a36a2d9d&oe=5FEA9B27',
      status: 'busy',
      unreadMessages: 3
    },
    {
      id: 545,
      userId: 2,
      userName: 'Lisardo',
      userSurnames: 'Prieto Gonzalez',
      currentOpenProjects: ['Delphi', 'UC3M', 'Profesor asociado', 'Megacrack'],
      lastMesage: 'Buenísimos días megacrack!!',
      profilePicture: 'https://scontent-cdt1-1.cdninstagram.com/v/t51.2885-19/s320x320/69690314_689524754857408_3903499847516291072_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com&_nc_ohc=WGujgq_dLuoAX-as4Yw&tp=1&oh=4c81a6fee12bc84679961be030dba407&oe=5FEA2CFB',
      status: 'online',
      unreadMessages: 0
    }
  ];

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {
  }

  async fetctCurrentUserchats(): Promise<void> { // todo promise: userchatlist
    const authHeaders = new HttpHeaders();
    authHeaders.append('Content-Type', 'application/json');
    authHeaders.append('Authorization', 'Bearer MISCOJONESSSSSS');

    this.httpClient.get(environment.apiUrl + '/v1/chat/list', {headers: authHeaders})
      .subscribe(response => {
        console.log(response);
      }, error => {

        console.log(error);
      });


    return new Promise<void>(async (resolve, reject) => {
      /*const jwt = await this.authenticationService.getJwt();
      this.httpClient.get(environment.apiUrl + '/v1/chat/list').subscribe((userchatList) => {
        console.log(userchatList);
        resolve();
      }, (e) => {
        console.error(e);
        reject();
      });*/
      resolve();
    });
  }

  getCurrentUserChats() {
    this.fetctCurrentUserchats();
    return this.userChats; // TODO
  }
}
