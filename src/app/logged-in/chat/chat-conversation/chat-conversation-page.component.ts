import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonContent, ViewDidLeave} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {UserChat} from '../../../core/model/user-chat';
import {User} from '../../../core/model/user';
import {ChatConsumer} from '../chat.consumer';
import {UserConsumer} from '../../user.consumer';
import {InvitationConsumer} from '../../processes/single/user-picker/invitation.consumer';
import {Subscription} from 'rxjs';
import {ChatMessage} from '../../../core/model/chat-message';

@Component({
  selector: 'delphi-chat-conversation',
  templateUrl: './chat-conversation-page.component.html',
  styleUrls: ['./chat-conversation-page.component.scss'],
})
export class ChatConversationPage implements OnInit, OnDestroy, ViewDidLeave {
  chat: UserChat;
  chats: UserChat[];
  user: User;
  oppositeUser: User;
  loading = false;

  editorMsg = '';
  showEmojiPicker = false;
  @ViewChild(IonContent, {read: IonContent, static: false}) chatDisplay: IonContent;
  private chatSubscription: Subscription;
  private userSubscription: Subscription;
  private invitationSubscription: Subscription;
  private routeParamsSubscription: Subscription;

  constructor(
    private chatConsumer: ChatConsumer,
    private userConsumer: UserConsumer,
    private invitationConsumer: InvitationConsumer,
    private route: ActivatedRoute,
  ) {
  }

  /**
   * Promise is used to execute this block on background
   */
  ngOnInit() {
    this.routeParamsSubscription = this.route.params.subscribe(params => {
      if (params === null) {
        return;
      }
      this.invitationSubscription = this.invitationConsumer.getUsers().subscribe((users) => {
        if (users === null) {
          return;
        }
        this.oppositeUser = users.find(p => p.id === +params.oppositeUserId);
        this.printMessages();
      });
    });
    this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
      if (user === null) {
        return;
      }
      this.user = user;
      this.printMessages();
    });
    this.chatSubscription = this.chatConsumer.getChats().subscribe((userChats) => {
      if (userChats === null) {
        return;
      }
      this.chats = userChats;
      this.printMessages();
    });
  }

  private printMessages() {
    if (!this.oppositeUser || !this.user || !this.chats) {
      return;
    }
    this.chat = this.chats.find((userChat) => {
      if (this.oppositeUser && (userChat.user1.id === this.user.id && userChat.user2.id === this.oppositeUser.id)
        || this.oppositeUser && (userChat.user2.id === this.user.id && userChat.user1.id === this.oppositeUser.id)) {
        this.loading = false;
        return true;
      }
    });
    this.sortMessages();
    this.scrollToBottom();
  }

  sortMessages() {
    this.chat.messages.sort((chatMessage1: ChatMessage, chatMessage2: ChatMessage) => {
      let pos = 0;
      if (chatMessage1.timestamp < chatMessage2.timestamp) {
        pos = -1;
      } else if (chatMessage1.timestamp > chatMessage2.timestamp) {
        pos = 1;
      }
      return pos;
    });
    this.scrollToBottom();
  }

  ionViewDidLeave(): void {
    this.ngOnDestroy();
  }

  ngOnDestroy(): void {
    this.chat = undefined;
    this.chats = undefined;
    this.user = undefined;
    this.oppositeUser = undefined;
    this.loading = false;
    this.editorMsg = '';
    this.showEmojiPicker = false;
    if (!this.chatSubscription.closed) {
      this.chatSubscription.unsubscribe();
    }
    if (!this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    if (!this.invitationSubscription.closed) {
      this.invitationSubscription.unsubscribe();
    }
    if (!this.routeParamsSubscription.closed) {
      this.routeParamsSubscription.unsubscribe();
    }
  }

  scrollToBottom() {
    this.chatDisplay.scrollToBottom(300).then(r => null);
  }


  checkEnterKey(keyCode) {
    if (keyCode === 13) {
      this.sendMessage();
    }
  }


  sendMessage() {
    if (this.editorMsg === '') {
      return;
    }
    this.chatConsumer.writeToChat(this.oppositeUser.id, this.editorMsg);
    this.editorMsg = '';
    this.scrollToBottom();
  }

  onFocus() {
    this.showEmojiPicker = false;
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    this.scrollToBottom();
  }

}
