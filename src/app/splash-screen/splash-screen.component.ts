import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'loader',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit {
  loadTime = 4000;


  constructor(private navCtrl: NavController) {
  }

  ngOnInit(): void {
    setTimeout(async () => {
      await this.navCtrl.navigateForward('/splash-screen/loader/init');
    }, 4000);
  }
}
