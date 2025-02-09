import { AssignmentStatus } from '@api/types';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

export const WrapperStyled = styled.div`
  padding-top: 10px;
`;

export const HeaderWrapper = styled.div<{ $status: AssignmentStatus }>(
  ({ theme, $status }) => css`
    ${tw`bg-content4`}
    ${$status === AssignmentStatus.inProgress && tw`bg-gradient-to-r from-blue-600 to-blue-900`}
    ${$status === AssignmentStatus.toDo && tw`bg-gradient-to-r from-zinc-600 to-zinc-900`}
    ${$status === AssignmentStatus.done && tw`bg-gradient-to-r from-green-600 to-green-900`}
    ${$status === AssignmentStatus.canceled && tw`bg-gradient-to-r from-yellow-600 to-yellow-900`}

    margin-left: -20px;
    margin-right: -20px;
    padding: 25px 17px;
    border-radius: 5px;

    @media (min-width: ${theme.device.minTabletWidth}) {
      border-radius: 20px;
    }
  `,
);

export const WrapperContent = styled.div`
  display: flex;
  align-items: start;
`;

export const ExtraWrapperContent = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: start;
`;

export const ExecutorWrapper = styled.div`
  margin-right: 40px;
`;

export const DateWrapper = styled.div``;

export const CreatorWrapper = styled.div`
  margin-top: 20px;
`;

export const DescriptionWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;
