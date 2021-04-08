import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0%;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    color: var(--color-black-primary);
    -webkit-font-smoothing: antialiased;
  }

  :root {
    --color-black-primary: #212727;
    --color-blue-primary: #00AAD4;
    --color-blue-secundary: #CCFFF9;
    --color-green-primary: #0ADE34;
    --color-white-primary: #FFFFFF;
  }

  body, input, button {
    font-family: 'Mukta', sans-serif;
    font-size: 16;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;
