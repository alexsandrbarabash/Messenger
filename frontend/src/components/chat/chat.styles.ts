import styled from 'styled-components';

export const ChatWrapper = styled.div`
  background-color: #0d0d0d;
  border-radius: 20px;
  box-shadow: 0px 3px 5px 0px #426d77;
  display: grid;
  grid-template-rows: 15% 73% 8%;
  max-height: 580px;
  position: relative;
  
  .not-select-chat {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
  }
`;
