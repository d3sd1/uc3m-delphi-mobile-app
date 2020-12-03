import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'delphi-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.scss'],
})
export class ChatConversationComponent implements OnInit {
  msg = '';

  constructor(
    //private keyboard: NativeKeyboard
  ) {
  }

  ngOnInit() {
  }

  showKeyboard() {
    //  this.keyboard.showMessenger(null);
  }

  hideKeyboard() {
    // this.keyboard.hideMessenger(null);
  }

  sendMessage() {
    //TODO: send to rest and show up.
    this.msg = '';
  }

}
