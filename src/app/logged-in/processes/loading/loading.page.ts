import {Component, OnInit} from '@angular/core';
import {UserStorage} from '../../../core/storage/user.storage';

@Component({
  selector: 'delphi-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  constructor(private authService: UserStorage) {
  }

  ngOnInit() {
  }

}
