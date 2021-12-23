import {Component, OnDestroy} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {Process} from '../../../../core/model/process';
import {User} from '../../../../core/model/user';
import {UserConsumer} from '../../../user.consumer';
import {ProcessConsumer} from '../../process.consumer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './view-rounds.page.html',
  styleUrls: ['./view-rounds.page.scss'],
})
export class ViewRoundsPage implements OnDestroy {

  process: Process;
  user: User;
  processSubscription: Subscription;
  routeSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private processConsumer: ProcessConsumer,
    private userConsumer: UserConsumer) {
    this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
      if (user === null) {
        return;
      }
      this.user = user;
    });
    this.routeSubscription = this.route.params.subscribe(params => {
      if (params === null) {
        return;
      }
      this.processSubscription = this.processConsumer.getProcesses().subscribe((processes) => {
        if (processes == null) {
          return;
        }
        this.process = processes.find(p2 => p2.id === +params.id);
      });
    });
  }

  sortRounds() {
    this.process.currentRound.questions.sort((a, b) => {
      if (a.orderPosition < b.orderPosition) {
        return -1;
      }
      if (a.orderPosition > b.orderPosition) {
        return 1;
      }
      return 0;
    });
  }

  ngOnDestroy(): void {
    if (!this.routeSubscription.closed) {
      this.routeSubscription.unsubscribe();
    }
    if (!this.processSubscription.closed) {
      this.processSubscription.unsubscribe();
    }
    if (!this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    this.process = undefined;
    this.user = undefined;
  }

}
