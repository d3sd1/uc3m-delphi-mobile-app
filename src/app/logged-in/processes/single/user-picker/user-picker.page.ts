import {Component} from '@angular/core';
import {User} from '../../../../core/model/user';
import {environment} from '../../../../../environments/environment';
import {Process} from '../../../../core/model/process';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'delphi-user-picker',
  templateUrl: './user-picker.page.html',
  styleUrls: ['./user-picker.page.scss'],
})
export class UserPickerPage {
  process: Process;
  filterCriterial: string = '';
  currentUser: User;
  type;
  usersFiltered: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    public navCtrl: NavController) {
    this.route.params.subscribe(params => {
      this.type = params['type'];
    });
    this.route.snapshot.data['user'].subscribe((user) => {
      this.currentUser = user;
    });
    this.route.snapshot.data['process'].subscribe((process) => {
      this.process = process;
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

  addUser(email: string) {
    this.httpClient.put<User>(environment.apiUrl + '/v1/process/add_user?email=' + email + '&process_id=' + this.process.id +
      '&type=' + this.type.toLowerCase(), {}).subscribe((user: User) => {
      this.filterCriterial = '';

    }, (err) => {
      console.error(err);
    }, () => {
      this.filterCriterial = '';
    });
    // TODO handle err
  }
  isCoordinator(): boolean {
    return this.process.coordinators.findIndex((user) => user.id === this.currentUser.id) !== -1;
  }


  async filter() {
    if (this.filterCriterial === '' || this.filterCriterial === null) {
      return;
    }
    await this.httpClient.get<User[]>(environment.apiUrl + '/v1/process/filter?criteria=' + this.filterCriterial + '&process_id='
    + this.process.id).subscribe((users) => {
      this.usersFiltered = users;
    }, (err) => {
      console.error(err)
    });
  }
  async removeUser(user: User) {
    this.httpClient.delete<User>(environment.apiUrl + '/v1/process/rm_user?user_id=' + user.id + '&process_id=' + this.process.id, {}).subscribe((user: User) => {

    }, (err) => {
      console.error(err);
    }, () => {

    });
  }

  getUsers() {
    if(this.type.toLowerCase() == 'coordinator') {
      return this.process.coordinators;
    }
    else if(this.type.toLowerCase() == 'expert') {
      return this.process.experts;
    }
  }

}
