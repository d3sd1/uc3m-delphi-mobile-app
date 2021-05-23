import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../user';
import {Process} from '../../process';
import {WsService} from '../../../../core/ws/ws.service';
import {ProcessConsumer} from '../../../../core/consumer/process/process.consumer';

@Component({
  selector: 'delphi-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  @Input() processes: Process[];
  filteredProcesses: Process[];
  user: User;
  currentTime: Date = new Date();

  constructor(private processService: ProcessConsumer,
              private wsService: WsService,) {
  }

  async ngOnInit() {
    this.filterProcesses();
    //TODO this.user = await this.authService.getUser();
    this.currentTime = new Date();
    // Listen to new generated process that needs current user

/* TODO
    this.wsService.subscribe('process/new', true).subscribe(async (process: Process) => {
      if (process === null) {
        return;
      }
      const pIndex = this.processes.findIndex((pProcess) => {
        return process?.id === pProcess?.id;
      });
      if (pIndex === -1) {
        this.processes.push(process);
      } else {
        this.processes[pIndex] = process;
      }
      this.filterProcesses();
    }); */
  }

  parseDate(date: string): Date {
    return new Date(date);
  }

  filterProcesses(ev?: Event) {
    this.filteredProcesses = [];
    const wantsFinished = ev?.target['value'] === 'finished';
    this.processes?.forEach((process: Process) => {
      if (wantsFinished && process?.processFinished) {
        this.filteredProcesses.push(process);
      } else if (!wantsFinished && !process?.processFinished) {
        this.filteredProcesses.push(process);
      }
    });
    this.filteredProcesses.sort((a, b) => {
      if (a.modifiedDate < b.modifiedDate) {
        return 1;
      }
      if (a.modifiedDate > b.modifiedDate) {
        return -1;
      }
      return 0;
    });
  }

}
