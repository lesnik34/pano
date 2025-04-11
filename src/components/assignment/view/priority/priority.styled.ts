import styled, { css } from 'styled-components';
import tw from 'twin.macro';

export const WrapperStyled = styled.div``;

export const LabelStyled = styled.span`
  ${tw`text-sm font-medium text-default-400`}
  display: block;
`;

export const ContentWrapperStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const ContentStyled = styled.span`
  ${tw`text-base font-semibold text-white`}
  display: block;
  margin-left: 10px;
`;

export const StatusStyled = styled.div<{ $color: string }>(
  ({ $color }) => css`
    ${$color === 'primary' && tw`bg-primary`}
    ${$color === 'warning' && tw`bg-warning`}
    ${$color === 'danger' && tw`bg-danger`}
    width: 12px;
    height: 12px;
    border-radius: 50%;
  `,
);
