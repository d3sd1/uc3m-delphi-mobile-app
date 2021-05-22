import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoadingController} from '@ionic/angular';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'api-loader',
  template: ''
})
export class ApiLoaderPage implements OnInit {
  constructor(private httpClient: HttpClient, private loadingController: LoadingController,
              private router: Router,
              private translate: TranslateService) {

  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: await this.translate.get('loader.api.loading').toPromise()
    });
    await loading.present();
    this.doCheck().then(() => {
      loading.dismiss();
      this.router.navigateByUrl('/splash-screen/loader/ws');
    }).catch(async () => {
      const error = await this.loadingController.create({
        message: await this.translate.get('loader.api.failed').toPromise()
      });
      await error.present();
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
