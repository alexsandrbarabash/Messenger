import React from 'react';

import { withLogin } from '../../hocs';
import { HomeWrapper } from './home.styles';
import {
  MenuComponent,
  ChatsListComponent,
  ChatComponent,
  // CreateChatModel
} from '../../components';

const HomePage = () => {
  return (
    <>
      {/*<CreateChatModel />*/}
      <HomeWrapper>
        <MenuComponent />
        <ChatsListComponent />
        <ChatComponent />
      </HomeWrapper>
    </>
  );
};

export default withLogin(HomePage);
