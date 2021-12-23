import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'loader',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {
  loadTime = 4000;


  constructor(private navCtrl: NavController) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.navCtrl.navigateForward('/logged-out').then(() => null);
    }, this.loadTime);
  }


}
