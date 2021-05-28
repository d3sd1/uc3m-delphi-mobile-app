import {Component} from '@angular/core';
import {User} from '../../../../core/model/user';
import {environment} from '../../../../../environments/environment';
import {Process} from '../../../../core/model/process';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
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
  usersFiltered = [];

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

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  inviteUser(email: string) {
    this.httpClient.put<User>(environment.apiUrl + '/v1/process/invite?email=' + email, {}).subscribe((user: User) => {
      this.pushUser(user);
    }, (err) => {
      console.error(err);
    }, () => {
      this.filterCriterial = '';
    });
    // TODO handle err
  }

  async filterExperts() {
    if (this.filterCriterial === '' || this.filterCriterial === null) {
      return;
    }
    const users = await this.httpClient.get<User[]>(environment.apiUrl + '/v1/process/filter/expert?criteria=' + this.filterCriterial).toPromise();

  }

  pushUser(newUser: User) {
    if(this.type.toLowerCase() == 'coordinator') {
      this.process.coordinators.push(newUser);
    }
    else if(this.type.toLowerCase() == 'expert') {
      this.process.experts.push(newUser);
    }
    this.filterCriterial = '';
  }
  removeUser(user: User) {
    console.log('remove user')
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
