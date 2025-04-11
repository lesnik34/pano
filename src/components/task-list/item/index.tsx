import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Progress } from '@heroui/react';

import { PAGE_TASKS } from '@constants/pages';
import { getDateRange, isDateSoon } from '@utils/common';
import { getStatusProperties } from '@styles/utils/common';
import { ComplexityType, PriorityEnum, TaskStatus } from '@api/types';

import {
  ButtonWrapperStyled,
  DateStyled,
  DescriptionStyled,
  TitleStyled,
  FooterStyled,
  StatusStyled,
  HeaderStyled,
  StatusLineStyled,
  FooterContentStyled,
  PriorityStyled,
} from './item.styled';

type TComplexityProperties = {
  color: 'primary' | 'warning' | 'danger';
  label: string;
  value: number;
};

interface TaskItemI {
  id?: string;
  title?: string;
  description?: string;
  status: TaskStatus;
  complexity: ComplexityType;
  priority: PriorityEnum;
  dateFrom?: string;
  dateTill?: string;
}

const TaskItem: React.FC<TaskItemI> = ({
  id,
  title,
  description,
  status,
  dateFrom,
  dateTill,
  complexity,
  priority,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const statusText = useMemo(() => getStatusProperties(status).text, [status]);
  const dateRange = useMemo(() => getDateRange(dateFrom, dateTill), [dateFrom, dateTill]);
  const isDeadline = useMemo(() => isDateSoon(dateTill), [dateTill]);

  const complexityProperties: TComplexityProperties = useMemo(() => {
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

  const onClick = useCallback(() => {
    navigate(`${PAGE_TASKS}/${id}`);
  }, [id, navigate]);

  return (
    <ButtonWrapperStyled onPress={onClick} fullWidth variant="flat">
      <HeaderStyled>{title && <TitleStyled>{title}</TitleStyled>}</HeaderStyled>

      <DescriptionStyled>{description}</DescriptionStyled>

      <FooterStyled>
        <FooterContentStyled>
          <div className="flex items-center mr-5">
            <PriorityStyled $priority={priority} />

            <Progress
              className="w-[30px] ml-1"
              aria-label={complexityProperties.label}
              color={complexityProperties.color}
              value={complexityProperties.value}
            />
          </div>

          <DateStyled $deadline={isDeadline}>{dateRange}</DateStyled>
        </FooterContentStyled>

        <StatusStyled $taskStatus={status}>{statusText}</StatusStyled>
      </FooterStyled>

      <StatusLineStyled $taskStatus={status} />
    </ButtonWrapperStyled>
  );
};

export default TaskItem;
