import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {Process} from '../../process';
import {User} from '../../../user';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './view-rounds.page.html',
  styleUrls: ['./view-rounds.page.scss'],
})
export class ViewRoundsPage {

  process: Process;
  currentUser: User;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router) {
  }

  async goBack() {
    await this.navCtrl.navigateBack('/logged-in/home/menu/processes/single', {
      state: {process: this.process, currentUser: this.currentUser}
    });
  }

  sortRounds() {
    this.process.pastRounds.sort((a, b) => {
      // check if some1 is finished
      if (!a.finished && b.finished) {
        return -1;
      } else if (a.finished && !b.finished) {
        return 1;
      }

      // normal ordering
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
