import React from 'react';
import { v4 as uuid } from 'uuid';
import SkeletonUser from '@components/skeleton/user';

const SHIMMER_LENGTH = 4;

const SkeletonUserList: React.FC = () => {
  const shimmerItems = new Array(SHIMMER_LENGTH).fill(1);

  return (
    <>
      {shimmerItems.map(() => (
        <div key={uuid()} className="mb-[10px]">
          <SkeletonUser />
        </div>
      ))}
    </>
  );
};

export default SkeletonUserList;
