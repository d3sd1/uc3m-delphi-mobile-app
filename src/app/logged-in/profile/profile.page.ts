import {Component, OnInit} from '@angular/core';
import {ActionSheetController} from '@ionic/angular';
import {LangService} from './lang.service';
import {UserService} from '../onboarding/user.service';
import {UserStorage} from '../../core/storage/user.storage';
import {User} from '../user';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'delphi-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {


  public profileOptions: any[];
  public profileOptionsBackup: any[];
  public user: User;

  constructor(private actionSheetController: ActionSheetController, private langService: LangService, private userStorage: UserStorage,
              private translate: TranslateService, private httpClient: HttpClient, private sanitizer: DomSanitizer) {
  }

  async ngOnInit() {
    this.profileOptions = await this.initializeItems();
    this.user = await this.userStorage.getUser();
    await this.loadUserImage();
  }

  private async loadUserImage() {
    const blob = await this.httpClient.get(environment.apiUrl + '/v1/profile/img', {responseType: 'blob'}).toPromise();
    const objectURL = URL.createObjectURL(blob);
    const img = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    this.user.photo = img;
  }

  async initializeItems(): Promise<any> {
  }

  async triggerStatusChatHandler() {
    await this.presentActionSheet();
  }

  async filterList(evt) {
    this.profileOptions = this.profileOptionsBackup;
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.profileOptions = this.profileOptions.filter(currentFood => {
      if (currentFood.name && searchTerm) {
        return (currentFood.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  updateNotificationPreferences() {

  }

  async changeLanguage() {
    const langs = await this.langService.getAvailableLangs();
    console.log(langs);
    const sheets = [];
    langs.forEach((lang) => {
      sheets.push({
        text: lang.keyName,
        cssClass: this.user.language.id === lang.id ? 'current-lang' : '',
        //his.userStorage.
        handler: () => {
          this.translate.resetLang(lang.keyName.toLowerCase());
        }
      });
    });

    const actionSheet = await this.actionSheetController.create({
      header: 'Idioma',
      buttons: sheets
    });
    await actionSheet.present();
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Estado de conexión',
      buttons: [{
        text: 'Conectado',
        icon: 'radio-button-on-outline',
        cssClass: 'chat-online',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Ocupado',
        icon: 'radio-button-on-outline',
        cssClass: 'chat-busy',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Desconectado',
        icon: 'radio-button-on-outline',
        cssClass: 'chat-offline',
        handler: () => {
          console.log('Play clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
