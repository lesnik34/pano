import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    device: {
      minMobileWidth: string;
      minTabletWidth: string;
      minDesktopWidth: string;
    };
    fonts: {
      text: string;
    };
  }
}

const theme = {
  device: {
    minMobileWidth: '0px',
    minTabletWidth: '768px',
    minDesktopWidth: '1280px',
  },
  fonts: {
    text: 'Fira Sans, sans-serif',
  },
};

export default theme;
