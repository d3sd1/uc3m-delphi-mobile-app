import {Component, OnInit} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-proccesses',
  templateUrl: './proccesses.component.html',
  styleUrls: ['./proccesses.component.scss'],
})
export class ProccessesComponent implements OnInit {

  coords = 0;
  constructor(private geolocation: Geolocation) {}

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.coords = resp.coords.latitude;
      console.log("LOOONG " + resp.coords.longitude)
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
    /*
        this.faio.show({
          title: 'Biometric Authentication', // (Android Only) | optional | Default: "<APP_NAME> Biometric Sign On"
          subtitle: 'Coolest Plugin ever' // (Android Only) | optional | Default: null
          description: 'Please authenticate' // optional | Default: null
          fallbackButtonTitle: 'Use Backup', // optional | When disableBackup is false defaults to "Use Pin".
                                             // When disableBackup is true defaults to "Cancel"
          disableBackup:true,  // optional | default: false
        })
          .then((result: any) => console.log(result))
          .catch((error: any) => console.log(error));*/

  }

}
