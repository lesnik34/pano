import { css } from 'styled-components';

import FiraSansMedium from './FiraSans-Medium.ttf';

const projectFonts = css`
  @font-face {
    font-family: 'Roboto Condensed';
    src: url(${FiraSansMedium}) format('ttf');
  }
`;

export default projectFonts;
