import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AssignmentStatus } from '@api/types';
import { getLocalDate } from '@utils/common';
import { getStatusProperties } from '@styles/utils/common';
import { PAGE_ASSIGNMENTS } from '@constants/pages';

import {
  ButtonWrapperStyled,
  DateStyled,
  DescriptionStyled,
  TitleStyled,
  FooterStyled,
  StatusStyled,
  HeaderStyled,
} from './item.styled';

interface AssignmentItemI {
  id?: string;
  title?: string;
  description?: string;
  status: AssignmentStatus;
  dateFrom?: string;
}

const AssignmentItem: React.FC<AssignmentItemI> = ({ id, title, description, status, dateFrom }) => {
  const navigate = useNavigate();
  const statusText = useMemo(() => getStatusProperties(status).text, [status]);
  const currentDate = getLocalDate(dateFrom);

  const onClick = useCallback(() => {
    navigate(`${PAGE_ASSIGNMENTS}/${id}`);
  }, [id, navigate]);

  return (
    <ButtonWrapperStyled onPress={onClick} fullWidth variant="faded">
      <HeaderStyled>{title && <TitleStyled>{title}</TitleStyled>}</HeaderStyled>

      <DescriptionStyled>{description}</DescriptionStyled>

      <FooterStyled>
        <DateStyled>{currentDate}</DateStyled>

        <StatusStyled $assignmentStatus={status}>{statusText}</StatusStyled>
      </FooterStyled>
    </ButtonWrapperStyled>
  );
};

export default AssignmentItem;
