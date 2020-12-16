import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'delphi-single',
  templateUrl: './single.page.html',
  styleUrls: ['./single.page.scss'],
})
export class SinglePage implements OnInit {

  constructor(
    private navCtrl: NavController) {
  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

}
