import React, { useMemo } from 'react';
import { AssignmentI } from '@api/types';

import { Wrapper } from './controls.styled';
import View from './view';
import Edit from './edit';

interface ControlsI {
  data?: AssignmentI;
  isEditMode: boolean;
  setEditMode: (value: boolean) => void;
}

const Controls: React.FC<ControlsI> = ({ data, isEditMode, setEditMode }) => {
  const isViewMode = !isEditMode;
  const editData = useMemo(
    () => ({
      id: data?.id || '',
      title: data?.title || '',
      description: data?.description,
      executor: data?.executor.id,
      creator: data?.creator.id,
      department: data?.department?.id,
    }),
    [data?.creator.id, data?.department?.id, data?.description, data?.executor.id, data?.id, data?.title],
  );

  return (
    <Wrapper>
      {isViewMode && <View data={data} setEditMode={setEditMode} />}
      {isEditMode && <Edit data={editData} setEditMode={setEditMode} />}
    </Wrapper>
  );
};

export default Controls;
