import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {UserStorage} from '../../../core/storage/user.storage';
import {ActivatedRoute} from '@angular/router';
import {Process} from '../process';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'delphi-single',
  templateUrl: './single.page.html',
  styleUrls: ['./single.page.scss'],
})
export class SinglePage implements OnInit {

  showExpertForm = false;
  invitationEmail = '';
  process: Process;

  constructor(
    private toastController: ToastController,
    private navCtrl: NavController,
    public userStorage: UserStorage,
    private actRoute: ActivatedRoute,
    private httpClient: HttpClient) {

  }

  async ngOnInit() {
    this.process = await this.httpClient.get<Process>(environment.apiUrl + '/v1/process/id/' + this.actRoute.snapshot.params.processId).toPromise();
  }

  showExpertInvitation() {
    this.showExpertForm = true;
  }

  async sendExpertInvitation() {
    this.showExpertForm = false;
    this.invitationEmail = '';
    const toast = await this.toastController.create({
      message: 'Invitación enviada',
    });
    await toast.present();
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
  }

  goBack() {
    this.navCtrl.back();
  }

}
