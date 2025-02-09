import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { Button } from '@heroui/react';

import { PAGE_NEW_TASK } from '@constants/pages';
import { WrapperStyled } from './elevation.styled';

interface ElevationI {
  isLoading?: boolean;
}

const Elevation: React.FC<ElevationI> = ({ isLoading }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onButtonClick = useCallback(() => {
    navigate(PAGE_NEW_TASK);
  }, [navigate]);

  return (
    <WrapperStyled>
      <Button
        size="lg"
        radius="full"
        variant="shadow"
        color="primary"
        fullWidth
        onPress={onButtonClick}
        isLoading={isLoading}
        startContent={isLoading ? null : <IoMdAdd />}
      >
        {t('tasks.button.new')}
      </Button>
    </WrapperStyled>
  );
};

export default Elevation;
