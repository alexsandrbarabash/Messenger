import { createEvent, createStore } from 'effector';

import { IChatsStore, IChatCard } from '../types';

export const addChat = createEvent<IChatCard>();
export const loadChats = createEvent<IChatCard[]>();

export const chatListStore = createStore<IChatsStore>({
  chats: []
})
  .on(addChat, (state: IChatsStore, chat: IChatCard) => ({
    ...state,
    chats: [chat, ...state.chats]
  }))
  .on(loadChats, (state: IChatsStore, chats: IChatCard[]) => ({
    ...state,
    chats
  }));
