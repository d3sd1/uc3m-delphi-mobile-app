import {Component, OnInit} from '@angular/core';
import {ActionSheetController} from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  public profileOptions: any[];
  public profileOptionsBackup: any[];

  constructor(private actionSheetController: ActionSheetController) {
  }

  async ngOnInit() {
    this.profileOptions = await this.initializeItems();
  }

  async initializeItems(): Promise<any> {
    const profileOptions = [
      {
        name: 'Notificaciones',
        type: 'switcher',
        disabled: true
      },
      {
        name: 'Estado del chat',
        type: 'bottom-multichoice',
        disabled: false
      },
      {
        name: 'Cambiar contraseña',
        type: 'modal-trigger',
        modalName: 'change-password',
        disabled: false
      },
      {
        name: 'Desconectar',
        type: 'modal-trigger',
        modalName: 'user-logout-confirm',
        disabled: false
      },
      {
        name: 'Perfil profesional',
        type: 'link',
        linkRouterUrl: '/profile/profesional',
        disabled: false
      }];
    this.profileOptionsBackup = profileOptions;
    return profileOptions;
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
