import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {UserStorage} from '../../../core/storage/user.storage';
import {ActivatedRoute, Router} from '@angular/router';
import {Process} from '../process';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {RoleService} from '../role.service';
import {Role} from '../../role';
import {DelphiProcessUser} from '../delphi-process-user';

@Component({
  selector: 'delphi-single',
  templateUrl: './single.page.html',
  styleUrls: ['./single.page.scss'],
})
export class SinglePage implements OnInit {

  showExpertForm = false;
  invitationEmail = '';
  process: Process;

  constructor(
    private toastController: ToastController,
    private navCtrl: NavController,
    public userStorage: UserStorage,
    private route: ActivatedRoute,
    private router: Router,
    public roleService: RoleService,
    private httpClient: HttpClient) {

  }

  countUsersRole(role: Role) {
    return this.process?.processUsers.filter((delphiProcessUser) => {
      return delphiProcessUser.role?.id === role.id;
    }).length;
  }

  private async loadProcess() {
    this.route.queryParams.subscribe(async params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.process = this.router.getCurrentNavigation().extras.state.process;
      } else {
        await this.router.navigateByUrl('/logged-in/home/menu/processes');
      }
    });
  }

  public async ngOnInit(): Promise<void> {
    await this.loadProcess();
  }

  showExpertInvitation() {
    this.showExpertForm = true;
  }

  async sendExpertInvitation() {
    this.showExpertForm = false;
    this.invitationEmail = '';
    const toast = await this.toastController.create({
      message: 'Invitación enviada',
    });
    await toast.present();
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
  }

  openChat(user: DelphiProcessUser) {
    this.httpClient.put(environment.apiUrl + '/v1/chat/open?userId=' + user.user.id, {}).subscribe(async (chatId) => {
      await this.router.navigateByUrl('/logged-in/home/menu/chat/chat/' + chatId);
    });
    // TODO handle err
  }

  goBack() {
    this.navCtrl.back();
  }

}
