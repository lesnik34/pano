import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@nextui-org/react';
import { parseDate } from '@internationalized/date';
import { getCurrentGlobalDate } from '@utils/common';

import { WrapperStyled } from './date.styled';

interface DateI {
  dateTill?: string;
  isLoading?: boolean;
}

const DateComponent: React.FC<DateI> = ({ dateTill, isLoading }) => {
  const { t } = useTranslation();

  const endDate = useMemo(() => getCurrentGlobalDate(dateTill), [dateTill]);

  return (
    <WrapperStyled>
      <DatePicker
        isDisabled={isLoading}
        label={t('input.date.label')}
        defaultValue={endDate ? parseDate(endDate) : null}
      />
    </WrapperStyled>
  );
};
export default DateComponent;
