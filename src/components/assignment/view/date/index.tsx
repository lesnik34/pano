import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getLocalDate } from '@utils/common';

import { ContentStyled, LabelStyled, WrapperStyled } from './date.styled';

interface DateI {
  dateFrom?: string;
}

const Date: React.FC<DateI> = ({ dateFrom }) => {
  const { t } = useTranslation();
  const date = useMemo(() => getLocalDate(dateFrom) || t('empty.symbol'), [dateFrom, t]);

  return (
    <WrapperStyled>
      <LabelStyled>{t('assignment.date.label')}</LabelStyled>

      <ContentStyled>{date}</ContentStyled>
    </WrapperStyled>
  );
};
export default Date;
