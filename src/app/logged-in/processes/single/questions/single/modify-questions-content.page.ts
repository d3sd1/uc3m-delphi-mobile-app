import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Process} from '../../../../../core/model/process';
import {User} from '../../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {Question} from '../../../../../core/model/question';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './modify-questions-content.page.html',
  styleUrls: ['./modify-questions-content.page.scss'],
})
export class ModifyQuestionsContentPage {

  process: Process;
  currentUser: User;
  question: Question;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute) {
    this.route.snapshot.data['user'].subscribe((user) => {
      this.currentUser = user;
    });
    this.route.snapshot.data['process'].subscribe((process) => {
      this.process = process;
    });
    this.route.params.subscribe(params => {
      this.question = this.process.currentRound.questions[this.process.currentRound.questions.findIndex(q => q.id === +params['questionid'])];
    });
  }


  //TODO:
  // IF CURRENT ROUND STARTED, DO NOT ALLOW TO EDIT VALUES!!

}
