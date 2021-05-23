import {Injectable} from '@angular/core';
import {LoginResponse} from './login.response';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LoginUser} from './login.user';
import {Storage} from '@ionic/storage';
import {WsService} from '../../ws/ws.service';
import {TranslateService} from '@ngx-translate/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {DatabaseService} from '../database.service';
import {User} from '../../../logged-in/user';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Language} from '../../../logged-in/profile/language';

@Injectable({
  providedIn: 'root'
})
export class UserConsumer {

  private userConsumerCache;

  constructor(private http: HttpClient,
              private storage: Storage,
              private wsService: WsService,
              private translate: TranslateService,
              private sqlite: SQLite,
              private databaseService: DatabaseService) {
    this.initCache();
  }

  initCache() {
    this.userConsumerCache = {
      jwt: '',
      user: new User()
    };
  }

  async fetchDatabaseCache() {
    const db = await this.databaseService.getDatabase();
    const data = await db.executeSql('SELECT * FROM current_session LIMIT 1', []);
    if (data.rows.length > 0) {
      const dbRow = data.rows.item(0);
      console.log('row DB', dbRow);
      this.userConsumerCache.jwt = dbRow.jwt;
      this.userConsumerCache.user.id = dbRow.user_id;
      this.userConsumerCache.user.email = dbRow.email;
      this.userConsumerCache.user.name = dbRow.name;
      this.userConsumerCache.user.surnames = dbRow.surnames;
      this.userConsumerCache.user.photo = dbRow.photo;
      this.userConsumerCache.user.enabled = dbRow.enabled;
      this.userConsumerCache.user.blocked = dbRow.blocked;
      this.userConsumerCache.user.chatStatus = dbRow.chat_status;
      this.userConsumerCache.user.needsOnboard = dbRow.needs_onboard;
      this.userConsumerCache.user.language = new Language(0, '', true);
      this.userConsumerCache.user.language.keyName = dbRow.language_key;
      this.userConsumerCache.user.notificationStatus = dbRow.notification_status;
      console.log('after row db-> ', this.userConsumerCache);
    }
  }

  async createTable() {
    const db = await this.databaseService.getDatabase();
    await db.executeSql(
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
      ');', []);
  }

  async dropSession() {
    const db = await this.databaseService.getDatabase();
    await db.executeSql('DELETE FROM current_session;', []);
  }

  async storeSession(userLogin: LoginResponse) {
    await this.createTable();
    const db = await this.databaseService.getDatabase();
    await this.dropSession();
    await db.executeSql(
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
      ]);
    await this.fetchDatabaseCache();
  }

  doLogin(user: LoginUser): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.http.post<LoginResponse>(environment.apiUrl + '/v1/session/login', user).subscribe(async (loginResponse: LoginResponse) => {
        await this.storeSession(loginResponse);
        await this.wsService.connectWs(loginResponse.jwt);
        resolve(await this.translate.get('login.response.ok').toPromise());
      }, async (err: HttpErrorResponse) => {
        if (err.status === 400 && err.error.message === 'INVALID_LOGIN') {
          reject(await this.translate.get('login.response.invalid').toPromise());
        } else if (err.status === 400 && err.error.message === 'USER_BLOCKED') {
          reject(await this.translate.get('login.response.blocked').toPromise());
        } else if (err.status === 400) {
          reject(await this.translate.get('login.response.err.app').toPromise());
        } else if (err.status === 500) {
          reject(await this.translate.get('login.response.err.server').toPromise());
        }
        reject(await this.translate.get('login.response.err.desc').toPromise());
      });
    });
  }

  async isLoggedIn(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      await this.fetchDatabaseCache();
      if (this.userConsumerCache.jwt === '' ||
        this.userConsumerCache.jwt === undefined ||
        this.userConsumerCache.jwt === null) {
        resolve(false);
      }
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(this.userConsumerCache.jwt);
      resolve(!isExpired);
    });
  }

  async doLogout() {
    this.initCache();
    await this.dropSession();
  }

}
