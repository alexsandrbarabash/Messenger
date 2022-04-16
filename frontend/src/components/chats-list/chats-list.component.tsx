import React from 'react';

import { ChatsListWrapper } from './chats-list.styles';
import { Search } from '../search';
import { Chats } from '../chats';

export const ChatsListComponent = () => {
  return (
    <ChatsListWrapper>
      <Search />
      <Chats />
    </ChatsListWrapper>
  );
};
