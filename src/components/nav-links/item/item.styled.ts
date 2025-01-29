import tw from 'twin.macro';
import { Button } from "@heroui/react";
import styled, { css } from 'styled-components';

export const ButtonWrapperStyled = styled.div<{ $isActive: boolean }>(() => css``);

export const ButtonStyled = styled(Button)`
  width: 153px;
  height: 62px;
  padding-left: 13px;
  padding-right: 13px;
  border-radius: 20px;
  justify-content: flex-start;
`;

export const IconWrapperStyled = styled.div<{ $isActive: boolean }>(
  ({ $isActive }) => css`
    ${tw`bg-default-50`}
    min-width: 42px;
    min-height: 42px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 3px;

    & svg {
      ${$isActive ? tw`fill-primary-500` : tw`fill-default-500`}
    }
  `,
);

export const TextStyled = styled.span<{ $isActive: boolean }>(
  ({ $isActive }) => css`
    ${$isActive ? tw`text-default-900` : tw`text-default-500`}
    ${tw`text-sm leading-4`}
    white-space: normal;
    text-align: start;
  `,
);
