import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { TaskI } from '@api/types';
import Title from './title';
import Description from './description';
import Executor from './executor';
import Date from './date';
import {
  DateWrapper,
  DescriptionWrapper,
  ExecutorWrapper,
  TitleStyled,
  TitleWrapper,
  WrapperStyled,
} from './edit.styled';

interface EditI {
  title?: string;
  isLoading?: boolean;
  data?: TaskI;
}

const Edit: React.FC<EditI> = ({ title, isLoading, data }) => {
  const { reset } = useFormContext();

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

      <ExecutorWrapper>
        <Executor user={data?.executor} isLoading={isLoading} />
      </ExecutorWrapper>

      <DateWrapper>
        <Date dateTill={data?.endDate} isLoading={isLoading} />
      </DateWrapper>
    </WrapperStyled>
  );
};

export default Edit;
