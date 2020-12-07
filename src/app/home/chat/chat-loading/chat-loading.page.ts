import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../../services/authentication-service';

@Component({
  selector: 'chat-loading',
  templateUrl: './chat-loading.page.html',
  styleUrls: ['./chat-loading.page.scss'],
})
export class ChatLoadingPage implements OnInit {

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

}
