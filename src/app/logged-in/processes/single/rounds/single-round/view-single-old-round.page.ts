import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Process} from '../../../../../core/model/process';
import {User} from '../../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {Question} from '../../../../../core/model/question';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './view-single-old-round.page.html',
  styleUrls: ['./view-single-old-round.page.scss'],
})
export class ViewSingleOldRoundPage {

  process: Process;
  currentUser: User;
  roundIdx: number;

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
      this.roundIdx = this.process.rounds.findIndex(q => q.id === +params['roundid']);
    });
  }


  //TODO:
  // IF CURRENT ROUND STARTED, DO NOT ALLOW TO EDIT VALUES!!

}
