import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NavController} from '@ionic/angular';
import {UserConsumer} from '../../../user.consumer';
import {ProcessConsumer} from '../../process.consumer';
import {InvitationConsumer} from './invitation.consumer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'delphi-user-picker',
  templateUrl: './user-picker.page.html',
  styleUrls: ['./user-picker.page.scss'],
})
export class UserPickerPage implements OnInit, OnDestroy {
  process;
  filterCriterial = '';
  currentUser;
  type;
  searchableUsers: User[] = [];
  usersFiltered: User[] = [];

  userSubscription: Subscription;
  processSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private userConsumer: UserConsumer,
    private httpClient: HttpClient,
    private processConsumer: ProcessConsumer,
    private invitationConsumer: InvitationConsumer,
    public navCtrl: NavController) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.type = params.type;
      this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
        if (user === null) {
          return;
        }
        this.currentUser = user;
      });
      this.processSubscription = this.processConsumer.getProcesses().subscribe((processes) => {
        if (processes == null) {
          return;
        }
        this.process = processes.find(p2 => p2.id === +params.id);
      });
      this.invitationConsumer.getUsers().subscribe((users) => {
        if (users === null) {
          return;
        }
        this.searchableUsers = users;
      });
    });
  }


  isEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  isNewUser(email) {
    return this.usersFiltered.findIndex((user) => {
      return user.email === email;
    }) === -1;
  }

  addExistantUser(user: User) {
    this.invitationConsumer.addExistantUserToProcess(user.id, this.process.id, this.type);
    this.filterCriterial = '';
  }

  addNewUser(email: string) {
    this.invitationConsumer.sendInvitation(email, this.process.id, this.type);
    this.filterCriterial = '';
  }

  isCoordinator(): boolean {
    return this.process.coordinators.some((user) => user.id === this.currentUser.id);
  }

  filter() {
    if (this.filterCriterial === '' || this.filterCriterial === null || !this.currentUser) {
      this.usersFiltered = [];
      return;
    }

    this.usersFiltered = this.searchableUsers.filter((u) => {
      return (u.email.includes(this.filterCriterial)
          || u.name.includes(this.filterCriterial)
          || u.surnames.includes(this.filterCriterial))
        && !this.process.experts.some(u2 => u.id === u2.id)
        && !this.process.coordinators.some(u2 => u.id === u2.id)
        && u.id !== this.currentUser.id;
    });
  }

  removeUser(user: User) {
    this.invitationConsumer.removeFromProcess(user.id, this.process.id);
  }

  getUsers() {
    if (this.type.toLowerCase() === 'coordinator') {
      return this.process.coordinators;
    } else if (this.type.toLowerCase() === 'expert') {
      return this.process.experts;
    }
  }

  ngOnDestroy(): void {
    if (!this.processSubscription.closed) {
      this.processSubscription.unsubscribe();
    }
    if (!this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
  }

}
