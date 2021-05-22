import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlertController, LoadingController} from '@ionic/angular';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'api-loader',
  template: ''
})
export class InitLoaderPage implements OnInit {
  constructor(private httpClient: HttpClient, private loadingController: LoadingController,
              private router: Router,
              private translate: TranslateService,
              public alertController: AlertController) {

  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: await this.translate.get('loader.init.loading').toPromise(),
    });
    await loading.present();
    this.doCheck().then(() => {
      loading.dismiss();
      this.router.navigateByUrl('/splash-screen/loader/api');
    }).catch(async () => {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Agile Delphi',
        message: await this.translate.get('loader.init.failed').toPromise(),
        buttons: [],
        backdropDismiss: false
      });

      await alert.present();
    });
  }


  protected doCheck(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.httpClient.get(environment.apiUrl + '/v1/version/current').subscribe(() => {
        resolve();
      }, (e) => {
        console.error(e);
        reject();
      });
    });
  }
}
