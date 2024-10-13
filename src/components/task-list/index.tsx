import React from 'react';
import { TaskI } from '@api/types';
import SkeletonTaskList from '@components/skeleton/task-list';

import Item from './item';
import { ItemWrapperStyled, WrapperStyled } from './task.styled';

interface TaskListI {
  items?: TaskI[];
  isLoading?: boolean;
}

const TaskList: React.FC<TaskListI> = ({ items, isLoading }) => {
  const isItemsVisible = items && !isLoading;

  return (
    <WrapperStyled>
      {isLoading && <SkeletonTaskList />}

      {isItemsVisible &&
        items?.map((item) => (
          <ItemWrapperStyled key={item.id}>
            <Item
              id={item.id}
              title={item.title}
              description={item.description}
              dateFrom={item.createdDate}
              dateTill={item.endDate}
              status={item.status}
            />
          </ItemWrapperStyled>
        ))}
    </WrapperStyled>
  );
};

export default TaskList;
