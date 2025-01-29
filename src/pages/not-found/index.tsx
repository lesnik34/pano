import { useTranslation } from 'react-i18next';
import { Link } from "@heroui/react";
import { ContainerStyled } from '@styles/container';
import { PAGE_BASE } from '@constants/pages';

import { WrapperStyled } from './not-found.styled';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <ContainerStyled>
      <WrapperStyled>
        <h1>{t('not.found.page.title')}</h1>

        <Link href={PAGE_BASE}>{t('move.to.main')}</Link>
      </WrapperStyled>
    </ContainerStyled>
  );
};

export default NotFound;
