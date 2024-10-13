import React from 'react';
import { v4 as uuid } from 'uuid';
import SkeletonTaskPreview from '@components/skeleton/task-preview';

const SHIMMER_LENGTH = 4;

const SkeletonTaskList: React.FC = () => {
  const shimmerItems = new Array(SHIMMER_LENGTH).fill(1);

  return (
    <>
      {shimmerItems.map(() => (
        <SkeletonTaskPreview key={uuid()} />
      ))}
    </>
  );
};

export default SkeletonTaskList;
