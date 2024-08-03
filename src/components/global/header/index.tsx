import { ContainerStyled } from '@styles/container';
import { query } from '@api/index';
import useTelegram from '@hooks/telegram';

import Notifications from './notifications';
import UserBar from '../../user-bar';

import { WrapperStyled } from './header.styled';

const Header = () => {
  const { user } = useTelegram();
  const userID = `${user?.id}`;
  const { data, isError, isLoading } = query.useGetUserByIdQuery(userID);
  const { firstName, lastName, appointment, avatarUrl } = data || {};
  const userName = `${firstName ?? ''} ${lastName ?? ''}`.trim();

  return (
    <header>
      <ContainerStyled>
        <WrapperStyled>
          <Notifications />

          <UserBar
            name={userName}
            description={appointment}
            avatarUrl={avatarUrl}
            isLoading={isLoading}
            isError={isError}
          />
        </WrapperStyled>
      </ContainerStyled>
    </header>
  );
};

export default Header;
