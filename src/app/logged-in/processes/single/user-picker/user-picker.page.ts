import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {UserConsumer} from '../../../user.consumer';
import {ProcessConsumer} from '../../process.consumer';
import {InvitationConsumer} from './invitation.consumer';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../../../core/service/notification.service';

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
  loading: HTMLIonLoadingElement;
  searchableUsers: User[] = [];
  usersFiltered: User[] = [];

  userSubscription: Subscription;
  processSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private userConsumer: UserConsumer,
    private ns: NotificationService,
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
        if (this.process === undefined) {
          return;
        }
        if (this.loading) {
          this.loading.dismiss().then(null);
        }
        this.filter();
      });
      this.invitationConsumer.getUsers().subscribe((users) => {
        if (users === null) {
          return;
        }
        this.searchableUsers = users;
        this.filter();
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

  isNewUser() {
    return this.searchableUsers.findIndex((user) => {
      return user.email.toLowerCase() === this.filterCriterial.toLowerCase();
    }) === -1;
  }

  addExistantUser(user: User) {
    this.filterCriterial = '';
    this.invitationConsumer.addExistantUserToProcess(user.id, this.process.id, this.type);
    this.ns.showLoading('Actualizando...', 0).then(l => {
      this.loading = l;
    });
  }

  addNewUser(email: string) {
    this.filterCriterial = '';
    this.invitationConsumer.sendInvitation(email, this.process.id, this.type);
    this.ns.showLoading('Actualizando...', 0).then(l => {
      this.loading = l;
    });
  }

  isCoordinator(): boolean {
    return this.process.coordinators.some((user) => user.id === this.currentUser.id);
  }

  filter() {
    if (this.filterCriterial === '' || this.filterCriterial === null || !this.currentUser || this.filterCriterial.trim().length === 0) {
      this.usersFiltered = [];
      return;
    }

    this.usersFiltered = this.searchableUsers.filter((u) => {
      return (u.email.toLowerCase().includes(this.filterCriterial.toLowerCase())
          || u.name.toLowerCase().includes(this.filterCriterial.toLowerCase())
          || u.surnames.toLowerCase().includes(this.filterCriterial.toLowerCase()))
        && !this.process.experts.some(u2 => u.id === u2.id)
        && !this.process.coordinators.some(u2 => u.id === u2.id)
        && u.id !== this.currentUser.id;
    });
  }

  removeUser(user: User) {
    this.invitationConsumer.removeFromProcess(user.id, this.process.id);
    this.ns.showLoading('Actualizando...', 0).then(l => {
      this.loading = l;
    });
  }

  getUsers() {
    if (this.type.toLowerCase() === 'coordinator') {
      return this.process.coordinators;
    } else if (this.type.toLowerCase() === 'expert') {
      return this.process.experts;
    }
  }

  ngOnDestroy(): void {
    if (this.processSubscription && !this.processSubscription.closed) {
      this.processSubscription.unsubscribe();
    }
    if (this.userSubscription && !this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    if (this.loading) {
      this.loading.dismiss().then(() => this.loading = undefined);
    }
  }

}
