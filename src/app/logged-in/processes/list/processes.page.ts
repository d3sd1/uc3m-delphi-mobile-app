import {Component} from '@angular/core';
import {Process} from '../../../core/model/process';
import {ProcessConsumer} from '../../../core/consumer/process/process.consumer';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AlertController, NavController} from '@ionic/angular';
import {User} from '../../../core/model/user';

@Component({
  selector: 'delphi-processes',
  templateUrl: 'processes.page.html',
  styleUrls: ['processes.page.scss']
})
export class ProcessesPage {

  processesUpdater: BehaviorSubject<Process[]>;
  processes: Process[] = null;
  filteredProcesses: Process[] = null;
  user: User;

  constructor(private processService: ProcessConsumer,
              private route: ActivatedRoute,
              private alertController: AlertController,
              private processConsumer: ProcessConsumer,
              private navCtrl: NavController) {
    this.route.snapshot.data['processes'].subscribe((processes) => {
      this.processes = processes;
      this.filterProcesses();
    });
    this.route.snapshot.data['user'].subscribe((user) => {
      this.user = user;
    });
  }

  async editProcess(process) {
    await this.navCtrl.navigateForward('/logged-in/menu/processes/single-round/' + process.id);
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
  isCoordinator(process: Process): boolean {
    return process.coordinators.findIndex((user) => user.id === this.user.id) !== -1;
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
