import styled, { css } from 'styled-components';
import tw from 'twin.macro';

export const WrapperStyled = styled.div<{ $isFullScreen?: boolean }>(
  ({ $isFullScreen }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: ${$isFullScreen ? '100lvh' : '100%'};
  `,
);

export const ContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 350px;
`;

export const TitleStyled = styled.h1`
  ${tw`text-xl`}
`;

export const DescriptionStyled = styled.p`
  ${tw`text-sm text-default-600`}
  margin-top: 5px;
  margin-bottom: 30px;
  text-align: center;
`;
