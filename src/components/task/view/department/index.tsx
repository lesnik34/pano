import React from 'react';
import { useTranslation } from 'react-i18next';
import { DepartmentI } from '@api/types';

import { ContentStyled, LabelStyled, WrapperStyled } from './department.styled';

interface DepartmentComponentI {
  department?: DepartmentI;
}

const Department: React.FC<DepartmentComponentI> = ({ department }) => {
  const { t } = useTranslation();

  return (
    <WrapperStyled>
      <LabelStyled>{t('task.department.label')}</LabelStyled>

      <ContentStyled>{department?.title || t('not.exist')}</ContentStyled>
    </WrapperStyled>
  );
};

export default Department;
