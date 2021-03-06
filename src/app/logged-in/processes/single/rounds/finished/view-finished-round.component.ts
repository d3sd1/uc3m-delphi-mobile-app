import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActionSheetController, NavController} from '@ionic/angular';
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
export class ViewFinishedRoundPage implements OnInit, OnDestroy {

  process: Process;
  currentUser: User;
  roundIdx: number;
  userSubscription: Subscription;
  processSubscription: Subscription;

  constructor(
    private navCtrl: NavController,
    private userConsumer: UserConsumer,
    private processConsumer: ProcessConsumer,
    private route: ActivatedRoute,
    public actionSheetController: ActionSheetController) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
          if (user === null) {
            return;
          }
          this.currentUser = user;
        });
        this.processSubscription = this.processConsumer.getProcesses().subscribe((processes) => {
          if (processes == null || processes.length === 0) {
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


  ngOnDestroy(): void {
    if (this.userSubscription && !this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    if (this.processSubscription && !this.processSubscription.closed) {
      this.processSubscription.unsubscribe();
    }
    this.process = undefined;
    this.currentUser = undefined;
    this.roundIdx = undefined;
  }
}

