import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from '@nextui-org/react';

import { WrapperStyled } from './executor.styled';

interface ExecutorI {
  value?: string;
  isLoading?: boolean;
}

const Executor: React.FC<ExecutorI> = ({ value, isLoading }) => {
  const { t } = useTranslation();
  const { control } = useFormContext();

  return (
    <WrapperStyled>
      <Controller
        name="executor"
        control={control}
        defaultValue={value}
        render={({ field }) => <Input {...field} isDisabled={isLoading} label={t('input.executor.label')} />}
      />
    </WrapperStyled>
  );
};

export default Executor;
