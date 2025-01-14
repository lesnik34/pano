import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker, DateValue } from '@nextui-org/react';
import { useFormContext } from 'react-hook-form';
import { parseDate, now, getLocalTimeZone } from '@internationalized/date';
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
  register(fieldId);

  const endDate = useMemo(() => getCurrentGlobalDate(dateTill), [dateTill]);
  const defaultValue = endDate ? (parseDate(endDate) as unknown as DateValue) : null;
  const minValue = now(getLocalTimeZone()) as unknown as DateValue;

  const onChange = useCallback(
    (calendarDate: DateValue | null) => {
      if (!calendarDate) {
        return;
      }

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
        isDisabled={isLoading}
        label={t('input.date.label')}
        defaultValue={defaultValue}
        minValue={minValue}
        onChange={onChange}
        isInvalid={false}
        popoverProps={{
          shouldBlockScroll: true,
        }}
      />
    </WrapperStyled>
  );
};
export default DateComponent;
