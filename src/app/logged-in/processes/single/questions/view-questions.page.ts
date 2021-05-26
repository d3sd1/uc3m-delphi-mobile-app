import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {Process} from '../../process';
import {User} from '../../../user';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './view-questions.page.html',
  styleUrls: ['./view-questions.page.scss'],
})
export class ViewQuestionsPage {

  process: Process;
  currentUser: User;
  roundIndex: number;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router) {
  }

  sortQuestions() {
    this.process.pastRounds[this.roundIndex]?.questions.sort((a, b) => {
      if (a.orderPosition < b.orderPosition) {
        return -1;
      }
      if (a.orderPosition > b.orderPosition) {
        return 1;
      }
      return 0;
    });
  }

  async goBack() {
    await this.navCtrl.navigateBack('/logged-in/home/menu/processes/view_rounds', {
      state: {process: this.process, currentUser: this.currentUser, roundIndex: this.roundIndex}
    });
  }
}
