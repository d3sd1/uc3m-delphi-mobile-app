import {Component} from '@angular/core';
import {ProcessService} from './process.service';
import {Process} from './process';

@Component({
  selector: 'delphi-processes',
  templateUrl: 'processes.page.html',
  styleUrls: ['processes.page.scss']
})
export class ProcessesPage {

  processes: Process[] = null;
  loaded = false;

  constructor(private processService: ProcessService) {
  }

  async ionViewWillEnter() {
    await this.loadProcesses();
  }

  async loadProcesses() {
   this.processes = await this.processService.list();
    this.loaded = true;
  }

}
