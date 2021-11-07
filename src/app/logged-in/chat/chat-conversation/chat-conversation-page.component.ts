import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent, NavController} from '@ionic/angular';


import {ChatService} from '../chat.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserChat} from '../../../core/model/user-chat';
import {User} from '../../../core/model/user';
import {ChatMessage} from '../../../core/model/chat-message';
import {WsService} from '../../../core/service/ws.service';
import {ChatConsumer} from '../../../core/consumer/chat/chat.consumer';

@Component({
  selector: 'delphi-chat-conversation',
  templateUrl: './chat-conversation-page.component.html',
  styleUrls: ['./chat-conversation-page.component.scss'],
})
export class ChatConversationPage {
  chat: UserChat = null;
  user: User = null;

  editorMsg = '';
  showEmojiPicker = false;

  @ViewChild(IonContent, {read: IonContent, static: false}) chatDisplay: IonContent;

  constructor(
    private chatConsumer: ChatConsumer,
    private route: ActivatedRoute,
  ) {
    /* TODO
    this.chat = this.route.snapshot.data['current_chat'];
    this.scrollToBottom();
    this.route.snapshot.data['user'].subscribe((user) => {
      this.user = user;
    }); */
  }


  async scrollToBottom() {
    await this.chatDisplay.scrollToBottom(300);
  }

  showKeyboard() {
    //  this.keyboard.showMessenger(null);
  }

  hideKeyboard() {
    // this.keyboard.hideMessenger(null);
  }

  checkEnterKey(keyCode) {
    if (keyCode === 13) {
      this.sendMessage();
    }
  }


  async sendMessage() {
    if (this.editorMsg === '') {
      return;
    }
    const chatMessage = new ChatMessage();
    chatMessage.sentBy = this.user;
    chatMessage.sentTo = this.chat.toUser;
    chatMessage.id = 0;
    chatMessage.message = this.editorMsg;
    chatMessage.read = false;
    chatMessage.sentDate = new Date();
    this.chat.chatMessages.push(chatMessage);
    this.editorMsg = '';
    //await this.chatConsumer.writeToChat(this.chat.id, chatMessage);
    await this.scrollToBottom();
  }
  async onFocus() {
    this.showEmojiPicker = false;
    await this.scrollToBottom();
  }

  async switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      //this.focus();
    } else {
      //this.setTextareaScroll();
    }
    await this.scrollToBottom();
  }

  /*
    private focus() {
      if (this.messageInput && this.messageInput.nativeElement) {
        this.messageInput.nativeElement.focus();
      }
    }

    private setTextareaScroll() {
      const textarea = this.messageInput.nativeElement;
      textarea.scrollTop = textarea.scrollHeight;
    }*/
}
