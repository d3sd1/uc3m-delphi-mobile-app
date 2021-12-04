import {Component, OnInit} from '@angular/core';
import {Process} from '../../../core/model/process';
import {ProcessConsumer} from '../../../core/consumer/process/process.consumer';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AlertController, NavController} from '@ionic/angular';
import {User} from '../../../core/model/user';
import {UserConsumer} from '../../../core/consumer/user/user.consumer';

@Component({
  selector: 'delphi-processes',
  templateUrl: 'processes.page.html',
  styleUrls: ['processes.page.scss']
})
export class ProcessesPage implements OnInit {

  processesUpdater: BehaviorSubject<Process[]>;
  processUpdater: BehaviorSubject<Process>[] = null;
  processes: Process[] = null;
  filteredProcesses: Process[] = null;
  user: User;
  loadingProcesses = false;

  constructor(private processService: ProcessConsumer,
              private route: ActivatedRoute,
              private alertController: AlertController,
              private userConsumer: UserConsumer,
              private processConsumer: ProcessConsumer,
              private navCtrl: NavController) {
  }

  ngOnInit() {
    this.loadingProcesses = true;
    this.processConsumer.getProcesses().subscribe(async (processes) => {
      if (processes === null) {
        return;
      }
      this.loadingProcesses = true;
      this.processes = processes;
      this.filterProcesses();
      this.loadingProcesses = false;
    });

    this.userConsumer.getUser().subscribe(async (user) => {
      this.user = user;
    });
  }

  editProcess(process) {
    this.navCtrl.navigateForward('/logged-in/menu/processes/single-round/' + process.id).then(r => null);
  }

  /**
   * Turn red process if the current round is open, current user has not parcitiped and there's 1 day or less to participate
   * @param process
   */
  processPendingParticipationWarning(process) {
    let pMs = 0;
    if (process.currentRound?.limitTime !== null) {
      pMs = new Date(process.currentRound?.limitTime).getTime();
    }
    return process.currentRound?.started === true
      && process.currentRound?.expertsRemaining?.find(pu => pu.id === this.user.id)
      && pMs !== 0
      && pMs - 86400000 < (new Date()).getTime();
  }

  filterProcesses(ev?: any) {
    this.filteredProcesses = [];
    const wantsFinished = ev?.target.value === 'finished';
    this.processes?.forEach((process: Process) => {
      if ((wantsFinished && process?.finished) || (!wantsFinished && !process?.finished)) {
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

  isCoordinator(process: Process): boolean {
    return process.coordinators.findIndex((user) => user?.id === this.user?.id) !== -1;
  }

  async addProcess() {
    const alert = await this.alertController.create({
      header: 'Crear proceso',
      inputs: [
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
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: (alertData) => {
            this.processConsumer.createProcess(alertData.name, alertData.description);
          }
        }
      ]
    });

    await alert.present();
  }


}
