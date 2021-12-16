import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActionSheetController, NavController} from '@ionic/angular';
import {User} from '../../core/model/user';
import {TranslateService} from '@ngx-translate/core';
import {LangService} from '../../core/lang/lang.service';
import {UserConsumer} from '../../core/consumer/user/user.consumer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'delphi-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  public profileOptionsBackup: any[];
  public user: User;
  @ViewChild('uploadPicture') uploadPicture: ElementRef;
  @ViewChild('uploadCvRef') uploadCvRef: ElementRef;
  private userSubscription: Subscription;

  constructor(private actionSheetController: ActionSheetController, private langService: LangService, private userConsumer: UserConsumer,
              private translate: TranslateService,
              private navCtrl: NavController) {
    this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  async ionViewWillLeave() {
    this.userSubscription.unsubscribe();
  }

  triggerUploadImage() {
    this.uploadPicture.nativeElement.click();
  }

  triggerUploadCv() {
    this.uploadCvRef.nativeElement.click();
  }

  async triggerStatusChatHandler() {
    await this.presentActionSheet();
  }

  async updateNotificationPreferences(enabled: boolean) {
    // todo await this.userConsumer.updateNotificationPreferences(enabled);
  }

  recoverPassword() {
    this.userConsumer.doLogout().then(() => {
      this.navCtrl.navigateBack('/logged-out/forgot-password').then(() => null);
    });
  }

  async changeLanguage() {
    const langs = await this.langService.getAvailableLangs();
    const sheets = [];
    for (const lang of langs) {
      sheets.push({
        text: 'Español',
        cssClass: this.user?.language?.id === lang.id ? 'current-lang' : '',
        handler: async () => {
          // todo  if you want to update language do it here :)
        }
      });
    }

    const actionSheet = await this.actionSheetController.create({
      header: 'Cambiar idioma',
      buttons: sheets
    });
    await actionSheet.present();
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: await this.translate.get('home.profile.chat.status.title').toPromise(),
      buttons: [{
        text: await this.translate.get('home.profile.chat.status.connected').toPromise(),
        icon: 'radio-button-on-outline',
        cssClass: 'chat-online'
      }, {
        text: await this.translate.get('home.profile.chat.status.busy').toPromise(),
        icon: 'radio-button-on-outline',
        cssClass: 'chat-busy'
      }, {
        text: await this.translate.get('home.profile.chat.status.offline').toPromise(),
        icon: 'radio-button-on-outline',
        cssClass: 'chat-offline'
      }]
    });
    await actionSheet.present();
  }
}


