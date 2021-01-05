import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoadingController} from '@ionic/angular';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'api-loader',
  template: ''
})
export class InitLoaderPage implements OnInit {
  constructor(private httpClient: HttpClient, private loadingController: LoadingController,
              private router: Router) {

  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Cargando API...'
    });
    await loading.present();
    this.doCheck().then(() => {
      loading.dismiss();
      this.router.navigateByUrl('/splash-screen/loader/api');
    }).catch(async () => {
      const error = await this.loadingController.create({
        message: 'No se ha podido cargar la API'
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
