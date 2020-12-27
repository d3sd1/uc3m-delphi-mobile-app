import {ChatMessage} from './chat-conversation/chat-message';
import {User} from '../user';


export class UserChat {
  chatMessages: ChatMessage[];
  group: boolean;
  groupName: string;
  groupPicture: string;
  id: number;
  users: User[];
}

export function getChatUnreadMessages(userChat: UserChat, currentUserId: number): number {
  let unreadMessages = 0;
  userChat.chatMessages.forEach((chatMessage: ChatMessage) => {
    if (chatMessage.sentBy.id !== currentUserId && !chatMessage.read) {
      unreadMessages++;
    }
  });
  return unreadMessages;
}


export function getChatsUnreadMessages(userChats: UserChat[], currentUserId: number): number {
  let unreadMessages = 0;
  userChats.forEach((userChat: UserChat) => {
    unreadMessages += getChatUnreadMessages(userChat, currentUserId);
  });
  return unreadMessages;
}

export function getChatName(chat: UserChat, currentUserId: number) {
  if (chat.group) {
    return chat.groupName;
  }
  let fullName = null;
  chat.users.forEach((chatUser: User) => {
    if (chatUser.id !== currentUserId) {
      fullName = chatUser.name + ' ' + chatUser.surnames;
    }
  });
  return fullName;
}

export function getChatPicture(chat: UserChat, currentUserId: number): string {
  if (chat.group) {
    return chat.groupPicture;
  }
  let photo = null;
  chat.users.forEach((chatUser: User) => {
    if (chatUser.id !== currentUserId) {
      photo = chatUser.photo;
    }
  });
  return photo;
}

export function getUserChatStatus(chat: UserChat, currentUserId: number): string {
  if (chat.group) {
    return 'ONLINE';
  }
  let status = null;
  chat.users.forEach((chatUser: User) => {
    if (chatUser.id !== currentUserId) {
      status = chatUser.chatStatus;
    }
  });
  return status;
}
