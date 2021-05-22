import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'loader',
  template: ''
})
export class PermissionsLoaderPage implements OnInit {
  constructor(private httpClient: HttpClient, private loadingController: LoadingController,
              private router: Router,
              private translate: TranslateService,
              public alertController: AlertController) {
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: await this.translate.get('loader.permissions.loading').toPromise()
    });
    await loading.present();

    this.doCheck().then(() => {
      loading.dismiss();
      this.router.navigateByUrl('/logged-out');
    }).catch(async () => {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Agile Delphi',
        message: await this.translate.get('loader.permissions.failed').toPromise(),
        buttons: [],
        backdropDismiss: false
      });

      await alert.present();
    });
  }


  protected doCheck(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      resolve();
      /*
      TODO -> finish this to check position and fingerprint/faceID when we have ionic enterprise
      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
      }).catch((error) => {
        //this.openSettings();
        console.log('Error getting location', error);
      });*/
    });
  }


}
