import styled from 'styled-components';
import tw from 'twin.macro';

export const WrapperStyled = styled.div`
  min-width: 110px;
`;

export const LabelStyled = styled.span`
  ${tw`text-sm font-medium text-zinc-300`}
  display: block;
`;

export const ContentStyled = styled.span`
  ${tw`text-base font-semibold`}
  ${tw`text-white`}
    display: block;
`;
