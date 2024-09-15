import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

import { WrapperStyled } from './title.styled';

interface TitleI {
  value?: string;
  isLoading?: boolean;
}

const Title: React.FC<TitleI> = ({ value, isLoading }) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  console.log(errors);

  return (
    <WrapperStyled>
      <Controller
        name="title"
        control={control}
        defaultValue={value}
        rules={{
          required: true,
        }}
        render={({ field }) => <Input {...field} isDisabled={isLoading} label={t('input.title.label')} />}
      />
    </WrapperStyled>
  );
};

export default Title;
