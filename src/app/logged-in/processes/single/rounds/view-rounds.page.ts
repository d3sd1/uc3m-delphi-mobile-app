import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {Process} from '../../../../core/model/process';
import {User} from '../../../../core/model/user';

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
    private route: ActivatedRoute) {
    this.route.snapshot.data['user'].subscribe((user) => {
      this.user = user;
    });
    this.route.snapshot.data['process'].subscribe((process) => {
      this.process = process;
    });
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
