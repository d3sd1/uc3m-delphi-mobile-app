import {Component, OnInit} from '@angular/core';
import {User} from '../../user';
import {environment} from '../../../../environments/environment';
import {Process} from '../process';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NavController} from '@ionic/angular';
import {DelphiProcessUser} from '../delphi-process-user';
import {Role} from '../../role';
import {UserService} from '../../onboarding/user.service';
import {UserStorage} from '../../../core/storage/user.storage';
import {RoleService} from '../role.service';

@Component({
  selector: 'delphi-user-picker',
  templateUrl: './user-picker.page.html',
  styleUrls: ['./user-picker.page.scss'],
})
export class UserPickerPage implements OnInit {
  process: Process;
  role: Role;
  filterCriterial: string = '';
  usersFiltered: User[] = [];
  currentUser: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    public navCtrl: NavController,
    private userStorage: UserStorage,
    private roleService: RoleService) {

  }


  private async loadProcess() {
    this.route.queryParams.subscribe(async params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.process = this.router.getCurrentNavigation().extras.state.process;
        this.role = this.router.getCurrentNavigation().extras.state.role;
      } else {
        await this.router.navigateByUrl('/logged-in/home/menu/processes');
      }
    });
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  inviteUser(email: string) {
    this.httpClient.put<User>(environment.apiUrl + '/v1/process/invite?email=' + email, {}).subscribe((user: User) => {
      this.pushExpert(user);
    }, (err) => {
      console.error(err);
    }, () => {
      this.filterCriterial = '';
    });
    // TODO handle err
  }

  public async ngOnInit(): Promise<void> {
    await this.loadProcess();
    this.currentUser = await this.userStorage.getUser();
  }

  async filterExperts() {
    if (this.filterCriterial === '' || this.filterCriterial === null) {
      return;
    }
    const users = await this.httpClient.get<User[]>(environment.apiUrl + '/v1/process/filter/expert?criteria=' + this.filterCriterial).toPromise();
    this.usersFiltered = users.filter((expert: User) => {
      return !this.process.processUsers.find((pExpert: DelphiProcessUser) => {
        return pExpert.user.id === expert.id;
      });
    });
  }

  pushExpert(newUser: User) {
    const userOldPos = this.process.processUsers.findIndex((processUser) => {
      return processUser.user.id === newUser.id;
    });
    if (userOldPos === -1) {
      this.process.processUsers.push(new DelphiProcessUser(newUser, this.role));
    } else {
      this.process.processUsers[userOldPos] = new DelphiProcessUser(newUser, this.role);
    }
    this.filterCriterial = '';
  }

  removeExpert(expert: DelphiProcessUser) {
    this.process.processUsers = this.process.processUsers.filter((pExpert: DelphiProcessUser) => {
      return pExpert.user.id !== expert.user.id;
    });
  }

  async saveUsers() {
    //TODO determine logic to add to it's role (pass role by routing)
    //TODO aqui al editar un proceso que ya tiene uysuarios los borra yt solo añade los nuevos
    // deberia combinar los antiguos y los nuevos, y actualizar roles (sin duplicados)
    await this.router.navigateByUrl('/logged-in/home/menu/processes/modify', {
      state: {
        process: this.process
      }
    });
  }

  async goBack() {
    await this.router.navigateByUrl('/logged-in/home/menu/processes/modify', {
      state: {
        process: this.process
      }
    });
  }


}
