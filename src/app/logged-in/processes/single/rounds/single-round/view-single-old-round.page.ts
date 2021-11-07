import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Process} from '../../../../../core/model/process';
import {User} from '../../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {Question} from '../../../../../core/model/question';
import {UserConsumer} from '../../../../../core/consumer/user/user.consumer';

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
    private userConsumer: UserConsumer,
    private route: ActivatedRoute) {
   this.userConsumer.getUser().subscribe((user) => {
      this.currentUser = user;
    });
   /* TODO
    this.route.snapshot.data['process'].subscribe((process) => {
      this.process = process;
    }); */
    this.route.params.subscribe(params => {
      this.roundIdx = this.process.rounds.findIndex(q => q.id === +params['roundid']);
    });
  }


  //TODO:
  // IF CURRENT ROUND STARTED, DO NOT ALLOW TO EDIT VALUES!!

}
