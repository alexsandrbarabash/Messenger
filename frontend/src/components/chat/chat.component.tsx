import React from 'react';
import { useParams } from 'react-router-dom';

import { ChatWrapper } from './chat.styles';
import { ChatHeader } from '../chat-header';
import { ChatBody } from '../chat-body';
import { ChatFooter } from '../chat-footer';
import { useChatData } from '../../hooks/use-chat-data';
import { Loader } from '../loader';

export const ChatComponent = () => {
  const params = useParams();
  const { messages, title, loading } = useChatData(params.id);

  if (loading) {
    return (
      <ChatWrapper>
        <Loader />
      </ChatWrapper>
    );
  }

  return (
    <ChatWrapper>
      {params.id ? (
        <>
          <ChatHeader title={title} />
          <ChatBody messages={messages} />
          <ChatFooter />
        </>
      ) : (
        <div className='not-select-chat'>Select chat</div>
      )}
    </ChatWrapper>
  );
};
