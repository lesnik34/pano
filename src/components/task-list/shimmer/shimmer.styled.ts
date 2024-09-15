import { Button, Skeleton } from '@nextui-org/react';
import styled from 'styled-components';
import tw from 'twin.macro';

export const ButtonWrapperStyled = styled(Button)`
  width: 100%;
  min-height: 125px;
  padding: 12px 17px;
  padding-left: 26px;
  border-radius: 20px;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  text-wrap: wrap;
  white-space: normal;
  text-align: start;
`;

export const HeaderStyled = styled.div`
  width: 100%;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleStyled = styled(Skeleton)`
  ${tw`rounded-lg`}
  min-width: 50%;
  min-height: 16px;
  margin-bottom: 2px;
`;

export const DescriptionStyled = styled(Skeleton)`
  ${tw`rounded-lg`}
  min-width: 70%;
  min-height: 16px;
  margin-bottom: 2px;
`;

export const DateStyled = styled(Skeleton)`
  ${tw`rounded-lg`}
  min-width: 20%;
  min-height: 16px;
  margin-bottom: 2px;
`;

export const FooterStyled = styled.div`
  width: 100%;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonStatusStyled = styled(Skeleton)`
  ${tw`rounded-lg`}
  min-width: 20%;
  min-height: 16px;
  margin-bottom: 2px;
`;
