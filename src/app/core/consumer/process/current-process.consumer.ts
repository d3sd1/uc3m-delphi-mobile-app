import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WsService} from '../../ws/ws.service';
import {Process} from '../../model/process';
import {BehaviorSubject} from 'rxjs';
import {DatabaseService} from '../database.service';
import {UserConsumer} from '../user/user.consumer';

@Injectable({
  providedIn: 'root'
})
export class CurrentProcessConsumer {

  private processUpdater: BehaviorSubject<Process> = new BehaviorSubject<Process>(null);

  constructor(private httpClient: HttpClient, private wsService: WsService,
              private databaseService: DatabaseService,
              private userConsumer: UserConsumer) {
  }
  setCurrentProcess(process: Process) {
    this.processUpdater.next(process);
  }

  async getProcess(): Promise<BehaviorSubject<Process>> {
    return this.processUpdater;
  }
}

