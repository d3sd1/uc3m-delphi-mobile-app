import {Component, OnDestroy} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Process} from '../../../core/model/process';
import {User} from '../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {UserConsumer} from '../../user.consumer';
import {ProcessConsumer} from '../process.consumer';
import {NotificationService} from '../../../core/service/notification.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'delphi-create',
  templateUrl: './single-process.page.html',
  styleUrls: ['./single-process.page.scss'],
})
export class SingleProcessPage implements OnDestroy {
  process: Process;
  user: User;
  processesSubscription: Subscription;
  routeSubscription: Subscription;
  userSubscription: Subscription;

  constructor(private ns: NotificationService,
              public userConsumer: UserConsumer,
              private route: ActivatedRoute,
              private processConsumer: ProcessConsumer,
              private navCtrl: NavController) {
    this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
      if (user !== null) {
        this.user = user;
      }
    });
    this.routeSubscription = this.route.params.subscribe(params => {
      this.processesSubscription = this.processConsumer.getProcesses().subscribe((processes) => {
        if (processes == null) {
          return;
        }
        const process = processes.find(p2 => p2.id === +params.id);
        console.log('received process:', process);
        this.process = process;
      });
    });
  }

  isCoordinator(): boolean {
    return this.process?.coordinators.findIndex((user) => user.id === this.user?.id) !== -1;
  }

  alreadyVoted(): boolean {
    if (this.process.currentRound.expertsRemaining === undefined) {
      return false;
    }
    return this.process.currentRound.expertsRemaining?.findIndex((user) => user.id === this.user?.id) !== -1;
  }

  async updateBasicFields() {
    this.processConsumer.updateProcessBasicData(this.process?.id, this.process?.name, this.process?.description, this.process?.objectives);
  }

  finishProcess() {
    if (this.process?.currentRound.started) {
      this.ns.showToast('No se puede cerrar el proceso cuando hay una ronda en curso.');
      return;
    }

    this.navCtrl.navigateForward('/logged-in/menu/processes/finished/' + this.process.id + '/close').then(r => null);
  }

  async participate() {
    if (!this.process.currentRound?.started) {
      this.ns.showToast('El proceso no tiene la ronda actual abierta.');
      return;
    }
    this.navCtrl.navigateForward('/logged-in/menu/processes/finished/' + this.process.id + '/participate').then(r => null);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.processesSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.process = undefined;
    this.user = undefined;
  }
}
