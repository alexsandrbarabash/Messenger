import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ChatsCardWrapper } from './chat-card.styles';
import { Image } from '../../common/styles';
import { PagesEnum } from '../../enums';

interface IProps {
  id: string;
  title: string;
}

export const ChatCard: FC<IProps> = ({ id, title }) => {
  const navigate = useNavigate();

  return (
    <ChatsCardWrapper onClick={() => navigate(`${PagesEnum.HOME}${id}`)}>
      <Image
        src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
        alt='Your browser not support this picture'
      />
      <div className='content'>
        <span className='name'>{title}</span>
      </div>
    </ChatsCardWrapper>
  );
};
