import UserBar from '@components/user-bar';
import NavLinks from '@components/nav-links';
import query from '@api/query';
import { useAppSelector } from '@store/store';
import selectors from '@store/selectors';

import Notifications from './notifications';
import { WrapperNavbarStyled, WrapperUserStyled, HeaderStyled } from './header.styled';

interface HeaderI {
  navHidden?: boolean;
}

const Header: React.FC<HeaderI> = ({ navHidden }) => {
  const userId = useAppSelector(selectors.auth.userId);
  const { data, isError, isFetching } = query.useGetUserByIdQuery(userId);
  const { firstName, lastName } = data || {};

  return (
    <HeaderStyled>
      <WrapperUserStyled>
        <Notifications />

        <UserBar firstName={firstName} lastName={lastName} isLoading={isFetching} isError={isError} />
      </WrapperUserStyled>

      {!navHidden && (
        <WrapperNavbarStyled>
          <NavLinks />
        </WrapperNavbarStyled>
      )}
    </HeaderStyled>
  );
};

export default Header;
