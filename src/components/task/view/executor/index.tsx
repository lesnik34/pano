import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import query from '@api/query';

import { ContentStyled, LabelStyled, WrapperStyled } from './executor.styled';

interface ExecutorI {
  userId: string;
}

const Executor: React.FC<ExecutorI> = ({ userId }) => {
  const { t } = useTranslation();
  const { data, isError } = query.useGetUserByIdQuery(userId);
  const { firstName, lastName } = data || {};

  const textContent = useMemo(() => {
    if (isError) {
      return t('not.found.text');
    }

    if (firstName || lastName) {
      return `${firstName || ''} ${lastName || ''}`.trim();
    }

    return '';
  }, [firstName, isError, lastName, t]);

  return (
    <WrapperStyled>
      <LabelStyled>{t('task.executor.label')}</LabelStyled>

      <ContentStyled>{textContent}</ContentStyled>
    </WrapperStyled>
  );
};

export default Executor;
