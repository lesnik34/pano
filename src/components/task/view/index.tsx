import React, { useMemo } from 'react';
import { Divider } from "@heroui/react";
import { DepartmentI, TaskStatus, UserI } from '@api/types';
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
  status: TaskStatus;
  dateFrom?: string;
  dateTill?: string;
}

const Item: React.FC<ItemI> = ({
  title,
  description,
  executor,
  creator,
  status,
  dateFrom,
  dateTill,
  department,
  isLoading,
}) => {
  const isTaskDone = useMemo(() => status === TaskStatus.done || status === TaskStatus.canceled, [status]);

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
            <Date isDone={isTaskDone} dateFrom={dateFrom} dateTill={dateTill} />
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
