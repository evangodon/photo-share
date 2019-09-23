import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import { customProperties } from './variables';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  ${normalize()}

  :root {
    ${customProperties}
  } 

  body {
    font-family: 'interUI', monospace;
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
  }


  ul {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

`;

export default GlobalStyle;
