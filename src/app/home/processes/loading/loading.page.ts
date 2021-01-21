import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../../services/authentication-service';

@Component({
  selector: 'delphi-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

}
