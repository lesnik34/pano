import React from 'react';
import { TaskI } from '@api/types';
import { useTranslation } from 'react-i18next';
import SkeletonTaskList from '@components/skeleton/task-list';
import Error from '@components/error';

import Item from './item';
import { ItemWrapperStyled, WrapperStyled } from './task.styled';

interface TaskListI {
  items?: TaskI[];
  isLoading?: boolean;
  isColumn?: boolean;
}

const TaskList: React.FC<TaskListI> = ({ items, isLoading, isColumn }) => {
  const { t } = useTranslation();
  const isItemsVisible = items && !isLoading;
  const isEmptyItems = isItemsVisible && items.length === 0;
  const isFlex = isEmptyItems || isColumn;

  return (
    <WrapperStyled $isFlex={isFlex}>
      {isLoading && <SkeletonTaskList />}

      {isEmptyItems && (
        <div className="mt-12 w-full">
          <Error title={t('empty.tasks.title')} description={t('empty.tasks.description')} hideButton />
        </div>
      )}

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
