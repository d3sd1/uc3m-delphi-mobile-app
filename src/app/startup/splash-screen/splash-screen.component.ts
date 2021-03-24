import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'delphi-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit {
  windowWidth: string;
  showSplash = true;

  ngOnInit(): void {
    this.windowWidth = '-' + window.innerWidth + 'px';
    /*
          setTimeout(() => {
            this.showSplash = !this.showSplash;
          }, 500);*/
  }

}