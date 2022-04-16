import React from 'react';

import { Message } from '../message';
import { ChatBodyWrapper } from './chat-body.styles';

export const ChatBody = () => {
  return (
    <ChatBodyWrapper>
      <Message isYour={true}>Body 1</Message>
      <Message>Body 2 sdfsdf sdfsdf sdf sd fsdfsdsf sd fs fsd  fs fsd f sd fsd f sd fsd f </Message>
      <Message isYour={true}>Body 2 sdfsdf sdfsdf sdf sd fsdfsdsf sd fs fsd  fs fsd f sd fsd f sd fsd f </Message>
      <Message>Body 3</Message>
      <Message>Body 4</Message>
      <Message>Body 5</Message>
      <Message>Body 6</Message>
      <Message>Body 7</Message>
      <Message>Body 8</Message>
      <Message>Body 10</Message>
      <Message>Body 11</Message>
      <Message>Body 12</Message>
      <Message>Body 13</Message>
    </ChatBodyWrapper>
  );
};
