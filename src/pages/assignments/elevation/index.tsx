import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { Button } from '@heroui/react';

import { PAGE_NEW_ASSIGNMENT } from '@constants/pages';
import { WrapperStyled } from './elevation.styled';

interface ElevationI {
  isLoading?: boolean;
}

const Elevation: React.FC<ElevationI> = ({ isLoading }) => {
  const navigate = useNavigate();

  const onButtonClick = useCallback(() => {
    navigate(PAGE_NEW_ASSIGNMENT);
  }, [navigate]);

  return (
    <WrapperStyled>
      <Button
        size="lg"
        radius="full"
        fullWidth
        onPress={onButtonClick}
        isLoading={isLoading}
        color="primary"
        variant="shadow"
        startContent={isLoading ? null : <IoMdAdd />}
      />
    </WrapperStyled>
  );
};

export default Elevation;
