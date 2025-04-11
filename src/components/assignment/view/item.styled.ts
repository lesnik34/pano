import { AssignmentStatus } from '@api/types';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

export const WrapperStyled = styled.div`
  padding-top: 10px;
`;

export const HeaderWrapperStyled = styled.div<{ $status: AssignmentStatus }>(
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

export const WrapperContentStyled = styled.div`
  display: grid;
  align-items: start;
  grid-template-columns: auto 1fr;
  gap: 40px;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0px;
  }
`;

export const CreatorWrapperStyled = styled.div`
  margin-top: 20px;
`;

export const DescriptionWrapperStyled = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;
