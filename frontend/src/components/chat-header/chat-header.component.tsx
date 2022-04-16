import React from 'react';

import { ChatHeaderWrapper } from './chat-header.styles';
import { Image } from '../../common/styles';

export const ChatHeader = () => {
  return (
    <ChatHeaderWrapper>
      <Image
        src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
        alt='Your browser not support this picture'
      />
      <span className='title'>Name</span>
    </ChatHeaderWrapper>
  );
};
