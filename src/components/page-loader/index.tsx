import { Spinner } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

import { LoaderWrapperStyled } from './loader.styled';

interface PageLoaderI {
  label?: string;
}

const PageLoader: React.FC<PageLoaderI> = ({ label }) => {
  const { t } = useTranslation();

  return (
    <LoaderWrapperStyled>
      <Spinner label={label || t('default.loader.label')} />
    </LoaderWrapperStyled>
  );
};

export default PageLoader;
