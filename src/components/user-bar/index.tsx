import { User } from "@heroui/react";
import SkeletonUser from '@components/skeleton/user';

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

  return isSkeletonVisible ? (
    <SkeletonUser />
  ) : (
    <User
      name={userName}
      description={description}
      avatarProps={{
        src: avatarUrl,
      }}
    />
  );
};

export default UserBar;
