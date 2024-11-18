import React from 'react';
import { TaskI as TaskItemI, TaskStatus } from '@api/types';

import { WrapperStyled } from './task.styled';
import View from './view';
import Edit from './edit';

interface TaskI {
  title?: string;
  data?: TaskItemI;
  isEditMode: boolean;
  isLoading?: boolean;
}

const Task: React.FC<TaskI> = ({ data, isLoading, isEditMode, title }) => (
  <WrapperStyled>
    {isEditMode ? (
      <Edit title={title} isLoading={isLoading} data={data} />
    ) : (
      <View
        isLoading={isLoading}
        creator={data?.creator}
        executor={data?.executor}
        title={data?.title}
        description={data?.description}
        status={data?.status || TaskStatus.toDo}
        dateFrom={data?.createdDate}
        dateTill={data?.endDate}
      />
    )}
  </WrapperStyled>
);

export default Task;
