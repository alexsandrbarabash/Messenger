import React from 'react';

import { ChatWrapper } from './chat.styles';
import { ChatHeader } from '../chat-header';
import { ChatBody } from '../chat-body';
import { ChatFooter } from '../chat-footer';

export const ChatComponent = () => {
  return (
    <ChatWrapper>
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </ChatWrapper>
  );
};
