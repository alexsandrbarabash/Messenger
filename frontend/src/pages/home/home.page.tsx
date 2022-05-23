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
  const {
    open,
    handleOpen,
    handleClose,
    usernames,
    setUsernames,
    username,
    setUsername,
    title,
    setTitle,
    submit
  } = useCreateChat();

  return (
    <>
      <CreateChatModel
        open={open}
        handleClose={handleClose}
        usernames={usernames}
        setUsernames={setUsernames}
        username={username}
        setUsername={setUsername}
        title={title}
        setTitle={setTitle}
        submit={submit}
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
