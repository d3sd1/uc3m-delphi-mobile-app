import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {Process} from '../../../../core/model/process';
import {User} from '../../../../core/model/user';
import {UserConsumer} from '../../../../core/consumer/user/user.consumer';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './view-rounds.page.html',
  styleUrls: ['./view-rounds.page.scss'],
})
export class ViewRoundsPage {

  process: Process;
  user: User;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private userConsumer: UserConsumer) {
    this.userConsumer.getUser().subscribe((user) => {
      this.user = user;
    });
    /* todo this.route.snapshot.data['process'].subscribe((process) => {
      this.process = process;
    });*/
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
