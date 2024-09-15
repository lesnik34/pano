import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskStatus } from '@api/types';
import { getDateRange, isDateSoon } from '@utils/common';
import { getTaskStatusProperties } from '@styles/utils/common';
import { PAGE_TASKS } from '@constants/pages';

import {
  ButtonWrapperStyled,
  DateStyled,
  DescriptionStyled,
  TitleStyled,
  FooterStyled,
  StatusStyled,
  HeaderStyled,
  StatusLineStyled,
} from './item.styled';

interface TaskItemI {
  id?: string;
  title?: string;
  description?: string;
  status: TaskStatus;
  dateFrom?: string;
  dateTill?: string;
}

const TaskItem: React.FC<TaskItemI> = ({ id, title, description, status, dateFrom, dateTill }) => {
  const navigate = useNavigate();
  const statusText = useMemo(() => getTaskStatusProperties(status).text, [status]);
  const dateRange = useMemo(() => getDateRange(dateFrom, dateTill), [dateFrom, dateTill]);
  const isDeadline = useMemo(() => isDateSoon(dateTill), [dateTill]);

  const onClick = useCallback(() => {
    navigate(`${PAGE_TASKS}/${id}`);
  }, [id, navigate]);

  return (
    <ButtonWrapperStyled onClick={onClick} fullWidth variant="flat">
      <HeaderStyled>{title && <TitleStyled>{title}</TitleStyled>}</HeaderStyled>

      <DescriptionStyled>{description}</DescriptionStyled>

      <FooterStyled>
        <DateStyled $deadline={isDeadline}>{dateRange}</DateStyled>

        <StatusStyled $taskStatus={status}>{statusText}</StatusStyled>
      </FooterStyled>

      <StatusLineStyled $taskStatus={status} />
    </ButtonWrapperStyled>
  );
};

export default TaskItem;
