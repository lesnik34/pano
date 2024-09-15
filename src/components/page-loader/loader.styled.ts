import styled, { css } from 'styled-components';

export const LoaderWrapperStyled = styled.div<{ $mode: 'fullHeight' | 'lg' }>(
  ({ $mode }) => css`
    ${$mode === 'fullHeight' && 'min-height: 100lvh;'}
    ${$mode === 'lg' && 'margin-top: 20vh;'}
    display: flex;
    align-items: center;
    justify-content: center;
  `,
);
