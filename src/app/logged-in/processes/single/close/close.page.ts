import {Component} from '@angular/core';
import {Process} from '../../../../core/model/process';
import {NavController, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {User} from '../../../../core/model/user';
import {UserConsumer} from '../../../../core/consumer/user/user.consumer';

@Component({
  selector: 'delphi-close',
  templateUrl: './close.page.html',
  styleUrls: ['./close.page.scss'],
})
export class ClosePage {

  process: Process;
  user: User;
  conclusion: string;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private userConsumer: UserConsumer,
    private httpClient: HttpClient,
    private toastController: ToastController,
    private translate: TranslateService) {
    this.userConsumer.getUser().subscribe((user) => {
      this.user = user;
    });
    /* TODO
    this.route.snapshot.data['process'].subscribe((process) => {
      this.process = process;
    }); */
  }


  public async closeProcess() {
    if (this.conclusion === '' || this.conclusion === undefined || this.conclusion === null) {
      await this.showToast(await this.translate.get('home.processes.single-round.end.form.err_empty').toPromise());
      return;
    }
    this.process.finalComment = this.conclusion;
    await this.httpClient.post<Process>(environment.apiUrl + '/v1/process/end?process_id=' + this.process.id, this.process).toPromise().then(async (delphiProcess: Process) => {
      this.process = delphiProcess;
      await this.showToast(await this.translate.get('home.processes.single-round.end.success').toPromise());
      await this.router.navigateByUrl('/logged-in/menu/processes');
    }).catch(async (errMessage: string) => {
      await this.showToast(await this.translate.get('home.processes.single-round.end.err').toPromise());
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
