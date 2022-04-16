import styled from 'styled-components';

export const ChatsWrapper = styled.div`
  background-color: #0d0d0d;
  border-radius: 20px;
  box-shadow: 0px 3px 5px 0px #426d77;
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 4px;
  max-height: 450px;
  display: grid;
  grid-template-rows: 5% 90%;
  
  .title {
    font-size: 28px;
    font-weight: 600;
  }

  .chats-list {
    margin-top: 20px;
    overflow-y: scroll;
    height: 100%;
    padding-right: 20px;
  }

  .chats-list::-webkit-scrollbar {
    width: 2px;
  }

  .chats-list::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 100px;
    opacity: 0.4;
  }
`;
