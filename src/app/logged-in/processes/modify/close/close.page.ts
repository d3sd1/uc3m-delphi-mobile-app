import {Component, OnInit} from '@angular/core';
import {Process} from '../../process';
import {NavController, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'delphi-close',
  templateUrl: './close.page.html',
  styleUrls: ['./close.page.scss'],
})
export class ClosePage {

  process: Process;
  conclusion: string;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private toastController: ToastController,
    private translate: TranslateService) {
  }

  async goBack() {
    await this.navCtrl.navigateBack('/logged-in/home/menu/processes/single', {
      state: {process: this.process}
    });
  }

  public async closeProcess() {
    if (this.conclusion === '' || this.conclusion === undefined || this.conclusion === null) {
      await this.showToast(await this.translate.get('home.processes.single.end.form.err_empty').toPromise());
      return;
    }
    this.process.finalComment = 'acabar esta parte plsss'; // TODO <---
    await this.httpClient.post<Process>(environment.apiUrl + '/v1/process/end?process_id=' + this.process.id, this.process).toPromise().then(async (delphiProcess: Process) => {
      this.process = delphiProcess;
      await this.showToast(await this.translate.get('home.processes.single.end.success').toPromise());
      await this.goBack();
    }).catch(async (errMessage: string) => {
      console.log(errMessage);
      await this.showToast(await this.translate.get('home.processes.single.end.err').toPromise());
      await this.goBack();
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
}
