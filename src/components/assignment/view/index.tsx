import React, { useMemo } from 'react';
import { Divider } from '@heroui/react';
import { AssignmentStatus, DepartmentI, UserI } from '@api/types';
import SkeletonTask from '@components/skeleton/task';

import {
  CreatorWrapper,
  DateWrapper,
  ExecutorWrapper,
  HeaderWrapper,
  WrapperContent,
  WrapperStyled,
  DescriptionWrapper,
  ExtraWrapperContent,
} from './item.styled';
import Executor from './executor';
import Title from './title';
import Date from './date';
import Creator from './creator';
import Description from './description';
import Department from './department';

interface ItemI {
  isLoading?: boolean;
  title?: string;
  description?: string;
  executor?: UserI;
  creator?: UserI;
  department?: DepartmentI;
  status: AssignmentStatus;
  dateFrom?: string;
}

const Item: React.FC<ItemI> = ({ title, description, executor, creator, status, dateFrom, department, isLoading }) => {
  const isAssignmentDone = useMemo(
    () => status === AssignmentStatus.done || status === AssignmentStatus.canceled,
    [status],
  );

  return isLoading ? (
    <SkeletonTask />
  ) : (
    <WrapperStyled>
      <HeaderWrapper $status={status}>
        <Title text={title ?? ''} />

        <WrapperContent>
          <ExecutorWrapper>
            <Executor user={executor} />
          </ExecutorWrapper>

          <DateWrapper>
            <Date dateFrom={dateFrom} />
          </DateWrapper>
        </WrapperContent>

        <ExtraWrapperContent>
          <Department department={department} />
        </ExtraWrapperContent>
      </HeaderWrapper>

      <DescriptionWrapper>
        <Description text={description ?? ''} />
      </DescriptionWrapper>

      <Divider />

      <CreatorWrapper>
        <Creator user={creator} />
      </CreatorWrapper>
    </WrapperStyled>
  );
};

export default Item;
