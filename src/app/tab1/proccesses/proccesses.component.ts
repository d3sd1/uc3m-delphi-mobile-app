import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, NavController} from '@ionic/angular';
import {FingerprintAIO, FingerprintOptions} from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-proccesses',
  templateUrl: './proccesses.component.html',
  styleUrls: ['./proccesses.component.scss'],
})
export class ProccessesComponent implements OnInit {
  fingerprintOptions: FingerprintOptions;

  constructor(public navCtrl: NavController, private fingerAuth: FingerprintAIO) {

  }

  ngOnInit(): void {
  }

  public showFingerprintAuthDlg() {
    this.fingerprintOptions = {
      // @ts-ignore
      clientId: 'fingerprint-Demo',
      clientSecret: 'password',
      disableBackup: true,
    };
    this.fingerAuth.isAvailable().then(result => {
      if (result === 'OK') {
        this.fingerAuth.show(this.fingerprintOptions)
          // tslint:disable-next-line:no-shadowed-variable
          .then((result: any) => console.log(result))
          .catch((error: any) => console.log(error));
      }
    });
  }
}
