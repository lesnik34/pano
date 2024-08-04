import { selectors, useAppSelector } from '@store/index';
import UserBar from '@components/user-bar';
import NavLinks from '@components/nav-links';
import { query } from '@api/index';

import Notifications from './notifications';
import { WrapperNavbarStyled, WrapperUserStyled, HeaderStyled } from './header.styled';

const Header = () => {
  const userId = useAppSelector(selectors.auth.userId);
  const { data, isError, isLoading } = query.useGetUserByIdQuery(userId);
  const { firstName, lastName, appointment, avatarUrl } = data || {};
  const userName = `${firstName ?? ''} ${lastName ?? ''}`.trim();

  return (
    <HeaderStyled>
      <WrapperUserStyled>
        <Notifications />

        <UserBar
          name={userName}
          description={appointment}
          avatarUrl={avatarUrl}
          isLoading={isLoading}
          isError={isError}
        />
      </WrapperUserStyled>

      <WrapperNavbarStyled>
        <NavLinks />
      </WrapperNavbarStyled>
    </HeaderStyled>
  );
};

export default Header;
