import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';

export const Wrapper = styled.button`
  position: relative;
  height: 25px;
  width: 25px;
  border-radius: 5px;
  background-color: rgba(0,0,0,.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  
  &::after {
    content: '';
    position: absolute;
    display: block;
    height: inherit;
    width: inherit;
    border-radius: inherit;
    top: 0;
    left: 0;
    background-color: #000;
    opacity: 0;
  }

  &:hover {
    cursor: pointer;
    &::after {
      opacity: .3;
    }
  }

  &:focus-within ul {
    transform: translate(0) scale(1);
    opacity: 1;
  }
`;

export const Dots = styled(BsThreeDots)`
  color: white;
`;

export const ShowMenu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 25px;
  list-style: none;
  position: absolute;
  top: 0;
  padding: 12px;
  border-radius: 5px;
  right: 12px;

  background-color: #242424B2;
  color: white;
  font-size: 24px;

  transform: translate(50%, -50%) scale(0);
  opacity: 0;
  transition: transform .5s, opacity .5s;
`;

export const Icon = styled.span`
  height: 24px;
  width: 24px;
  & svg {
    font-size: 24px;
    height: inherit;
    width: inherit;
  }
`;

export const Points = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
`;