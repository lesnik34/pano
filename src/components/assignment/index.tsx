import React from 'react';
import { AssignmentI as AssignmentItemI, AssignmentStatus, PriorityEnum } from '@api/types';

import { WrapperStyled } from './assignment.styled';
import View from './view';
import Edit from './edit';

interface AssignmentI {
  title?: string;
  data?: AssignmentItemI;
  isEditMode: boolean;
  isLoading?: boolean;
}

const Assignment: React.FC<AssignmentI> = ({ data, isLoading, isEditMode, title }) => (
  <WrapperStyled>
    {isEditMode ? (
      <Edit title={title} isLoading={isLoading} data={data} />
    ) : (
      <View
        isLoading={isLoading}
        creator={data?.creator}
        executor={data?.executor}
        department={data?.department}
        title={data?.title}
        description={data?.description}
        status={data?.status || AssignmentStatus.toDo}
        complexity={data?.complexity ?? 1}
        priority={data?.priority ?? PriorityEnum.low}
        dateFrom={data?.createdDate}
      />
    )}
  </WrapperStyled>
);

export default Assignment;
