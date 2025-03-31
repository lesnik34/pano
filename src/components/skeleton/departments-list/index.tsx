import React from 'react';
import { v4 as uuid } from 'uuid';
import ContentLoader from 'react-content-loader';
import { useTheme } from 'styled-components';

const SHIMMER_LENGTH = 4;

const DepartmentsList: React.FC = () => {
  const theme = useTheme();
  const shimmerItems = new Array(SHIMMER_LENGTH).fill(1);

  return (
    <>
      {shimmerItems.map(() => (
        <ContentLoader
          key={uuid()}
          speed={2}
          className="w-full mb-2 px-2 rounded-2xl"
          width="100%"
          height="56px"
          backgroundColor={theme.dark.colors.skeletonBackground}
          foregroundColor={theme.dark.colors.skeletonForeground}
        >
          <rect x="0" y="0" rx="6" ry="6" width="100%" height="56" />
        </ContentLoader>
      ))}
    </>
  );
};

export default DepartmentsList;
