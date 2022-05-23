import React from 'react';

import { WebsocketContext } from '../../context';
import { useWebsocket } from '../../hooks';
import { Loader } from '../../components';

export const WebsocketContainer: React.FC = ({ children }) => {
  const { createChat, writeMessage, loading } = useWebsocket();

  if (loading) {
    return <Loader />;
  }

  return (
    <WebsocketContext.Provider value={{ createChat, writeMessage }}>
      {children}
    </WebsocketContext.Provider>
  );
};
