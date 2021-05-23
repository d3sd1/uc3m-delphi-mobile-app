import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent, NavController} from '@ionic/angular';


import {ChatService} from '../chat.service';
import {ActivatedRoute, Router} from '@angular/router';
import {getChatInfo, UserChat} from '../user-chat';
import {User} from '../../user';
import {ChatMessage} from './chat-message';
import {WsService} from '../../../core/ws/ws.service';

@Component({
  selector: 'delphi-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.scss'],
})
export class ChatConversationComponent implements OnInit {
  chat: UserChat = null;
  user: User = null;

  editorMsg = '';
  showEmojiPicker = false;

  @ViewChild(IonContent, {read: IonContent, static: false}) chatDisplay: IonContent;

  constructor(
    private navCtrl: NavController,
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private wsService: WsService
  ) {
  }


  selfChat() {
    if (this.chat === null || this.user === null) {
      return;
    }
    return getChatInfo(this.chat, this.user?.id);
  }


  async scrollToBottom() {
    await this.chatDisplay.scrollToBottom(300);
  }

  async ngOnInit() {
   //TODO  this.user = await this.authService.getUser();
    const chatId = parseInt(this.activatedRoute.snapshot.paramMap.get('chatId'), 10);
    if (chatId === 0 || isNaN(chatId)) {
      await this.router.navigateByUrl('/home/menu/chat');
      return;
    }
    this.chatService.getChatById(chatId).then((userChat: UserChat) => {
      this.chat = userChat;
      this.chatService.postReadChat(chatId).then(() => {
        this.chatService.getCurrentUserChats(); // reload chats
        this.scrollToBottom();
      });
    });
/*TODO
    this.wsService.subscribe('chat/messages', true).subscribe(async (msg: ChatMessage) => {
      this.chat?.chatMessages.push(msg);
      await this.scrollToBottom();
    });*/
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
    chatMessage.sentTo = this.chat.users.find((user: User) => {
      return user.id !== this.user.id;
    });
    chatMessage.id = 0;
    chatMessage.message = this.editorMsg;
    chatMessage.read = false;
    chatMessage.sentDate = new Date();
    this.chat.chatMessages.push(chatMessage);
    this.editorMsg = '';
    await this.chatService.writeToChat(this.chat.id, chatMessage);
    await this.scrollToBottom();
  }

  async goBack() {
    this.navCtrl.back();
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
