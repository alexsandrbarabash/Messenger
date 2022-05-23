import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IWebsocketContext } from '../types';
import { WebsocketContext } from '../context';
import { showAlert } from '../stores';

export const useChatFooter = () => {
  const [text, setText] = useState<string>('');
  const params = useParams();

  const { writeMessage } = useContext<IWebsocketContext>(WebsocketContext);

  const send = useCallback(() => {
    if (!text) {
      return showAlert('Message can`t be empty');
    }

    writeMessage({ text, chatId: params.id! });
    setText('');
  }, [writeMessage, showAlert, text]);

  return { text, setText, send };
};
