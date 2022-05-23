import styled from 'styled-components';

export const ChatFooterWrapper = styled.div`
  border-top: 1px solid;
  margin-left: 20px;
  margin-right: 20px;
  display: grid;
  grid-template-columns: 92% 8%;
  column-gap: 10px;
  
  .send-message-input-wrapper {
    display: flex;
    align-items: center;
  }

  .send-message-icon-wrapper {
    display: flex;
    align-items: center;
  }
  
  input {
    width: 100%;
    background-color: #212121;
    border: none;
    height: 25px;
    border-radius: 5px;
    color: #fff;
    padding-left: 5px;
    padding-right: 5px;
  }

  input:focus, textarea:focus, select:focus{
    outline: none;
  }
`;
