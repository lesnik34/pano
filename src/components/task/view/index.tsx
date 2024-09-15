import React, { useMemo } from 'react';
import { Divider, Skeleton } from '@nextui-org/react';
import { TaskStatus } from '@api/types';

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

  return (
    <WrapperStyled>
      <Skeleton className="rounded-lg" isLoaded={!isLoading}>
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
      </Skeleton>

      <DescriptionWrapper>
        <Skeleton className="rounded-lg" isLoaded={!isLoading}>
          <Description text={description ?? ''} />
        </Skeleton>
      </DescriptionWrapper>

      <Divider />

      <CreatorWrapper>
        <Skeleton className="rounded-lg" isLoaded={!isLoading}>
          <Creator userId={creatorId ?? ''} />
        </Skeleton>
      </CreatorWrapper>
    </WrapperStyled>
  );
};

export default Item;
