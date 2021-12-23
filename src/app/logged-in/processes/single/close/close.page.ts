import {Component} from '@angular/core';
import {Process} from '../../../../core/model/process';
import {NavController, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {User} from '../../../../core/model/user';
import {UserConsumer} from '../../../../core/consumer/user/user.consumer';
import {ProcessConsumer} from '../../../../core/consumer/process/process.consumer';

@Component({
  selector: 'delphi-close',
  templateUrl: './close.page.html',
  styleUrls: ['./close.page.scss'],
})
export class ClosePage {

  process: Process;
  user: User;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private userConsumer: UserConsumer,
    private httpClient: HttpClient,
    private processConsumer: ProcessConsumer,
    private toastController: ToastController,
    private translate: TranslateService) {
    this.userConsumer.getUser().subscribe((user) => {
      this.user = user;
    });
    this.route.params.subscribe(params => {
      this.processConsumer.getProcess(+params.id).subscribe((process) => {
        // If process is finished, do not allow to stay on this page
        if (process.finished) {
          this.navCtrl.navigateBack('/logged-in/menu/processes/finished/' + this.process.id).then(r => null);
        }
        this.process = process;
      });
    });
  }


  public async closeProcess() {
    if (this.process.conclusion === '' || this.process.conclusion === undefined || this.process.conclusion === null) {
      this.showToast('Debes introducir una conclusión');
      return;
    }
    this.processConsumer.closeProcess(this.process?.id);
    this.navCtrl.navigateBack('/logged-in/menu/processes/finished/' + this.process.id).then(r => null);
  }


  private showToast(msg: string) {
    this.toastController.create({
      position: 'top',
      message: msg,
    }).then(toast => {
      toast.present().then(r => {
        setTimeout(() => {
          toast.dismiss().then(r => null);
        }, 3000);
      });
    });
  }
}
