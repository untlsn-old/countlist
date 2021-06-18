import styled from 'styled-components';

export const Input = styled.input`
  border: black solid 1px;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fontSize.huge};
  padding: 5px;
  width: 230px;
  height: 40px;
`;

export const Button = styled.input.attrs({ type: 'submit' })`
  background-color: #35495E;
  color: #fff;
  font-size: ${({ theme }) => theme.fontSize.huge};
  padding: 5px;
  text-align: center;
  border: none;
  height: 40px;
  width: 250px;
  border-radius: 5px;
`;