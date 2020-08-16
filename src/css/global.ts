import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import { customProperties } from './theme';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  ${normalize()}

  :root {
    ${customProperties}
  } 

  
  @font-face {
      font-family: 'Proxima Soft';
      src: url('/fonts/proxima-soft-medium.woff2') format('woff2'),
      url('/fonts/proxima-soft-medium.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  }

  body {
    font-family: 'Proxima Soft', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial,
      'Lucida Grande', sans-serif;
    font-weight: 400;
    font-size: var(--fs-base);
    letter-spacing: 0.3px;
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: color, background-color .3s ease;
  }


  p {
    line-height: 1.6;
  }

  h1, h2, h3, h4 , h5, h6 {
    line-height: 1;
    margin: 0;
  }


  ul {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  button {
    background-color: transparent;
    border: 0;
    outline: 0;
  }

`;

export default GlobalStyle;
