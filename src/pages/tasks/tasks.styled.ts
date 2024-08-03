import styled, { css } from 'styled-components';

export const TitleStyled = styled.h1(
  ({ theme }) => css`
    font-size: 1.5em;
    text-align: center;
    color: ${theme.colors.text};
  `,
);
