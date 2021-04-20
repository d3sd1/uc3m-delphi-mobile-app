import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActionSheetController} from '@ionic/angular';
import {LangService} from './lang.service';
import {UserService} from '../onboarding/user.service';
import {UserStorage} from '../../core/storage/user.storage';
import {User} from '../user';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';
import {Language} from './language';
import {Media} from '../processes/media';

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
    console.log(this.user)
  }


  async initializeItems(): Promise<any> {
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
    const formData = new FormData();
    formData.append('image', this.uploadPicture.nativeElement.files[0]);
    this.httpClient.post<Media>(environment.apiUrl + '/v1/media/upload', formData, {headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })}).subscribe(
      async (res) => {
        this.user.photo = environment.apiUrl + '/v1/media/fetch/' + res.id;
        await this.userStorage.setUser(this.user);
      },
      (err) => console.log(err)
    );
  }
  async uploadCv() {
    const formData = new FormData();
    formData.append('cv', this.uploadCvRef.nativeElement.files[0]);
    this.httpClient.post(environment.apiUrl + '/v1/profile/cv', formData, {headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })}).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    await this.userStorage.setUser(this.user);
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

  async updateNotificationPreferences(enabled: boolean) {
    this.user.notificationStatus = enabled;
    this.httpClient.post(environment.apiUrl + '/v1/profile/notifications?enabled=' + this.user.notificationStatus, {}).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    await this.userStorage.setUser(this.user);
  }

  async changeLanguage() {
    const langs = await this.langService.getAvailableLangs();
    const sheets = [];
    langs.forEach((lang) => {
      sheets.push({
        text: lang.keyName,
        cssClass: this.user.language.id === lang.id ? 'current-lang' : '',
        //his.userStorage.
        handler: async () => {
          lang.keyName = lang.keyName.toLowerCase();
          this.user.language = lang;
          this.translate.use(this.user.language.keyName.toLowerCase());
          await this.userStorage.setUser(this.user);
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
