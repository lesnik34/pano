import { createGlobalStyle, css } from 'styled-components';
import tw from 'twin.macro';
import projectFonts from './fonts';

const GlobalStyle = createGlobalStyle(
  ({ theme }) => css`
    ${projectFonts}

    html,
    body {
      padding: 0;
      margin: 0;
      font-family: ${theme.fonts.text};
    }

    body {
      ${tw`antialiased min-h-svh`}

      & > div {
        z-index: 50 !important;
      }
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
