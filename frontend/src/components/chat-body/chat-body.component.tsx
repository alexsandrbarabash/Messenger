import React, { FC } from 'react';
import { useStore } from 'effector-react';

import { userStore } from '../../stores';
import { Message } from '../message';
import { ChatBodyWrapper } from './chat-body.styles';
import { IMessages } from '../../types';

interface IProps {
  messages: IMessages[];
}

export const ChatBody: FC<IProps> = ({ messages }) => {
  const { id } = useStore(userStore);
  return (
    <ChatBodyWrapper>
      {messages.map((item) => {
        return <Message isYour={id === item.userId}>{item.text}</Message>;
      })}
    </ChatBodyWrapper>
  );
};
