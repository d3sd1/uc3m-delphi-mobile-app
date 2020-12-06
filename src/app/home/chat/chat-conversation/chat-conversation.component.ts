import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {UserChat} from '../../../../model/user-chat';
import {ChatService} from '../../../../mock/chat.service';

@Component({
  selector: 'delphi-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.scss'],
})
export class ChatConversationComponent implements OnInit {
  // TODO: fetch chat from rest!!! with preloader
  chat: UserChat;

  constructor(
    private navCtrl: NavController,
    private chatService: ChatService
    //private keyboard: NativeKeyboard
  ) {
  }

  ngOnInit() {
    /*this.chatService.postReadChat(this.chat.id).then(() => {
    });*/
  }

  showKeyboard() {
    //  this.keyboard.showMessenger(null);
  }

  hideKeyboard() {
    // this.keyboard.hideMessenger(null);
  }

  sendMessage() {
    //TODO: send to rest and show up.
  }

  goBack() {
    this.navCtrl.back();
  }

}
