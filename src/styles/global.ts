import { createGlobalStyle, css } from 'styled-components';
import projectFonts from './fonts';

const GlobalStyle = createGlobalStyle(
  ({ theme }) => css`
    ${projectFonts}

    html {
      overflow-y: scroll;
    }

    html,
    body {
      padding: 0;
      margin: 0;
      font-family: ${theme.fonts.text};
      background-color: ${theme.colors.background};
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    * {
      box-sizing: border-box;
    }
  `,
);

export default GlobalStyle;
