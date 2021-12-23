import {Component, ViewChild} from '@angular/core';
import {IonContent, IonReorderGroup, LoadingController, NavController, ToastController} from '@ionic/angular';
import {Process} from '../../../core/model/process';
import {User} from '../../../core/model/user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {UserConsumer} from '../../../core/consumer/user/user.consumer';
import {ProcessConsumer} from '../../../core/consumer/process/process.consumer';
import {NotificationService} from '../../../core/service/notification.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'delphi-create',
  templateUrl: './single-process.page.html',
  styleUrls: ['./single-process.page.scss'],
})
export class SingleProcessPage {
  process: Process = new Process();
  createMode = false;
  user: User = new User();
  processSubscription: Subscription;
  @ViewChild(IonContent, {read: IonContent, static: false}) createProcess: IonContent;
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              private ns: NotificationService,
              public loadingController: LoadingController,
              public userConsumer: UserConsumer,
              private toastController: ToastController,
              private sanitizer: DomSanitizer,
              private translate: TranslateService,
              private processConsumer: ProcessConsumer,
              private navCtrl: NavController) {
    this.userConsumer.getUser().subscribe((user) => {
      if (user !== null) {
        this.user = user;
      }
    });
    this.route.params.subscribe(params => {
     this.processSubscription = this.processConsumer.getProcesses().subscribe((processes) => {
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


}
