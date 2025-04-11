import React from 'react';
import { useTranslation } from 'react-i18next';

import Search from '@components/search';

import SearchItems from './search-items';
import Filters from './filters';
import Status from './status';

import { SideWrapperStyled, WrapperStyled } from './header.styled';

interface HeaderI {
  isLoading?: boolean;
}

const Header: React.FC<HeaderI> = ({ isLoading }) => {
  const { t } = useTranslation();

  return (
    <WrapperStyled>
      <SideWrapperStyled>
        <Filters isLoading={isLoading} />

        <div className="ml-2">
          <Search
            title={t('search.assignments.title')}
            placeholder={t('search.assignments.placeholder')}
            isLoading={isLoading}
          >
            {(search: string) => <SearchItems search={search} />}
          </Search>
        </div>
      </SideWrapperStyled>

      <Status isLoading={isLoading} />
    </WrapperStyled>
  );
};

export default Header;
