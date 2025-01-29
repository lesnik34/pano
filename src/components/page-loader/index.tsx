import { Spinner } from "@heroui/react";
import { useTranslation } from 'react-i18next';

import { LoaderWrapperStyled } from './loader.styled';

interface PageLoaderI {
  label?: string;
  mode?: 'fullHeight' | 'lg';
}

const PageLoader: React.FC<PageLoaderI> = ({ label, mode = 'fullHeight' }) => {
  const { t } = useTranslation();

  return (
    <LoaderWrapperStyled $mode={mode}>
      <Spinner label={label || t('default.loader.label')} />
    </LoaderWrapperStyled>
  );
};

export default PageLoader;
