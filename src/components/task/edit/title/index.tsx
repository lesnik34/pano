import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { MIN_LENGTH_INPUT } from '@constants/common';

import { WrapperStyled } from './title.styled';

interface TitleI {
  value?: string;
  isLoading?: boolean;
}

const Title: React.FC<TitleI> = ({ value, isLoading }) => {
  const { t } = useTranslation();
  const { control } = useFormContext();

  return (
    <WrapperStyled>
      <Controller
        name="title"
        control={control}
        defaultValue={value}
        rules={{
          required: true,
          minLength: MIN_LENGTH_INPUT,
        }}
        render={({ field }) => <Input {...field} isRequired isDisabled={isLoading} label={t('input.title.label')} />}
      />
    </WrapperStyled>
  );
};

export default Title;
