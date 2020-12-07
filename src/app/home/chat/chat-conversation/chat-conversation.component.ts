import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent, NavController} from '@ionic/angular';
import {getChatName, UserChat} from '../../../../model/user-chat';
import {ChatService} from '../../../../mock/chat.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../../model/user';
import {AuthenticationService} from '../../../../services/authentication-service';
import {ChatMessage} from '../../../../model/chat-message';

@Component({
  selector: 'delphi-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.scss'],
})
export class ChatConversationComponent implements OnInit {
  chat: UserChat = null;
  user: User = null;
  msg = '';
  @ViewChild(IonContent, {read: IonContent, static: false}) myContent: IonContent;

  constructor(
    private navCtrl: NavController,
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  selfChatName() {
    if (this.chat === null || this.user === null) {
      return;
    }
    return getChatName(this.chat, this.user?.id);
  }

  scrollToBottomOnInit() {
    this.myContent.scrollToBottom(300);
  }

  async ngOnInit() {
    this.user = await this.authService.getUser();
    const chatId = parseInt(this.activatedRoute.snapshot.paramMap.get('chatId'), 10);
    if (chatId === 0 || isNaN(chatId)) {
      await this.router.navigateByUrl('/home/menu/chat');
      return;
    }
    this.chatService.getChatById(chatId).then((userChat: UserChat) => {
      this.chat = userChat;
      this.chatService.postReadChat(chatId).then(() => {
        this.chatService.getCurrentUserChats(); // reload chats
        this.scrollToBottomOnInit();
      });
    });
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
    const chatMessage = new ChatMessage();
    chatMessage.sentBy = this.user;
    chatMessage.id = 0;
    chatMessage.message = this.msg;
    chatMessage.read = false;
    this.chat.chatMessages.push(chatMessage);
    this.scrollToBottomOnInit();
    this.msg = '';
    await this.chatService.writeToChat(this.chat.id, chatMessage);
  }

  goBack() {
    this.navCtrl.back();
  }

}
