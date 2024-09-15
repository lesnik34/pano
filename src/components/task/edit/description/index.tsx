import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Textarea } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

import { WrapperStyled } from './title.styled';

interface DescriptionI {
  value?: string;
  isLoading?: boolean;
}

const Description: React.FC<DescriptionI> = ({ value, isLoading }) => {
  const { t } = useTranslation();
  const { control } = useFormContext();

  return (
    <WrapperStyled>
      <Controller
        name="description"
        control={control}
        defaultValue={value}
        render={({ field }) => <Textarea {...field} isDisabled={isLoading} label={t('input.description.label')} />}
      />
    </WrapperStyled>
  );
};

export default Description;
