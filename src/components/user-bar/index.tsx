import { User } from '@nextui-org/react';

import { NameWrapperStyled, DescriptionWrapperStyled } from './user-bar.styles';

interface UserBarI {
  name?: string;
  description?: string;
  avatarUrl?: string;
  isLoading?: boolean;
  isError?: boolean;
}

const UserBar: React.FC<UserBarI> = ({ name, description, avatarUrl, isError, isLoading }) => {
  const isSkeletonVisible = isError || isLoading;

  return (
    <User
      name={<NameWrapperStyled isLoaded={!isSkeletonVisible}>{name}</NameWrapperStyled>}
      description={<DescriptionWrapperStyled isLoaded={!isSkeletonVisible}>{description}</DescriptionWrapperStyled>}
      avatarProps={{
        src: avatarUrl,
      }}
    />
  );
};

export default UserBar;
