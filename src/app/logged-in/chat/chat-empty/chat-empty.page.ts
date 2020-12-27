import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../logged-out/login/authentication-service';
import {User} from '../../user';

@Component({
  selector: 'delphi-chat-empty',
  templateUrl: './chat-empty.page.html',
  styleUrls: ['./chat-empty.page.scss'],
})
export class ChatEmptyPage implements OnInit {
  user: User;

  constructor(private authService: AuthenticationService) {
  }

  async ngOnInit() {
    this.user = await this.authService.getUser();
  }

}
