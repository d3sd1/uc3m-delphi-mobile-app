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
export class ViewQuestionsPage implements OnInit {

  process: Process;
  currentUser: User;
  roundIndex: number;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router) {
  }

  sortQuestions() {
    this.process.rounds[this.roundIndex]?.questions.sort((a, b) => {
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

  private async loadProcess() {
    this.route.queryParams.subscribe(async params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.process = this.router.getCurrentNavigation().extras.state.process;
        this.roundIndex = this.router.getCurrentNavigation().extras.state.roundIndex;
        if (this.process.rounds === undefined) {
          this.process.rounds = [];
        }
        this.sortQuestions();
      } else {
        await this.router.navigateByUrl('/logged-in/home/menu/processes');
      }
    });
  }

  public async ngOnInit(): Promise<void> {
    await this.loadProcess();
   //TODO  this.currentUser = await this.userStorage.getUser();
  }

}
