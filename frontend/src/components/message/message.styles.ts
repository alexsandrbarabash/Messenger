import styled from 'styled-components';

interface IProps {
  isYour: boolean;
}

export const MessageWrapper = styled.div<IProps>`
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 20px;
  padding-left: 20px;
  background-color: ${({ isYour }) => (isYour ? '#1A66FF' : '#303030')};
  max-width: 250px;
  border-radius: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  ${({ isYour }) => (isYour ? 'margin-left: auto;' : 'margin-right: auto;')}
`;
