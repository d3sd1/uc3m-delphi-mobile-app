import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'delphi-tabs',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  notifications = {
    proccess: 0,

    messages: 0,
    profile: 0
  };

  constructor() {
  }

  ngOnInit(): void {
    document.addEventListener('notificationCountUpdate', (e: CustomEvent) => {
      this.notifications.messages = e.detail;
    }, false);
  }


}
