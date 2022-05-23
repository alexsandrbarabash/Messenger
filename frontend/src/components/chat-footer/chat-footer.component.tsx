import React from 'react';
import SendIcon from '@mui/icons-material/Send';

import { ChatFooterWrapper } from './chat-footer.styles';
import { useChatFooter } from '../../hooks';

export const ChatFooter = () => {
  const { send, text, setText } = useChatFooter();
  return (
    <ChatFooterWrapper>
      <div className='send-message-input-wrapper'>
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='send-message-icon-wrapper'>
        <SendIcon sx={{ cursor: 'pointer' }} onClick={send} />
      </div>
    </ChatFooterWrapper>
  );
};
