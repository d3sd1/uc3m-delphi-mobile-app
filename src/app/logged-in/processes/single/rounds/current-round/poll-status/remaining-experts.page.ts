import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {Process} from '../../../../../../core/model/process';
import {User} from '../../../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserConsumer} from '../../../../../user.consumer';
import {ProcessConsumer} from '../../../../process.consumer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './remaining-experts.page.html',
  styleUrls: ['./remaining-experts.page.scss'],
})
export class RemainingExpertsPage implements OnInit, OnDestroy {

  process: Process;
  user: User;
  currentTime = (new Date()).toISOString();
  userSubscription: Subscription;
  processSubscription: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    public alertController: AlertController,
    private httpClient: HttpClient,
    private processConsumer: ProcessConsumer,
    private userConsumer: UserConsumer) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
          if (user === null) {
            return;
          }
          this.user = user;
        });
        this.processSubscription = this.processConsumer.getProcesses().subscribe((processes) => {
          if (processes == null) {
            return;
          }
          this.process = processes.find(p2 => p2.id === +params.id);
          this.orderQuestions();
        });
      });
  }

  ngOnDestroy(): void {
    if (this.userSubscription && !this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    if (this.processSubscription && !this.processSubscription.closed) {
      this.processSubscription.unsubscribe();
    }
    this.process = undefined;
    this.user = undefined;
    this.currentTime = undefined;
  }

  private orderQuestions() {
    this.process.currentRound.questions.sort((n1, n2) => {
      if (n1.orderPosition < n2.orderPosition) {
        return -1;
      }
      if (n1.orderPosition > n2.orderPosition) {
        return 1;
      }
      return 0;
    });
  }


}
