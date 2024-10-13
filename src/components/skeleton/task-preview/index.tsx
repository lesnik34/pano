import React from 'react';
import ContentLoader from 'react-content-loader';
import { useTheme } from 'styled-components';

const SkeletonTaskPreview = () => {
  const theme = useTheme();

  return (
    <ContentLoader
      speed={2}
      className="w-full"
      width="100%"
      height="130px"
      backgroundColor={theme.dark.colors.skeletonBackground}
      foregroundColor={theme.dark.colors.skeletonForeground}
    >
      <rect x="0" y="0" rx="6" ry="6" width="100%" height="130" />
    </ContentLoader>
  );
};

export default SkeletonTaskPreview;
