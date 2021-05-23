import {Injectable} from '@angular/core';
import {LoginResponse} from './login.response';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LoginUser} from './login.user';
import {Storage} from '@ionic/storage';
import {UserStorage} from '../../storage/user.storage';
import {WsService} from '../../ws/ws.service';
import {TranslateService} from '@ngx-translate/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {DatabaseService} from '../database.service';

@Injectable({
  providedIn: 'root'
})
export class UserConsumer {

  constructor(private http: HttpClient,
              private storage: Storage,
              private userStorage: UserStorage,
              private wsService: WsService,
              private translate: TranslateService,
              private sqlite: SQLite,
              private databaseService: DatabaseService) {
  }


  createTable() {
    this.databaseService.getDatabase().executeSql(
      'create table IF NOT EXISTS current_session(' +
      'jwt TEXT PRIMARY KEY,' +
      'user_id INTEGER,' +
      'email TEXT,' +
      'name TEXT,' +
      'surnames TEXT,' +
      'photo TEXT,' +
      'enabled BOOLEAN,' +
      'blocked BOOLEAN,' +
      'chat_status TEXT,' +
      'needs_onboard BOOLEAN,' +
      'language_key TEXT,' +
      'notification_status BOOLEAN' +
      ');', [])
      .then(() => console.debug('Executed SQL'))
      .catch(e => console.debug(e));
  }

  async storeSession(userLogin: LoginResponse) {
    await this.databaseService.getDatabase().transaction((tx) => {
      tx.executeSql('DELETE FROM current_session;', [],
        (tx, result) => {

          tx.executeSql(
            'INSERT INTO current_session (jwt, user_id, email, name, surnames, photo, enabled, blocked, chat_status,' +
            'needs_onboard,language_key,notification_status)' +
            ' values (?,?,?,?,?,?,?,?,?,?,?,?)', [
              userLogin.jwt,
              userLogin.user.id,
              userLogin.user.email,
              userLogin.user.name,
              userLogin.user.surnames,
              userLogin.user.photo,
              userLogin.user.enabled,
              userLogin.user.blocked,
              userLogin.user.chatStatus,
              userLogin.user.needsOnboard,
              userLogin.user.language.keyName,
              userLogin.user.notificationStatus,
            ],
            (tx, result) => {
              console.log('jwt sess ok', result);
            },
            (error) => {
              console.log('jwt sess fail', error);
            });
        },
        (error) => {
          console.log('jwt sess fail', error);
        });
    });
  }

  doLogin(user: LoginUser): Promise<string> {
    this.createTable();
    return new Promise<string>((resolve, reject) => {
      this.http.post<LoginResponse>(environment.apiUrl + '/v1/session/login', user).subscribe(async (loginResponse: LoginResponse) => {
        await this.storeSession(loginResponse);
        await this.wsService.connectWs(loginResponse.jwt);
        resolve(await this.translate.get('user.response.ok').toPromise());
      }, async (err: HttpErrorResponse) => {
        if (err.status === 400 && err.error.message === 'INVALID_LOGIN') {
          reject(await this.translate.get('user.response.invalid').toPromise());
        } else if (err.status === 400 && err.error.message === 'USER_BLOCKED') {
          reject(await this.translate.get('user.response.blocked').toPromise());
        } else if (err.status === 400) {
          reject(await this.translate.get('user.response.err.app').toPromise());
        } else if (err.status === 500) {
          reject(await this.translate.get('user.response.err.server').toPromise());
        }
        reject(await this.translate.get('user.response.err.desc').toPromise());
      });
    });
  }

}
