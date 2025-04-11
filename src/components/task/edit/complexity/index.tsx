import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Slider } from '@heroui/react';
import { useTranslation } from 'react-i18next';

import { ComplexityType } from '@api/types';

import { WrapperStyled } from './complexity.styled';

interface TitleI {
  value?: ComplexityType;
  isLoading?: boolean;
}

const formName = 'complexity';

const Complexity: React.FC<TitleI> = ({ value, isLoading }) => {
  const { t } = useTranslation();
  const { control } = useFormContext();

  return (
    <WrapperStyled>
      <Controller
        name={formName}
        control={control}
        defaultValue={value}
        render={({ field }) => (
          <Slider
            {...field}
            defaultValue={value ?? 1}
            label={t('task.complexity.label')}
            maxValue={3}
            minValue={1}
            isDisabled={isLoading}
            size="md"
            step={1}
          />
        )}
      />
    </WrapperStyled>
  );
};

export default Complexity;
