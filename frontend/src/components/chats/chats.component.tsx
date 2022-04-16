import React from 'react';

import { ChatsWrapper } from './chats.styles';
import { ChatCard } from '../chat-card';

export const Chats = () => {
  return (
    <ChatsWrapper>
      <span className="title">Chats</span>
      <div className='chats-list'>
        <ChatCard/>
        <ChatCard/>
        <ChatCard/>
        <ChatCard/>
        <ChatCard/>
        <ChatCard/>
        <ChatCard/>
        <ChatCard/>
        <ChatCard/>
      </div>
    </ChatsWrapper>
  );
};
