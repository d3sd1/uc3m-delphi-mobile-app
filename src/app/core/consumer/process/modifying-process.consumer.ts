import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WsService} from '../../ws/ws.service';
import {Process} from '../../../logged-in/processes/process';
import {environment} from '../../../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {DatabaseService} from '../database.service';
import {User} from '../../../logged-in/user';
import {Round} from '../../../logged-in/processes/round';

@Injectable({
  providedIn: 'root'
})
export class ModifyingProcessConsumer {

  private processUpdater: BehaviorSubject<Process> = null;

  private processCache: Process;

  constructor(private httpClient: HttpClient, private wsService: WsService,
              private databaseService: DatabaseService,) {
  }

  async fetchDatabaseCache() {
    await this.createTable();
    const db = await this.databaseService.getDatabase();
    const data = await db.executeSql('SELECT * FROM modified_process LIMIT 1', []);
    if (data.rows.length > 0) {
      const dbRow = data.rows.item(0);
      this.processCache.id = dbRow?.id;
      this.processCache.name = dbRow?.name;
      this.processCache.description = dbRow?.description;
      this.processCache.pictureUrl = dbRow?.picture_url;
      this.processCache.processFinished = dbRow?.process_finished;
      this.processCache.finalComment = dbRow?.final_comment;
      this.processCache.modifiedDate = dbRow?.modified_date;
      /*

      TODO: missing:
  experts: User[] = [];
  coordinators: User[] = [];
  rounds: Round[] = [];
       */
      this.processUpdater.next(this.processCache);
    }
  }

  async createTable() {
    const db = await this.databaseService.getDatabase();
    await db.executeSql(
      'create table IF NOT EXISTS modified_process(' +
      'id BIGINT PRIMARY KEY,' +
      'name TEXT,' +
      'description TEXT,' +
      'picture_url TEXT,' +
      'process_finished boolean,' +
      'final_comment TEXT,' +
      'modified_date DATE' +
      ');', []);
  }

  async currentProcess(): Promise<BehaviorSubject<Process>> {
    if (this.processUpdater === null) {
      this.processUpdater = new BehaviorSubject<Process>(new Process());
      await this.fetchDatabaseCache();
    }
    return this.processUpdater;
  }
}
