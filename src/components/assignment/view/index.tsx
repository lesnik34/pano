import React from 'react';
import { Divider } from '@heroui/react';

import SkeletonTask from '@components/skeleton/task';
import { AssignmentStatus, ComplexityType, DepartmentI, PriorityEnum, UserI } from '@api/types';

import {
  WrapperStyled,
  HeaderWrapperStyled,
  WrapperContentStyled,
  DescriptionWrapperStyled,
  CreatorWrapperStyled,
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
  status: AssignmentStatus;
  complexity: ComplexityType;
  priority: PriorityEnum;
  dateFrom?: string;
}

const Item: React.FC<ItemI> = ({
  title,
  description,
  executor,
  creator,
  status,
  dateFrom,
  department,
  complexity,
  priority,
  isLoading,
}) =>
  isLoading ? (
    <SkeletonTask />
  ) : (
    <WrapperStyled>
      <HeaderWrapperStyled $status={status}>
        <Title text={title ?? ''} />

        <WrapperContentStyled>
          <Executor user={executor} />

          <Date dateFrom={dateFrom} />
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

export default Item;
