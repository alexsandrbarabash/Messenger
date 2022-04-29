import React from 'react';

import { ChatsWrapper } from './chats.styles';
import { ChatCard } from '../chat-card';
import { Loader } from '../loader';
import { useChatList } from '../../hooks';

export const Chats = () => {
  const { chats, loading } = useChatList();

  return (
    <ChatsWrapper>
      <span className='title'>Chats</span>
      {loading ? (
        <Loader />
      ) : (
        <div className='chats-list'>
          {chats.map((item) => {
            return <ChatCard id={item.id} key={item.id} title={item.title} />;
          })}
        </div>
      )}
    </ChatsWrapper>
  );
};
