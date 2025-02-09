import React from 'react';

import Search from '@components/search';
import Filters from './filters';
import { SideWrapperStyled, WrapperStyled } from './header.styled';

interface HeaderI {
  isLoading?: boolean;
}

const Header: React.FC<HeaderI> = ({ isLoading }) => (
  <WrapperStyled>
    <SideWrapperStyled>
      <Filters isLoading={isLoading} />

      <div className="ml-2">
        <Search isLoading={isLoading} />
      </div>
    </SideWrapperStyled>
  </WrapperStyled>
);

export default Header;
