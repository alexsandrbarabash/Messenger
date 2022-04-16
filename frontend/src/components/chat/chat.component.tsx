import React from 'react';
import { useParams } from 'react-router-dom';

import { ChatWrapper } from './chat.styles';
import { ChatHeader } from '../chat-header';
import { ChatBody } from '../chat-body';
import { ChatFooter } from '../chat-footer';

export const ChatComponent = () => {
  const params = useParams();

  return (
    <ChatWrapper>
      {params.id ? (
        <>
          <ChatHeader />
          <ChatBody />
          <ChatFooter />
        </>
      ) : (
        <div className='not-select-chat'>Select chat</div>
      )}
    </ChatWrapper>
  );
};
