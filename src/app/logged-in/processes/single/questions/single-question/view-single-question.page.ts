import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {Process} from '../../../process';
import {User} from '../../../../user';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './view-single-question.page.html',
  styleUrls: ['./view-single-question.page.scss'],
})
export class ViewSingleQuestionPage {

  process: Process;
  currentUser: User;
  roundIndex: number;
  questionIndex: number;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router) {
  }

  async goBack() {
    await this.navCtrl.navigateBack('/logged-in/home/menu/processes/view_questions', {
      state: {process: this.process, currentUser: this.currentUser, roundIndex: this.roundIndex}
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
