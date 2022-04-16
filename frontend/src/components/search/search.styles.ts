import styled from 'styled-components';

export const SearchWrapper = styled.div`
  display: grid;
  background-color: #0d0d0d;
  height: 50px;
  border-radius: 20px;
  grid-template-columns: 20% 80%;
  padding-right: 30px;
  box-shadow: 0px 3px 5px 0px #426D77;


  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  input {
    border: none;
    background-color: #0d0d0d;
    color: #fff;
    font-weight: 500;
    font-size: 17px
  }

  input:focus, textarea:focus, select:focus{
    outline: none;
  }
`;
