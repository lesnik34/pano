import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { Accordion, AccordionItem } from '@heroui/react';

import { TaskI } from '@api/types';

import Description from './description';
import Department from './department';
import Executor from './executor';
import Title from './title';
import Date from './date';
import {
  ComplexityWrapper,
  DateWrapper,
  DepartmentWrapper,
  DescriptionWrapper,
  ExecutorWrapper,
  TitleStyled,
  TitleWrapper,
  WrapperStyled,
} from './edit.styled';
import Complexity from './complexity';
import Priority from './priority';

interface EditI {
  title?: string;
  isLoading?: boolean;
  data?: TaskI;
}

const Edit: React.FC<EditI> = ({ title, isLoading, data }) => {
  const { t } = useTranslation();
  const { reset, watch } = useFormContext();
  const formData = watch();

  useEffect(
    () => () => {
      reset();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <WrapperStyled>
      {title && <TitleStyled>{title}</TitleStyled>}

      <TitleWrapper>
        <Title value={data?.title} isLoading={isLoading} />
      </TitleWrapper>

      <DescriptionWrapper>
        <Description value={data?.description} isLoading={isLoading} />
      </DescriptionWrapper>

      <DepartmentWrapper>
        <Department department={data?.department} isLoading={isLoading} />
      </DepartmentWrapper>

      {formData?.department && (
        <ExecutorWrapper>
          <Executor user={data?.executor} department={formData?.department} isLoading={isLoading} />
        </ExecutorWrapper>
      )}

      <DateWrapper>
        <Date dateTill={data?.endDate} isLoading={isLoading} />
      </DateWrapper>

      <Accordion className="mt-5 pl-0 pr-0">
        <AccordionItem title={t('extra.parameters')}>
          <ComplexityWrapper>
            <Complexity value={data?.complexity} isLoading={isLoading} />
          </ComplexityWrapper>

          <Priority value={data?.priority} isLoading={isLoading} />
        </AccordionItem>
      </Accordion>
    </WrapperStyled>
  );
};

export default Edit;
