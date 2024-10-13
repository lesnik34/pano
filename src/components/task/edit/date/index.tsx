import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@nextui-org/react';
import { useFormContext } from 'react-hook-form';
import { parseDate, now, getLocalTimeZone, CalendarDate } from '@internationalized/date';
import { getCurrentGlobalDate } from '@utils/common';
import { getLocalISOString } from '@utils/date';

import { WrapperStyled } from './date.styled';

interface DateI {
  dateTill?: string;
  isLoading?: boolean;
}

const fieldId = 'endDate';

const DateComponent: React.FC<DateI> = ({ dateTill, isLoading }) => {
  const { t } = useTranslation();
  const { register, setValue } = useFormContext();

  const endDate = useMemo(() => getCurrentGlobalDate(dateTill), [dateTill]);

  const onChange = useCallback(
    (calendarDate: CalendarDate) => {
      const { day, month, year } = calendarDate;
      const date = new Date(year, month - 1, day);
      const localISO = getLocalISOString(date);

      setValue(fieldId, localISO);
    },
    [setValue],
  );

  return (
    <WrapperStyled>
      <DatePicker
        {...register(fieldId)}
        isDisabled={isLoading}
        label={t('input.date.label')}
        defaultValue={endDate ? parseDate(endDate) : null}
        minValue={now(getLocalTimeZone())}
        onChange={onChange}
      />
    </WrapperStyled>
  );
};
export default DateComponent;
