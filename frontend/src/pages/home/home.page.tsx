import React from 'react';

import { withLoging } from '../../hocs';
import { HomeWrapper } from './home.styles';
import { MenuComponent, ChatsListComponent, ChatComponent } from '../../components';

const HomePage = () => {
  return (
    <HomeWrapper>
      <MenuComponent />
      <ChatsListComponent />
      <ChatComponent />
    </HomeWrapper>
  );
};

export default withLoging(HomePage);
