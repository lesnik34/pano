import styled, { css } from 'styled-components';
import tw from 'twin.macro';

export const WrapperStyled = styled.div``;

export const LabelStyled = styled.span`
  ${tw`text-sm font-medium text-zinc-300`}
  display: block;
`;

export const ContentStyled = styled.span<{ $deadline: boolean }>(
  ({ $deadline }) => css`
    ${tw`text-base font-semibold`}
    ${$deadline ? tw`text-red-400` : tw`text-white`}
    display: block;
  `,
);
