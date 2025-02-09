import { TaskI } from '@api/types';
import { getStatusProperties } from '@styles/utils/common';
import { Button } from '@heroui/react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

export const ButtonWrapperStyled = styled(Button)`
  min-height: 146px;
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

export const StatusLineStyled = styled.div<{ $taskStatus: TaskI['status'] }>(
  ({ $taskStatus }) => css`
    ${getStatusProperties($taskStatus).style}
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 10px;
  `,
);

export const HeaderStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleStyled = styled.span`
  ${tw`text-base font-medium`}
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const DescriptionStyled = styled.p`
  ${tw`text-default-600`}
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;
`;

export const DateStyled = styled.span<{ $deadline?: boolean }>(
  ({ $deadline }) => css`
    ${$deadline ? tw`text-red-400` : tw`text-default-900`}
    ${tw`text-xs font-bold`}
  `,
);

export const FooterStyled = styled.div`
  width: 100%;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StatusStyled = styled.div<{ $taskStatus: TaskI['status'] }>(
  ({ $taskStatus }) => css`
    ${getStatusProperties($taskStatus).style}
    ${tw`text-xs text-white font-medium`}
    min-width: 105px;
    padding: 7px 14px;
    border-radius: 10px;
    text-align: center;
  `,
);
