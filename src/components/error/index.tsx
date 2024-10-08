import { Button } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

import { ContentStyled, DescriptionStyled, TitleStyled, WrapperStyled } from './error.styled';

interface ErrorI {
  title?: string;
  description?: string;
  buttonText?: string;
  onClick?: () => void;
  isFullScreen?: boolean;
}

const Error: React.FC<ErrorI> = ({ title, description, buttonText, isFullScreen, onClick = () => {} }) => {
  const { t } = useTranslation();

  return (
    <WrapperStyled $isFullScreen={isFullScreen}>
      <ContentStyled>
        <TitleStyled>{title || t('default.error.page.title')}</TitleStyled>

        <DescriptionStyled>{description || t('default.error.page.description')}</DescriptionStyled>

        <Button color="primary" onClick={onClick}>
          {t('default.error.page.button.title') || buttonText}
        </Button>
      </ContentStyled>
    </WrapperStyled>
  );
};

export default Error;
