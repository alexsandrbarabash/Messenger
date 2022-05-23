import { createEvent, createStore } from 'effector';

import { IMessages, IMessagesStore } from '../types';

export const addMessages = createEvent<IMessages>();
export const clearMessages = createEvent();
export const loadMessages = createEvent<IMessages[]>();

export const messagesStore = createStore<IMessagesStore>({
  messages: []
})
  .on(addMessages, (state: IMessagesStore, message: IMessages) => ({
    ...state,
    messages: [message, ...state.messages]
  }))
  .on(clearMessages, (state: IMessagesStore) => ({
    ...state,
    messages: []
  }))
  .on(loadMessages, (state: IMessagesStore, messages: IMessages[]) => ({
    ...state,
    messages
  }));
