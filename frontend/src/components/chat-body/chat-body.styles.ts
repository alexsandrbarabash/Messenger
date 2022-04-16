import styled from 'styled-components';

export const ChatBodyWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding-left: 20px;
  padding-right: 20px;
  //padding-bottom: 10px;
  overflow-y: scroll;
  height: 100%;
  margin-right: 3px;
  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 100px;
    opacity: 0.4;
  }
`;
