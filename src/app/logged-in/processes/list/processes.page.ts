import {Component} from '@angular/core';
import {Process} from '../process';
import {ProcessConsumer} from '../../../core/consumer/process/process.consumer';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'delphi-processes',
  templateUrl: 'processes.page.html',
  styleUrls: ['processes.page.scss']
})
export class ProcessesPage {

  processesUpdater: BehaviorSubject<Process[]>;
  processes: Process[] = null;
  filteredProcesses: Process[] = null;
  processesSubscription: Subscription;

  constructor(private processService: ProcessConsumer,
              private route: ActivatedRoute) {
    this.processesUpdater = this.route.snapshot.data['processes'];
  }

  async ionViewWillEnter() {
    await this.loadProcesses();
  }

  async ionViewWillLeave() {
    this.processesSubscription.unsubscribe();
  }

  async loadProcesses() {
    this.processesUpdater = await this.processService.all();
    this.processesUpdater.subscribe((processes: Process[]) => {
      this.processes = processes;
    });
  }


  async ngOnInit() {
    this.filterProcesses();
    //TODO this.user = await this.authService.getUser();
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
