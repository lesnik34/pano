import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Select, SelectItem, Slider } from '@heroui/react';
import { useTranslation } from 'react-i18next';

import { PriorityEnum } from '@api/types';

import { WrapperStyled } from './priority.styled';

interface PriorityI {
  value?: PriorityEnum;
  isLoading?: boolean;
}

const formName = 'priority';

const Priority: React.FC<PriorityI> = ({ value, isLoading }) => {
  const { t } = useTranslation();
  const { control } = useFormContext();

  return (
    <WrapperStyled>
      <Controller
        name={formName}
        control={control}
        defaultValue={value}
        render={({ field }) => (
          <Select
            {...field}
            selectedKeys={[field.value]}
            disallowEmptySelection
            label={t('task.priority.label')}
            disabled={isLoading}
          >
            <SelectItem key={PriorityEnum.high}>{t('priority.3.label')}</SelectItem>

            <SelectItem key={PriorityEnum.medium}>{t('priority.2.label')}</SelectItem>

            <SelectItem key={PriorityEnum.low}>{t('priority.1.label')}</SelectItem>
          </Select>
        )}
      />
    </WrapperStyled>
  );
};

export default Priority;
