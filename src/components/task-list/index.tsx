import React from 'react';
import { v4 as uuid } from 'uuid';
import { TaskI } from '@api/types';

import Item from './item';
import ItemShimmer from './shimmer';
import { ItemWrapperStyled, WrapperStyled } from './task.styled';

interface TaskListI {
  items?: TaskI[];
  isLoading?: boolean;
}

const SHIMMER_LENGTH = 5;

const TaskList: React.FC<TaskListI> = ({ items, isLoading }) => {
  const isItemsVisible = items && !isLoading;
  const shimmerItems = new Array(SHIMMER_LENGTH).fill(1);

  return (
    <WrapperStyled>
      {isLoading &&
        shimmerItems.map(() => (
          <ItemWrapperStyled key={uuid()}>
            <ItemShimmer />
          </ItemWrapperStyled>
        ))}
      {isItemsVisible &&
        items?.map((item) => (
          <ItemWrapperStyled key={item.id}>
            <Item
              id={item.id}
              title={item.title}
              description={item.description}
              dateFrom={item.date_start}
              dateTill={item.date_end}
              status={item.status}
            />
          </ItemWrapperStyled>
        ))}
    </WrapperStyled>
  );
};

export default TaskList;
