import styled, { css } from 'styled-components';

export const ContainerStyled = styled.div(
  ({ theme }) => css`
    margin: 0 auto;
    padding: 0 20px;

    @media (min-width: ${theme.device.minTabletWidth}) {
      padding: 0 40px;
    }

    @media (min-width: ${theme.device.minDesktopWidth}) {
      width: 1140px;
      padding: 0;
    }
  `,
);
