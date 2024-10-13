import 'styled-components';

import themeConfig from '../../../theme.config';

const theme = {
  ...themeConfig.themes,
  device: {
    minMobileWidth: '0px',
    minTabletWidth: '768px',
    minDesktopWidth: '1280px',
  },
  fonts: {
    text: 'Fira Sans, sans-serif',
  },
};

type CustomTheme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}

export default theme;
