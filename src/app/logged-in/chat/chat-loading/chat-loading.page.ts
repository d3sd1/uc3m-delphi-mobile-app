import {Component, OnInit} from '@angular/core';
import {UserStorage} from '../../../core/storage/user.storage';

@Component({
  selector: 'chat-loading',
  templateUrl: './chat-loading.page.html',
  styleUrls: ['./chat-loading.page.scss'],
})
export class ChatLoadingPage implements OnInit {

  constructor(private authService: UserStorage) {
  }

  ngOnInit() {
  }

}
