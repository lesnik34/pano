import { User } from '@nextui-org/react';

import { NameWrapperStyled, DescriptionWrapperStyled } from './user-bar.styles';

interface UserBarI {
  firstName?: string;
  lastName?: string;
  name?: string;
  description?: string;
  avatarUrl?: string;
  isLoading?: boolean;
  isError?: boolean;
}

const UserBar: React.FC<UserBarI> = ({ firstName, lastName, description, avatarUrl, isError, isLoading }) => {
  const userName = `${firstName?.trim() ?? ''} ${lastName?.trim() ?? ''}`;
  const isSkeletonVisible = isError || isLoading;

  return (
    <User
      name={<NameWrapperStyled isLoaded={!isSkeletonVisible}>{userName}</NameWrapperStyled>}
      description={<DescriptionWrapperStyled isLoaded={!isSkeletonVisible}>{description}</DescriptionWrapperStyled>}
      avatarProps={{
        src: avatarUrl,
      }}
    />
  );
};

export default UserBar;
