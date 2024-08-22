import React from 'react';
import Filters from '@/components/filters';
import { WrapperStyled } from './header.styled';

interface HeaderI {
  isLoading?: boolean;
}

const Header: React.FC<HeaderI> = ({ isLoading }) => {
  console.log(123);
  return (
    <WrapperStyled>
      <Filters isLoading={isLoading} />
    </WrapperStyled>
  );
};

export default Header;
