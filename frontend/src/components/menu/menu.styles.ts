import styled from 'styled-components';

export const MenuWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
  height: 100%;
  background-color: #246DFF;
  box-shadow: 0px 2px 8px -2px #000000;
  border-radius: 25px;
  align-items: center;
  
  div {
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
  }
  
`;
