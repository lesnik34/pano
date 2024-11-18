import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { UserI } from '@api/types';

import { ContentStyled, LabelStyled, WrapperStyled } from './executor.styled';

interface ExecutorI {
  user?: UserI;
}

const Executor: React.FC<ExecutorI> = ({ user }) => {
  const { t } = useTranslation();

  const textContent = useMemo(() => {
    if (user?.firstName || user?.lastName) {
      return `${user.firstName || ''} ${user.lastName || ''}`.trim();
    }

    return t('not.exist');
  }, [t, user?.firstName, user?.lastName]);

  return (
    <WrapperStyled>
      <LabelStyled>{t('task.executor.label')}</LabelStyled>

      <ContentStyled>{textContent}</ContentStyled>
    </WrapperStyled>
  );
};

export default Executor;
