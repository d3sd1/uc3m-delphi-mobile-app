import {Component, OnDestroy} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Process} from '../../../../../core/model/process';
import {User} from '../../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {Question} from '../../../../../core/model/question';
import {UserConsumer} from '../../../../user.consumer';
import {ProcessConsumer} from '../../../process.consumer';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../../../../core/service/notification.service';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './modify-questions-content.page.html',
  styleUrls: ['./modify-questions-content.page.scss'],
})
export class ModifyQuestionsContentPage implements OnDestroy {

  process: Process;
  currentUser: User;
  question: Question;
  userSubscription: Subscription;
  routeSubscription: Subscription;
  processSubscription: Subscription;

  constructor(
    private navCtrl: NavController,
    private userConsumer: UserConsumer,
    private ns: NotificationService,
    private processConsumer: ProcessConsumer,
    private route: ActivatedRoute) {
    this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
      this.currentUser = user;
    });

    this.routeSubscription = this.route.params.subscribe(params => {

      this.processSubscription = this.processConsumer.getProcesses().subscribe((processes) => {
        if (processes == null) {
          return;
        }
        this.process = processes.find(p2 => p2.id === +params.id);
        this.question = this.process.currentRound.questions.find(q => q.id === +params.questionid);
      });
    });
  }


  updateQuestion() {
    if (this.question.name === '') {
      this.ns.showToast('Debes introducir una pregunta.');
      return;
    }
    this.processConsumer.updateQuestion(this.process.id, this.question.id,
      this.question.name, this.question.questionType.name, this.question.minVal,
      this.question.maxVal, this.question.maxSelectable, this.question.orderPosition);
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
    this.question = undefined;
  }

}
