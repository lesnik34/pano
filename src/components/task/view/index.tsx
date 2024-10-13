import React, { useMemo } from 'react';
import { Divider } from '@nextui-org/react';
import { TaskStatus } from '@api/types';
import SkeletonTask from '@components/skeleton/task';

import {
  CreatorWrapper,
  DateWrapper,
  ExecutorWrapper,
  HeaderWrapper,
  WrapperContent,
  WrapperStyled,
  DescriptionWrapper,
} from './item.styled';
import Executor from './executor';
import Title from './title';
import Date from './date';
import Creator from './creator';
import Description from './description';

interface ItemI {
  isLoading?: boolean;
  title?: string;
  description?: string;
  executorId?: string;
  creatorId?: string;
  status: TaskStatus;
  dateFrom?: string;
  dateTill?: string;
}

const Item: React.FC<ItemI> = ({
  title,
  description,
  executorId,
  creatorId,
  status,
  dateFrom,
  dateTill,
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
            <Executor userId={executorId ?? ''} />
          </ExecutorWrapper>

          <DateWrapper>
            <Date isDone={isTaskDone} dateFrom={dateFrom} dateTill={dateTill} />
          </DateWrapper>
        </WrapperContent>
      </HeaderWrapper>

      <DescriptionWrapper>
        <Description text={description ?? ''} />
      </DescriptionWrapper>

      <Divider />

      <CreatorWrapper>
        <Creator userId={creatorId ?? ''} />
      </CreatorWrapper>
    </WrapperStyled>
  );
};

export default Item;
