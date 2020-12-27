import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoadingController} from '@ionic/angular';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'loader',
  template: ''
})
export class KafkaLoaderComponent implements OnInit {
  constructor(private httpClient: HttpClient, private loadingController: LoadingController,
              private router: Router) {
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Sincronizando...'
    });
    await loading.present();

    this.doCheck().then(() => {
      loading.dismiss();
      this.router.navigateByUrl('/logged-out');
    }).catch(async () => {
      const error = await this.loadingController.create({
        message: 'No se ha podido cargar los permisos'
      });
      await error.present();
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const {role, data} = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  protected doCheck(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      console.log(environment.apiUrl + '/v1/version/current');
      this.httpClient.get(environment.apiUrl + '/v1/version/current').subscribe(() => {
        resolve();
      }, (e) => {
        console.error(e);
        reject();
      });
    });
  }
}
