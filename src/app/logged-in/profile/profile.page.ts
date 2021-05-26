import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActionSheetController} from '@ionic/angular';
import {User} from '../user';
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
  private userSubscription: Subscription;

  constructor(private actionSheetController: ActionSheetController, private langService: LangService, private userConsumer: UserConsumer,
              private translate: TranslateService) {
  }

  async ionViewWillEnter() {
    this.user = this.userConsumer.getUser().getValue();
  }

  async ionViewWillLeave() {
    this.userSubscription.unsubscribe();
  }

  @ViewChild('uploadPicture') uploadPicture: ElementRef;

  triggerUploadImage() {
    this.uploadPicture.nativeElement.click();
  }

  @ViewChild('uploadCvRef') uploadCvRef: ElementRef;

  triggerUploadCv() {
    this.uploadCvRef.nativeElement.click();
  }

  async uploadImage() {
    const newPhoto = new FormData();
    newPhoto.append('image', this.uploadPicture.nativeElement.files[0]);
    await this.userConsumer.updatePicture(newPhoto);
  }

  async uploadCv() {
    const cv = new FormData();
    cv.append('cv', this.uploadCvRef.nativeElement.files[0]);
    await this.userConsumer.updateCv(cv);
  }

  async triggerStatusChatHandler() {
    await this.presentActionSheet();
  }

  async updateNotificationPreferences(enabled: boolean) {
    await this.userConsumer.updateNotificationPreferences(enabled);
  }

  async changeLanguage() {
    const langs = await this.langService.getAvailableLangs();
    const sheets = [];
    for (const lang of langs) {
      sheets.push({
        text: await this.translate.get(`language.${lang.keyName.toLowerCase()}`).toPromise(),
        cssClass: this.user?.language?.id === lang.id ? 'current-lang' : '',
        handler: async () => {
          await this.userConsumer.updateLanguage(lang);
        }
      });
    }

    const actionSheet = await this.actionSheetController.create({
      header: await this.translate.get('home.profile.language.header').toPromise(),
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
