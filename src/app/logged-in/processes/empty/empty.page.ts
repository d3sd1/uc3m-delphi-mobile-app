import {Component, OnInit} from '@angular/core';
import {UserStorage} from '../../../core/storage/user.storage';
import {User} from '../../user';

@Component({
  selector: 'delphi-empty',
  templateUrl: './empty.page.html',
  styleUrls: ['./empty.page.scss'],
})
export class EmptyPage implements OnInit {
  user: User;

  constructor(private authService: UserStorage) {
  }

  async ngOnInit() {
    this.user = await this.authService.getUser();
  }

}
