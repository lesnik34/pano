import React, { useMemo } from 'react';
import { Divider } from '@heroui/react';
import { ComplexityType, DepartmentI, PriorityEnum, TaskStatus, UserI } from '@api/types';
import SkeletonTask from '@components/skeleton/task';

import {
  CreatorWrapper,
  HeaderWrapper,
  WrapperContent,
  WrapperStyled,
  DescriptionWrapper,
  ExtraWrapperContent,
  LeftItemWrapper,
  SecondaryWrapperContent,
  CreatorWrapperStyled,
  DescriptionWrapperStyled,
  WrapperContentStyled,
  HeaderWrapperStyled,
} from './item.styled';
import Executor from './executor';
import Title from './title';
import Date from './date';
import Creator from './creator';
import Description from './description';
import Department from './department';
import Complexity from './complexity';
import Priority from './priority';

interface ItemI {
  isLoading?: boolean;
  title?: string;
  description?: string;
  executor?: UserI;
  creator?: UserI;
  department?: DepartmentI;
  status: TaskStatus;
  complexity: ComplexityType;
  priority: PriorityEnum;
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
  complexity,
  priority,
  isLoading,
}) => {
  const isTaskDone = useMemo(() => status === TaskStatus.done || status === TaskStatus.canceled, [status]);

  return isLoading ? (
    <SkeletonTask />
  ) : (
    <WrapperStyled>
      <HeaderWrapperStyled $status={status}>
        <Title text={title ?? ''} />

        <WrapperContentStyled>
          <Executor user={executor} />

          <Date isDone={isTaskDone} dateFrom={dateFrom} dateTill={dateTill} />
        </WrapperContentStyled>

        <WrapperContentStyled>
          <Department department={department} />
        </WrapperContentStyled>
      </HeaderWrapperStyled>

      <WrapperContentStyled className="mt-[10px]">
        <Complexity complexity={complexity} />

        <Priority priority={priority} />
      </WrapperContentStyled>

      <DescriptionWrapperStyled>
        <Description text={description ?? ''} />
      </DescriptionWrapperStyled>

      <Divider />

      <CreatorWrapperStyled>
        <Creator user={creator} />
      </CreatorWrapperStyled>
    </WrapperStyled>
  );
};

export default Item;
