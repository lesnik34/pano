import React from 'react';
import ContentLoader from 'react-content-loader';
import { useTheme } from 'styled-components';

const SkeletonUser = () => {
  const theme = useTheme();

  return (
    <ContentLoader
      speed={2}
      width="120px"
      height="36px"
      backgroundColor={theme.dark.colors.skeletonBackground}
      foregroundColor={theme.dark.colors.skeletonForeground}
    >
      <circle cx="18" cy="18" r="18" />
      <rect x="42" y="4" rx="3" ry="3" width="78" height="13" />
      <rect x="42" y="20" rx="3" ry="3" width="52" height="13" />
    </ContentLoader>
  );
};

export default SkeletonUser;
