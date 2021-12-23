import {Component, OnDestroy} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../../core/model/user';
import {UserConsumer} from '../../../user.consumer';
import {ProcessConsumer} from '../../process.consumer';
import {SingleProcessListener} from '../single-process.listener';
import {NotificationService} from '../../../../core/service/notification.service';

@Component({
  selector: 'delphi-close',
  templateUrl: './close.page.html',
  styleUrls: ['./close.page.scss'],
})
export class ClosePage extends SingleProcessListener implements OnDestroy {

  user: User;

  constructor(
    private navCtrl: NavController,
    private ns: NotificationService,
    protected route: ActivatedRoute,
    protected userConsumer: UserConsumer,
    protected processConsumer: ProcessConsumer) {
    super(route, processConsumer, userConsumer);
  }

  onProcessUpdate() {
    if (this.process.finished) {
      this.navCtrl.navigateBack('/logged-in/menu/processes/finished/' + this.process.id).then(r => null);
    }
  }

  ngOnDestroy(): void {
    this.clearProcesses();
  }

  onUserUpdate() {
  }

  public closeProcess() {
    if (this.process.conclusion === '' || this.process.conclusion === undefined || this.process.conclusion === null) {
      this.ns.showToast('Debes introducir una conclusión');
      return;
    }
    this.processConsumer.closeProcess(this.process.id);
    this.navCtrl.navigateBack('/logged-in/menu/processes/finished/' + this.process.id).then(r => null);
  }

}
