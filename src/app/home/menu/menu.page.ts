import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'delphi-tabs',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss']
})
export class MenuPage implements OnInit {

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
