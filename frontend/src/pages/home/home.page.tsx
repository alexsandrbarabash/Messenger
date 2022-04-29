import React from 'react';

import { withLogin } from '../../hocs';
import { HomeWrapper } from './home.styles';
import {
  MenuComponent,
  ChatsListComponent,
  ChatComponent,
  CreateChatModel
} from '../../components';
import { useCreateChat } from '../../hooks';

const HomePage = () => {
  const { open, handleOpen, handleClose } = useCreateChat();

  return (
    <>
      <CreateChatModel
        open={open}
        handleClose={handleClose}
      />
      <HomeWrapper>
        <MenuComponent openChatModeHandler={handleOpen} />
        <ChatsListComponent />
        <ChatComponent />
      </HomeWrapper>
    </>
  );
};

export default withLogin(HomePage);
