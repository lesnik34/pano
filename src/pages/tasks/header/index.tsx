import React, { useCallback } from 'react';
import { Button } from '@nextui-org/react';
import { IoMdAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { PAGE_NEW_TASK } from '@constants/pages';
import Filters from '@components/filters';
import { WrapperStyled } from './header.styled';

interface HeaderI {
  isLoading?: boolean;
}

const Header: React.FC<HeaderI> = ({ isLoading }) => {
  const navigate = useNavigate();

  const onAddClick = useCallback(() => {
    navigate(PAGE_NEW_TASK);
  }, [navigate]);

  return (
    <WrapperStyled>
      <Filters isLoading={isLoading} />

      <Button
        className="w-16"
        onClick={onAddClick}
        isIconOnly
        isDisabled={isLoading}
        variant="flat"
        color="default"
        startContent={<IoMdAdd />}
      />
    </WrapperStyled>
  );
};

export default Header;
