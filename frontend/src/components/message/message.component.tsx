import React from 'react';

import { MessageWrapper } from './message.styles';

interface IProps {
  isYour?: boolean;
}

export const Message: React.FC<IProps> = ({
  children,
  isYour = false
}) => {
  return (
    <MessageWrapper isYour={isYour}>
      {children}
    </MessageWrapper>
  );
};
