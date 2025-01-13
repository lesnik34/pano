import styled, { css } from 'styled-components';

export const WrapperStyled = styled.div<{ $isFlex?: boolean }>(
  ({ theme, $isFlex }) => css`
    padding-top: 10px;
    padding-bottom: 10px;
    display: ${$isFlex ? 'flex' : 'grid'};
    flex-direction: column;
    grid-template-columns: 1fr;
    grid-gap: 10px;

    @media (min-width: ${theme.device.minTabletWidth}) {
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: ${theme.device.minDesktopWidth}) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  `,
);

export const ItemWrapperStyled = styled.div`
  min-width: 100%;
  width: 100%;
`;
