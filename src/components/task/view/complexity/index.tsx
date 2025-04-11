import React, { useMemo } from 'react';
import { Progress } from '@heroui/react';
import { useTranslation } from 'react-i18next';

import { ComplexityType } from '@api/types';

import { LabelStyled, WrapperStyled } from './complexity.styled';

interface ComplexityI {
  complexity: ComplexityType;
}

type TProperties = {
  color: 'primary' | 'warning' | 'danger';
  label: string;
  value: number;
};

const Complexity: React.FC<ComplexityI> = ({ complexity }) => {
  const { t } = useTranslation();

  const properties: TProperties = useMemo(() => {
    switch (complexity) {
      case 1:
        return {
          color: 'primary',
          label: t('complexity.1.label'),
          value: 33,
        };
      case 2:
        return {
          color: 'warning',
          label: t('complexity.2.label'),
          value: 66,
        };
      case 3:
        return {
          color: 'danger',
          label: t('complexity.3.label'),
          value: 100,
        };
      default:
        return {
          color: 'primary',
          label: t('complexity.1.label'),
          value: 33,
        };
    }
  }, [complexity, t]);

  return (
    <WrapperStyled>
      <LabelStyled>{t('task.complexity.label')}</LabelStyled>

      <Progress aria-label={properties.label} color={properties.color} value={properties.value} />
    </WrapperStyled>
  );
};

export default Complexity;
