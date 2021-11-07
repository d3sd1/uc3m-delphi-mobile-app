import {Component} from '@angular/core';
import {User} from '../../../../core/model/user';
import {Process} from '../../../../core/model/process';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NavController} from '@ionic/angular';
import {UserConsumer} from '../../../../core/consumer/user/user.consumer';
import {ProcessConsumer} from '../../../../core/consumer/process/process.consumer';
import {InvitationConsumer} from '../../../../core/consumer/process/invitation.consumer';

@Component({
  selector: 'delphi-user-picker',
  templateUrl: './user-picker.page.html',
  styleUrls: ['./user-picker.page.scss'],
})
export class UserPickerPage {
  process = new Process();
  filterCriterial = '';
  currentUser = new User();
  type;
  searchableUsers: User[] = [];
  usersFiltered: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userConsumer: UserConsumer,
    private httpClient: HttpClient,
    private processConsumer: ProcessConsumer,
    private invitationConsumer: InvitationConsumer,
    public navCtrl: NavController) {
    this.route.params.subscribe(params => {
      this.type = params.type;
    });
    this.userConsumer.getUser().subscribe((user) => {
      this.currentUser = user;
    });
    this.route.params.subscribe(params => {
      this.processConsumer.getProcesses().subscribe((processes) => {
        if (processes !== null && params !== null) {
          this.process = processes.find(p => p.id === +params.id);
        }
      });
    });
    this.invitationConsumer.getUsers().subscribe((users) => {
      console.log('users to search are:', users);
      this.searchableUsers = users;
    });
  }

  isEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  isNewUser(email) {
    return this.usersFiltered.findIndex((user) => {
      return user.email === email;
    }) === -1;
  }

  addExistantUser(user: User) {
    this.invitationConsumer.addExistantUserToProcess(user.id, this.process?.id, this.type);
    this.filterCriterial = '';
  }

  addNewUser(email: string) {
    this.invitationConsumer.sendInvitation(email, this.process?.id, this.type);
    this.filterCriterial = '';
  }

  isCoordinator(): boolean {
    return this.process?.coordinators.findIndex((user) => user.id === this.currentUser.id) !== -1;
  }

  async filter() {
    if (this.filterCriterial === '' || this.filterCriterial === null) {
      this.usersFiltered = [];
      return;
    }

    this.usersFiltered = this.searchableUsers.filter((u) => {
      return u.email.includes(this.filterCriterial)
        || u.name.includes(this.filterCriterial)
        || u.surnames.includes(this.filterCriterial);
    });
  }

  async removeUser(user: User) {
    this.invitationConsumer.removeFromProcess(user.id, this.process?.id);
  }

  getUsers() {
    if (this.type.toLowerCase() === 'coordinator') {
      return this.process?.coordinators;
    } else if (this.type.toLowerCase() === 'expert') {
      return this.process?.experts;
    }
  }

}
