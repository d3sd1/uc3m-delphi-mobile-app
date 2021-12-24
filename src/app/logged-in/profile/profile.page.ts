import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActionSheetController, NavController} from '@ionic/angular';
import {User} from '../../core/model/user';
import {UserConsumer} from '../user.consumer';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'delphi-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit, OnDestroy {
  public user: User;
  private userSubscription: Subscription;

  constructor(private actionSheetController: ActionSheetController,
              private userConsumer: UserConsumer,
              private navCtrl: NavController,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
        if (user === null) {
          return;
        }
        this.user = user;
      });
    });
  }

  ngOnDestroy() {
    if (!this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    this.user = null;
  }

  recoverPassword() {
    this.userConsumer.doLogout();
    this.navCtrl.navigateBack('/logged-out/forgot-password').then(null);
  }

  changeLanguage() {
    this.actionSheetController.create({
      header: 'Cambiar idioma',
      buttons: [
        {
          text: 'Español'
        }
      ]
    }).then(as => as.present());
  }
}


