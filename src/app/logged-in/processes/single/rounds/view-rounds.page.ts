import {Component, OnDestroy} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {Process} from '../../../../core/model/process';
import {User} from '../../../../core/model/user';
import {UserConsumer} from '../../../user.consumer';
import {ProcessConsumer} from '../../process.consumer';
import {SingleProcessListener} from '../single-process.listener';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './view-rounds.page.html',
  styleUrls: ['./view-rounds.page.scss'],
})
export class ViewRoundsPage extends SingleProcessListener implements OnDestroy {

  process: Process;
  user: User;

  constructor(
    private navCtrl: NavController,
    protected route: ActivatedRoute,
    protected processConsumer: ProcessConsumer,
    protected userConsumer: UserConsumer) {
    super(route, processConsumer, userConsumer);
  }


  ngOnDestroy(): void {
    this.clearProcesses();
  }

  sortRounds() {
    this.process.currentRound.questions.sort((a, b) => {
      if (a.orderPosition < b.orderPosition) {
        return -1;
      }
      if (a.orderPosition > b.orderPosition) {
        return 1;
      }
      return 0;
    });
  }

}
