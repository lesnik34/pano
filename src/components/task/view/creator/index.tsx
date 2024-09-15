import React from 'react';
import { useTranslation } from 'react-i18next';
import query from '@api/query';

import { ContentStyled, LabelStyled, WrapperStyled } from './creator.styled';

interface CreatorI {
  userId: string;
}

const Creator: React.FC<CreatorI> = ({ userId }) => {
  const { t } = useTranslation();
  const { data } = query.useGetUserByIdQuery(userId ?? '');
  const { firstName, lastName } = data || {};

  return (
    <WrapperStyled>
      <LabelStyled>{t('task.creator.label')}</LabelStyled>

      <ContentStyled>{`${firstName || ''} ${lastName || ''}`}</ContentStyled>
    </WrapperStyled>
  );
};

export default Creator;
