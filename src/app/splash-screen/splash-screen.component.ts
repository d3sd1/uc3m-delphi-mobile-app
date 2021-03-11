import {Component, OnInit} from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';

@Component({
  selector: 'loader',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit {
  loadTime = 4000;


  constructor(private statusBar: StatusBar,
              private router: Router) {
  }

  ngOnInit(): void {

  }
}
