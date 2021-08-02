import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`  
  *, *::after, *::before {
    box-sizing: border-box;
  }

  html, body {
    overflow: hidden;
  }
  
  body {
    font-family: Roboto, sans-serif;
    margin: 0;
    min-height: 100vh;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  button {
    &:hover { cursor: pointer }
  }
`;

export default GlobalStyle;
