import {Component} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {Process} from '../../../../../core/model/process';
import {User} from '../../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserConsumer} from '../../../../user.consumer';
import {ProcessConsumer} from '../../../process.consumer';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './remaining-experts.page.html',
  styleUrls: ['./remaining-experts.page.scss'],
})
export class RemainingExpertsPage {

  process: Process;
  user: User;
  currentTime = (new Date()).toISOString();

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    public alertController: AlertController,
    private httpClient: HttpClient,
    private processConsumer: ProcessConsumer,
    private userConsumer: UserConsumer) {
    this.userConsumer.getUser().subscribe((user) => {
      this.user = user;
    });
    this.route.params.subscribe(params => {

      this.processConsumer.getProcesses().subscribe((processes) => {
        if (processes == null) {
          return;
        }
        const process = processes.find(p2 => p2.id === +params.id);
        this.process = process;
        this.orderQuestions();
      });
    });
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
