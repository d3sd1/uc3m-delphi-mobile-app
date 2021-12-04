import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Process} from '../../../../../core/model/process';
import {User} from '../../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {UserConsumer} from '../../../../../core/consumer/user/user.consumer';
import {ProcessConsumer} from '../../../../../core/consumer/process/process.consumer';

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
    private processConsumer: ProcessConsumer,
    private route: ActivatedRoute) {
    this.userConsumer.getUser().subscribe((user) => {
      this.currentUser = user;
    });

    this.route.params.subscribe(params => {
      this.processConsumer.getProcess(+params.id).subscribe((process) => {
        if (process === null) {
          return;
        }
        this.process = process;
        console.log('pp', process);
        this.roundIdx = process.pastRounds.findIndex(q => q.id === +params['roundid']);
      });
    });
  }
}

