import {Component, OnDestroy, OnInit} from '@angular/core';
import {Process} from '../../../core/model/process';
import {ProcessConsumer} from '../process.consumer';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {User} from '../../../core/model/user';
import {UserConsumer} from '../../user.consumer';
import {NotificationService} from '../../../core/service/notification.service';

@Component({
  selector: 'delphi-processes',
  templateUrl: 'processes.page.html',
  styleUrls: ['processes.page.scss']
})
export class ProcessesPage implements OnInit, OnDestroy {

  processes: Process[];
  filteredProcesses: Process[];
  user: User;
  loadingProcesses = false;

  processSubscription: Subscription;
  userSubscription: Subscription;

  constructor(private processService: ProcessConsumer,
              private route: ActivatedRoute,
              private ns: NotificationService,
              private userConsumer: UserConsumer,
              private processConsumer: ProcessConsumer,
              private navCtrl: NavController) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.loadingProcesses = true;
        this.processSubscription = this.processConsumer.getProcesses().subscribe(processes => {
          if (processes === null) {
            return;
          }
          this.loadingProcesses = true;
          this.processes = processes;
          console.log('proesses:', this.processes);
          this.filterProcesses();
          this.loadingProcesses = false;
        });

        this.userSubscription = this.userConsumer.getUser().subscribe(user => {
          if (user === null) {
            return;
          }
          this.user = user;
        });
      });
  }

  editProcess(process) {
    this.navCtrl.navigateForward('/logged-in/menu/processes/finished/' + process.id).then(null);
  }

  /**
   * Turn red process if the current round is open, current user has not parcitiped and there's 1 day or less to participate
   * @param process
   */
  processPendingParticipationWarning(process) {
    if (!this.user) {
      return;
    }
    let pMs = 0;
    if (process.currentRound.limitTime !== null) {
      pMs = new Date(process.currentRound.limitTime).getTime();
    }
    return process.currentRound.started === true
      && process.currentRound.expertsRemaining.find(pu => pu.id === this.user.id)
      && pMs !== 0
      && pMs - 86400000 < (new Date()).getTime();
  }

  filterProcesses(ev: any = undefined) {
    this.filteredProcesses = [];
    let wantsFinished = false;
    if (ev) {
      wantsFinished = ev.target.value === 'finished';
    }
    this.processes.forEach((process: Process) => {
      if ((wantsFinished && process.finished) || (!wantsFinished && !process.finished)) {
        this.filteredProcesses.push(process);
      }
    });
  }

  isCoordinator(process: Process): boolean {
    if (!this.user) {
      return;
    }
    return process.coordinators.findIndex((user) => user.id === this.user.id) !== -1;
  }

  addProcess() {
    this.ns.showAlert('Crear proceso', null, {
      text: 'Ok',
      handler: (alertData) => {
        this.processConsumer.createProcess(alertData.name, alertData.description);
      }
    }, 'Cancelar', [
      {
        name: 'name',
        type: 'text',
        placeholder: 'Nombre del proceso',
        attributes: {
          maxlength: 50,
          autoFocus: true,
        }
      },
      {
        name: 'description',
        type: 'textarea',
        placeholder: 'Descripción del proceso',
        attributes: {
          maxlength: 5000,
        }
      },
    ]);
  }

  ngOnDestroy(): void {
    if (this.processSubscription && !this.processSubscription.closed) {
      this.processSubscription.unsubscribe();
    }
    if (this.userSubscription && !this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    this.processes = undefined;
    this.filteredProcesses = undefined;
    this.loadingProcesses = false;
    this.user = undefined;
  }

}
