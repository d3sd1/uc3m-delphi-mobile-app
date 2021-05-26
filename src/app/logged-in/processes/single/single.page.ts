import {Component, OnInit} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {Process} from '../process';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../../user';
import {WsService} from '../../../core/ws/ws.service';
import {TranslateService} from '@ngx-translate/core';
import {Round} from '../modify/rounds/round';

@Component({
  selector: 'delphi-single',
  templateUrl: './single.page.html',
  styleUrls: ['./single.page.scss'],
})
export class SinglePage {

  showExpertForm = false;
  invitationEmail = '';
  process: Process;
  loggedInUser: User;
  currentRound: Round = null;
  remainingRounds: number = 0;

  constructor(
    private toastController: ToastController,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private wsService: WsService,
    private translate: TranslateService) {
  }

  showExpertInvitation() {
    this.showExpertForm = true;
  }

  async sendExpertInvitation() {
    this.showExpertForm = false;
    this.invitationEmail = '';
    const toast = await this.toastController.create({
      position: 'top',
      message: await this.translate.get('home.processes.single.invitation.sent').toPromise(),
    });
    await toast.present();
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
  }
  currentUserCanVote() {
    if(this.currentRound?.expertsVoted === undefined || this.currentRound?.expertsVoted === null
    || this.currentRound?.expertsVoted.length === 0){
      return true;
    }
    return this.currentRound?.expertsVoted?.filter(expert => expert.id === this.loggedInUser.id).length === 0;
  }

  openChat() {
    /* TODO
    if (user.user.id === this.loggedInUser.id) {
      return; // user can't open self chat...
    }
    this.httpClient.put(environment.apiUrl + '/v1/chat/open?userId=' + user.user.id, {}).subscribe(async (chatId) => {
      await this.router.navigateByUrl('/logged-in/home/menu/chat/chat/' + chatId);
    });*/
    // TODO handle err
  }

  async closeRound() {
    await this.httpClient.post<Process>(environment.apiUrl + '/v1/process/round/close?process_id=' + this.process.id, null).toPromise().then(async (delphiProcess: Process) => {
      this.process = delphiProcess;
      await this.showToast(await this.translate.get('home.processes.single.round.close.success').toPromise());
    }).catch(async (errMessage: string) => {
      console.log(errMessage);
      await this.showToast(await this.translate.get('home.processes.single.round.close.err').toPromise());
    });
  }

  async startRound() {
    await this.httpClient.post<Process>(environment.apiUrl + '/v1/process/round/start?process_id=' + this.process.id, null).toPromise().then(async (delphiProcess: Process) => {
      this.process = delphiProcess;
      await this.showToast(await this.translate.get('home.processes.single.round.start.success').toPromise());
    }).catch(async (errMessage: string) => {
      console.log(errMessage);
      await this.showToast(await this.translate.get('home.processes.single.round.start.err').toPromise());
    });
  }

  async closeProcess() {
    await this.navCtrl.navigateForward('/logged-in/home/menu/processes/close', {
      state: {process: this.process}
    });
  }

  private async showToast(msg: string) {
    const toast = await this.toastController.create({
      position: 'top',
      message: msg,
    });
    await toast.present();
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
    return toast;
  }

  async goBack() {
    await this.navCtrl.navigateBack('/logged-in/home/menu/processes', {
    });
  }

}
