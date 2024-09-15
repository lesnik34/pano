import React from 'react';
import { TaskI } from '@api/types';

import { Wrapper } from './controls.styled';
import View from './view';
import Edit from './edit';

interface ControlsI {
  data?: TaskI;
  isEditMode: boolean;
  setEditMode: (value: boolean) => void;
}

const Controls: React.FC<ControlsI> = ({ data, isEditMode, setEditMode }) => {
  const isViewMode = !isEditMode;

  return (
    <Wrapper>
      {isViewMode && <View data={data} setEditMode={setEditMode} />}
      {isEditMode && <Edit data={data} setEditMode={setEditMode} />}
    </Wrapper>
  );
};

export default Controls;
