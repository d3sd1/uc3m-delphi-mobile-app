import {Component, OnDestroy} from '@angular/core';
import {Process} from '../../../../core/model/process';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../../core/model/user';
import {UserConsumer} from '../../../user.consumer';
import {ProcessConsumer} from '../../process.consumer';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../../../core/service/notification.service';

@Component({
  selector: 'delphi-close',
  templateUrl: './close.page.html',
  styleUrls: ['./close.page.scss'],
})
export class ClosePage implements OnDestroy {

  process: Process;
  user: User;
  processSubscription: Subscription;
  routeSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private navCtrl: NavController,
    private ns: NotificationService,
    private route: ActivatedRoute,
    private userConsumer: UserConsumer,
    private httpClient: HttpClient,
    private processConsumer: ProcessConsumer) {
    this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
      if (user === null) {
        return;
      }
      this.user = user;
    });
    this.routeSubscription = this.route.params.subscribe(params => {
      if (params === null) {
        return;
      }
      this.processSubscription = this.processConsumer.getProcesses().subscribe((processes) => {
        if (processes == null) {
          return;
        }
        const process = processes.find(p2 => p2.id === +params.id);
        // If process is finished, do not allow to stay on this page
        if (process.finished) {
          this.navCtrl.navigateBack('/logged-in/menu/processes/finished/' + this.process.id).then(r => null);
        }
        this.process = process;
      });
    });
  }

  closeProcess() {
    if (this.process.conclusion === '' || this.process.conclusion === undefined || this.process.conclusion === null) {
      this.ns.showToast('Debes introducir una conclusión');
      return;
    }
    this.processConsumer.closeProcess(this.process.id);
    this.navCtrl.navigateBack('/logged-in/menu/processes/finished/' + this.process.id).then(r => null);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.processSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.process = undefined;
    this.user = undefined;
  }
}
