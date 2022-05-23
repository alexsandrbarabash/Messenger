import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@csstools/normalize.css';

import { GlobalStyle } from './common/styles';
import { AppRouter, ErrorBoundary, WebsocketContainer } from './containers';
import { AlertComponent, Loader } from './components';
import { useRefreshToken } from './hooks';

const App = () => {
  const { loading: refreshTokenLoading } = useRefreshToken();

  if (refreshTokenLoading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <GlobalStyle />
      <ErrorBoundary>
        <WebsocketContainer>
          <AlertComponent />
          <AppRouter />
        </WebsocketContainer>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export { App };
