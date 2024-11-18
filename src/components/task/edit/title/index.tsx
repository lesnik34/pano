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

const formName = 'title';

const Title: React.FC<TitleI> = ({ value, isLoading }) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const formError = errors[formName];

  return (
    <WrapperStyled>
      <Controller
        name={formName}
        control={control}
        defaultValue={value}
        rules={{
          required: t('required.message'),
          minLength: {
            value: MIN_LENGTH_INPUT,
            message: t('title.min.length.message'),
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            isInvalid={Boolean(formError)}
            errorMessage={formError?.message as string | undefined}
            isRequired
            isDisabled={isLoading}
            label={t('input.title.label')}
          />
        )}
      />
    </WrapperStyled>
  );
};

export default Title;
