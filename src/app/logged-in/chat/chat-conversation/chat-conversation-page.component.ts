import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonContent} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {UserChat} from '../../../core/model/user-chat';
import {User} from '../../../core/model/user';
import {ChatConsumer} from '../../../core/consumer/chat/chat.consumer';
import {UserConsumer} from '../../../core/consumer/user/user.consumer';
import {InvitationConsumer} from '../../../core/consumer/process/invitation.consumer';
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

  private chatSubscription: Subscription;
  private userSubscription: Subscription;
  private invitationSubscription: Subscription;

  @ViewChild(IonContent, {read: IonContent, static: false}) chatDisplay: IonContent;

  constructor(
    private chatConsumer: ChatConsumer,
    private userConsumer: UserConsumer,
    private invitationConsumer: InvitationConsumer,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.invitationSubscription = this.invitationConsumer.getUsers().subscribe((users) => {
        this.oppositeUser = users.find(p => p.id === +params.oppositeUserId);
      });
    });
    this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
      this.user = user;
    });
    this.chatSubscription = this.chatConsumer.getChats().subscribe((userChats) => {
      this.chat = userChats.find((userChat) => {
        if ((userChat.user1.id === this.user.id && userChat.user2.id === this.oppositeUser?.id)
          || (userChat.user2.id === this.user.id && userChat.user1.id === this.oppositeUser?.id)) {
          this.loading = false;
          return true;
        }
      });
      this.sortMessages();
      this.scrollToBottom();
    });
  }

  sortMessages() {
    this.chat?.messages.sort((chatMessage1: ChatMessage, chatMessage2: ChatMessage) => {
      let pos = 0;
      if (chatMessage1.timestamp < chatMessage2.timestamp) {
        pos = -1;
      } else if (chatMessage1.timestamp > chatMessage2.timestamp) {
        pos = 1;
      }
      return pos;
    });
  }


  ngOnDestroy(): void {
    this.chat = null;
    this.user = null;
    this.oppositeUser = null;
    this.loading = false;
    this.editorMsg = '';
    this.showEmojiPicker = false;
    this.invitationSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.chatSubscription.unsubscribe();
  }

  scrollToBottom() {
    this.chatDisplay?.scrollToBottom(300);
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


  sendMessage() {
    if (this.editorMsg === '') {
      return;
    }
    this.chatConsumer.writeToChat(this.oppositeUser.id, this.editorMsg);
    this.editorMsg = '';
    this.scrollToBottom();
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
