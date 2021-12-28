import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonSlides, NavController} from '@ionic/angular';
import {UserConsumer} from '../../user.consumer';
import {NotificationService} from '../../../core/service/notification.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'delphi-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit, OnDestroy {
  @ViewChild('logoutSlider') logoutSlider: IonSlides;

  constructor(private userConsumer: UserConsumer, private navCtrl: NavController, private ns: NotificationService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      setTimeout(() => {
        this.userConsumer.doLogout();
      }, 3000);
    });
  }

  ngOnDestroy(): void {


  }


}
