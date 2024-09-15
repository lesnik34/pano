import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getDateRange, isDateSoon } from '@utils/common';

import { ContentStyled, LabelStyled, WrapperStyled } from './date.styled';

interface DateI {
  dateFrom?: string;
  dateTill?: string;
  isDone: boolean;
}

const Date: React.FC<DateI> = ({ dateFrom, dateTill, isDone }) => {
  const { t } = useTranslation();
  const dateRange = useMemo(() => getDateRange(dateFrom, dateTill) || t('empty.symbol'), [dateFrom, dateTill, t]);
  const isDeadline = useMemo(() => !isDone && isDateSoon(dateTill), [dateTill, isDone]);

  return (
    <WrapperStyled>
      <LabelStyled>{t('task.date.label')}</LabelStyled>

      <ContentStyled $deadline={isDeadline}>{dateRange}</ContentStyled>
    </WrapperStyled>
  );
};
export default Date;
