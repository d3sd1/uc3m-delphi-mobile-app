import {Component} from '@angular/core';
import {User} from '../../../user';
import {environment} from '../../../../../environments/environment';
import {Process} from '../../process';
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
  usersFiltered: User[] = [];
  currentUser: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    public navCtrl: NavController) {

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

  async filterExperts() {
    if (this.filterCriterial === '' || this.filterCriterial === null) {
      return;
    }
    const users = await this.httpClient.get<User[]>(environment.apiUrl + '/v1/process/filter/expert?criteria=' + this.filterCriterial).toPromise();

  }

  pushExpert(newUser: User) {

    this.filterCriterial = '';
  }

  removeExpert() {

  }

}
