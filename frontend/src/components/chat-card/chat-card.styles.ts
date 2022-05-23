import styled from 'styled-components';

export const ChatsCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  border-top: 1px solid;
  padding-top: 15px;
  padding-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:first-child {
    border-top: none;
  }
  .content {
    display: flex;
    align-items: center;
    grid-template-rows: 20% 70%;
  }
  
  &:hover {
    opacity: 0.6;
  }
`;
