import {Component} from '@angular/core';
import {Process} from './process';
import {ProcessConsumer} from '../../core/consumer/process/process.consumer';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'delphi-processes',
  templateUrl: 'processes.page.html',
  styleUrls: ['processes.page.scss']
})
export class ProcessesPage {

  processesUpdater: BehaviorSubject<Process[]>;
  processes: Process[] = null;
  processesSubscription: Subscription;

  constructor(private processService: ProcessConsumer) {
  }

  async ionViewWillEnter() {
    await this.loadProcesses();
  }

  async ionViewWillLeave() {
    this.processesSubscription.unsubscribe();
  }

  async loadProcesses() {
   this.processesUpdater = await this.processService.all();
    this.processesSubscription = this.processesUpdater.subscribe((processes: Process[]) => {
      this.processes = processes;
      console.log('updated processes:', this.processes);
    });
  }


}
