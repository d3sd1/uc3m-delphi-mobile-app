import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IonContent, NavController, NavParams} from '@ionic/angular';


import {ChatService} from '../chat.service';
import {ActivatedRoute, Router} from '@angular/router';
import {getChatInfo, UserChat} from '../user-chat';
import {User} from '../../user';
import {UserStorage} from '../../../core/storage/user.storage';
import {ChatMessage} from './chat-message';

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
    private authService: UserStorage,
    navParams: NavParams
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
        this.scrollToBottom();
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
    chatMessage.message = this.editorMsg;
    chatMessage.read = false;
    chatMessage.sentDate = new Date();
    this.chat.chatMessages.push(chatMessage);
    this.editorMsg = '';
    await this.chatService.writeToChat(this.chat.id, chatMessage);
    await this.scrollToBottom();
  }

  goBack() {
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

  /**
   * @name getMsg
   * @returns {Promise<ChatMessage[]>}
   */
  getMsg() {
    /*// Get mock message list
    return this.chatService
      .getMsgList()
      .subscribe(res => {

        this.msgList = res;
        this.scrollToBottom();
      });*/
  }

  /**
   * TODO REMVE ASA!
   * @name sendMsg
   */
  sendMsg() {/*TODO
    if (!this.editorMsg.trim()) return;

    // Mock message
    const id = Date.now().toString();
    let newMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: this.user.id,
      userName: this.user.name,
      userAvatar: this.user.avatar,
      toUserId: this.toUser.id,
      time: Date.now(),
      message: this.editorMsg,
      status: 'pending'
    };

    this.pushNewMsg(newMsg);
    this.editorMsg = '';

    if (!this.showEmojiPicker) {
      this.focus();
    }

    this.chatService.sendMsg(newMsg)
      .then(() => {
        let index = this.getMsgIndexById(id);
        if (index !== -1) {
          this.msgList[index].status = 'success';
        }
      })*/
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
