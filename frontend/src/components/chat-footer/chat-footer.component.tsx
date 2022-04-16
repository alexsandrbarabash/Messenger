import React from 'react';
import SendIcon from '@mui/icons-material/Send';

import { ChatFooterWrapper } from './chat-footer.styles';

export const ChatFooter = () => {
  return (
    <ChatFooterWrapper>
      <div className='send-message-input-wrapper'>
        <input type='text' />
      </div>
      <div className='send-message-icon-wrapper'>
        <SendIcon sx={{ cursor: 'pointer' }} />
      </div>
    </ChatFooterWrapper>
  );
};
