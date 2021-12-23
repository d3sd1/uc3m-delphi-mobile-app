import {Component, OnDestroy} from '@angular/core';
import {ActionSheetController, NavController, ViewDidLeave} from '@ionic/angular';
import {Process} from '../../../../../core/model/process';
import {User} from '../../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {UserConsumer} from '../../../../user.consumer';
import {ProcessConsumer} from '../../../process.consumer';
import {Round} from '../../../../../core/model/round';
import {Answer} from '../../../../../core/model/answer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './view-finished-round.component.html',
  styleUrls: ['./view-finished-round.component.scss'],
})
export class ViewFinishedRoundPage implements OnDestroy, ViewDidLeave {

  process: Process;
  currentUser: User;
  roundIdx: number;
  userSubscription: Subscription;
  routeSubscription: Subscription;
  processSubscription: Subscription;

  constructor(
    private navCtrl: NavController,
    private userConsumer: UserConsumer,
    private processConsumer: ProcessConsumer,
    private route: ActivatedRoute,
    public actionSheetController: ActionSheetController) {
    this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
      if (user === null) {
        return;
      }
      this.currentUser = user;
    });

    this.routeSubscription = this.route.params.subscribe(params => {
      if (params === null) {
        return;
      }
      this.processSubscription = this.processConsumer.getProcesses().subscribe((processes) => {
        if (processes == null) {
          return;
        }
        const process = processes.find(p2 => p2.id === +params.id);
        if (process === null) {
          return;
        }
        this.process = process;
        this.roundIdx = process.pastRounds.findIndex(q => q.id === +params.roundid);
      });
    });

  }

  getExpertAnswer(expert: User, round: Round, qId: number): Answer {
    if (round.answers === null || round.answers === undefined) {
      return null;
    }
    return round.answers.find(rr => rr.user.id === expert.id && rr.question.id === qId);
  }

  ionViewDidLeave(): void {
    this.ngOnDestroy();
  }


  ngOnDestroy(): void {
    if (!this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    if (!this.processSubscription.closed) {
      this.processSubscription.unsubscribe();
    }
    if (!this.routeSubscription.closed) {
      this.routeSubscription.unsubscribe();
    }
    this.process = undefined;
    this.currentUser = undefined;
    this.roundIdx = undefined;
  }
}

