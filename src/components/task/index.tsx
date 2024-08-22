import React from 'react';
import { TaskI as TaskItemI } from '@/api';

import { WrapperStyled } from './task.styled';

interface TaskI {
  data?: TaskItemI;
  isLoading?: boolean;
}

const Task: React.FC<TaskI> = ({ data, isLoading }) => {
  const isTaskVisible = data && !isLoading;

  return (
    <WrapperStyled>
      {isLoading && <div>Loading...</div>}
      {isTaskVisible && <div>Item</div>}
    </WrapperStyled>
  );
};

export default Task;
