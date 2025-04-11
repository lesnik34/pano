import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { PriorityEnum } from '@api/types';

import { ContentStyled, ContentWrapperStyled, LabelStyled, StatusStyled, WrapperStyled } from './priority.styled';

interface PriorityI {
  priority: PriorityEnum;
}

type TProperties = {
  color: 'primary' | 'warning' | 'danger';
  label: string;
};

const Priority: React.FC<PriorityI> = ({ priority }) => {
  const { t } = useTranslation();

  const properties: TProperties = useMemo(() => {
    switch (priority) {
      case PriorityEnum.low:
        return {
          color: 'primary',
          label: t('priority.1.label'),
        };
      case PriorityEnum.medium:
        return {
          color: 'warning',
          label: t('priority.2.label'),
        };
      case PriorityEnum.high:
        return {
          color: 'danger',
          label: t('priority.3.label'),
        };
      default:
        return {
          color: 'primary',
          label: t('priority.1.label'),
        };
    }
  }, [priority, t]);

  return (
    <WrapperStyled>
      <LabelStyled>{t('task.priority.label')}</LabelStyled>

      <ContentWrapperStyled>
        <StatusStyled $color={properties.color} />

        <ContentStyled>{properties.label}</ContentStyled>
      </ContentWrapperStyled>
    </WrapperStyled>
  );
};

export default Priority;
