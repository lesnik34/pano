import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@heroui/react';

import { getLocalDate } from '@utils/common';
import { AssignmentStatus, ComplexityType, PriorityEnum } from '@api/types';
import { PAGE_ASSIGNMENTS } from '@constants/pages';
import { getStatusProperties } from '@styles/utils/common';

import {
  ButtonWrapperStyled,
  DateStyled,
  DescriptionStyled,
  TitleStyled,
  FooterStyled,
  StatusStyled,
  HeaderStyled,
  PriorityStyled,
} from './item.styled';

type TComplexityProperties = {
  color: 'primary' | 'warning' | 'danger';
  label: string;
  value: number;
};

interface AssignmentItemI {
  id?: string;
  title?: string;
  description?: string;
  status: AssignmentStatus;
  complexity: ComplexityType;
  priority: PriorityEnum;
  dateFrom?: string;
}

const AssignmentItem: React.FC<AssignmentItemI> = ({
  id,
  title,
  description,
  status,
  dateFrom,
  complexity,
  priority,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const statusText = useMemo(() => getStatusProperties(status).text, [status]);
  const currentDate = getLocalDate(dateFrom);

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
    navigate(`${PAGE_ASSIGNMENTS}/${id}`);
  }, [id, navigate]);

  return (
    <ButtonWrapperStyled onPress={onClick} fullWidth variant="faded">
      <HeaderStyled>{title && <TitleStyled>{title}</TitleStyled>}</HeaderStyled>

      <DescriptionStyled>{description}</DescriptionStyled>

      <FooterStyled>
        <div className="flex items-center mr-5">
          <PriorityStyled $priority={priority} />

          <Progress
            className="w-[30px] ml-1"
            aria-label={complexityProperties.label}
            color={complexityProperties.color}
            value={complexityProperties.value}
          />
        </div>

        <DateStyled>{currentDate}</DateStyled>

        <StatusStyled $assignmentStatus={status}>{statusText}</StatusStyled>
      </FooterStyled>
    </ButtonWrapperStyled>
  );
};

export default AssignmentItem;
