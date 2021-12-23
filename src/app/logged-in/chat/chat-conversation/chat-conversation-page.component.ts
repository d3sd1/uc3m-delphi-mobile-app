import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonContent} from '@ionic/angular';
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
export class ChatConversationPage implements OnInit, OnDestroy {
  chat: UserChat;
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
  async ngOnInit() {
    this.routeParamsSubscription = this.route.params.subscribe(params => {
      this.invitationSubscription = this.invitationConsumer.getUsers().subscribe((users) => {
        this.oppositeUser = users.find(p => p.id === +params.oppositeUserId);
      });
    });
    this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
      this.user = user;
      this.scrollToBottom();
    });
    this.chatSubscription = this.chatConsumer.getChats().subscribe((userChats) => {
      this.chat = userChats.find((userChat) => {
        if (this.oppositeUser && (userChat.user1.id === this.user.id && userChat.user2.id === this.oppositeUser.id)
          || this.oppositeUser && (userChat.user2.id === this.user.id && userChat.user1.id === this.oppositeUser.id)) {
          this.loading = false;
          return true;
        }
      });
      this.sortMessages();
      this.scrollToBottom();
    });
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


  ngOnDestroy(): void {
    this.chat = undefined;
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
