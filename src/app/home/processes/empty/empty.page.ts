import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../../services/authentication-service';
import {User} from '../../../../model/user';

@Component({
  selector: 'delphi-empty',
  templateUrl: './empty.page.html',
  styleUrls: ['./empty.page.scss'],
})
export class EmptyPage implements OnInit {
  user: User;

  constructor(private authService: AuthenticationService) {
  }

  async ngOnInit() {
    this.user = await this.authService.getUser();
  }

}
