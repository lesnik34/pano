import React from 'react';
import ContentLoader from 'react-content-loader';
import { useTheme } from 'styled-components';

const SkeletonTask = () => {
  const theme = useTheme();

  return (
    <ContentLoader
      speed={2}
      className="w-full"
      width="100%"
      height="450px"
      backgroundColor={theme.dark.colors.skeletonBackground}
      foregroundColor={theme.dark.colors.skeletonForeground}
    >
      <rect x="0" y="0" rx="6" ry="6" width="100%" height="150" />
      <rect x="0" y="170" rx="6" ry="6" width="100%" height="60" />
      <rect x="0" y="250" rx="6" ry="6" width="130" height="15" />
      <rect x="0" y="270" rx="6" ry="6" width="100" height="15" />
      <rect x="0" y="360" rx="6" ry="6" width="100%" height="40" />
      <rect x="0" y="410" rx="6" ry="6" width="100%" height="40" />
    </ContentLoader>
  );
};

export default SkeletonTask;
