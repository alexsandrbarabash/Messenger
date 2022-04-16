import React from 'react';

import { ChatsCardWrapper } from './chat-card.styles';
import { Image } from '../../common/styles';

export const ChatCard = () => {
  return (
    <ChatsCardWrapper>
      <Image
        src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
        alt='Your browser not support this picture'
      />
      <div className='content'>
        <span className='name'>IK-91</span>
      </div>
    </ChatsCardWrapper>
  );
};
