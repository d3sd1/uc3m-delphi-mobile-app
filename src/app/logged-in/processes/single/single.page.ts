import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavController, ToastController, ViewWillEnter} from '@ionic/angular';
import {UserStorage} from '../../../core/storage/user.storage';
import {ActivatedRoute, Router} from '@angular/router';
import {Process} from '../process';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {RoleService} from '../role.service';
import {Role} from '../../role';
import {DelphiProcessUser} from '../delphi-process-user';
import {User} from '../../user';
import {FilterRole} from '../filter-role';
import {WsService} from '../../../core/ws/ws.service';

@Component({
  selector: 'delphi-single',
  templateUrl: './single.page.html',
  styleUrls: ['./single.page.scss'],
})
export class SinglePage implements OnInit {

  showExpertForm = false;
  invitationEmail = '';
  process: Process;
  loggedInUser: User;

  constructor(
    private toastController: ToastController,
    private navCtrl: NavController,
    public userStorage: UserStorage,
    private route: ActivatedRoute,
    private router: Router,
    public roleService: RoleService,
    private httpClient: HttpClient,
    private wsService: WsService) {
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

    this.loggedInUser = await this.userStorage.getUser();

    // Handle process updatess


    this.wsService.subscribe('process/new', true).subscribe(async (process: Process) => {
      if (process === null) {
        return;
      }
      if(process.id === this.process.id) {
        this.process = process;
      }
    });
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
    if (user.user.id === this.loggedInUser.id) {
      return; // user can't open self chat...
    }
    this.httpClient.put(environment.apiUrl + '/v1/chat/open?userId=' + user.user.id, {}).subscribe(async (chatId) => {
      await this.router.navigateByUrl('/logged-in/home/menu/chat/chat/' + chatId);
    });
    // TODO handle err
  }

  isProcessInitiated(): boolean {
    let initiated = false;
    this.process?.rounds?.forEach((round) => {
      if (round.current || round.finished) {
        initiated = true;
      }
    });
    return initiated;
  }

  async advanceRound() {
    await this.httpClient.post<Process>(environment.apiUrl + '/v1/process/round/open?process_id=' + this.process.id, this.process).toPromise().then(async (delphiProcess: Process) => {
      await this.showToast('Ronda avanzada correctamente.');
    }).catch(async (errMessage: string) => {
      console.log(errMessage);
      await this.showToast('La ronda no pudo ser avanzada.');
    });
  }

  private async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
    });
    await toast.present();
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
    return toast;
  }


  filterRole(roles: string[]): FilterRole {
    return new FilterRole(this.process?.processUsers, roles);
  }

  goBack() {
    this.navCtrl.back();
  }

}
