import { Button } from "@heroui/react";
import { useTranslation } from 'react-i18next';

import { ContentStyled, DescriptionStyled, TitleStyled, WrapperStyled } from './error.styled';

interface ErrorI {
  title?: string;
  isFullScreen?: boolean;
  description?: string;
  buttonText?: string;
  hideButton?: boolean;
  onClick?: () => void;
}

const Error: React.FC<ErrorI> = ({ title, description, buttonText, isFullScreen, hideButton, onClick = () => {} }) => {
  const { t } = useTranslation();

  return (
    <WrapperStyled $isFullScreen={isFullScreen}>
      <ContentStyled>
        <TitleStyled>{title || t('default.error.page.title')}</TitleStyled>

        <DescriptionStyled>{description || t('default.error.page.description')}</DescriptionStyled>

        {!hideButton && (
          <Button color="primary" onPress={onClick}>
            {t('default.error.page.button.title') || buttonText}
          </Button>
        )}
      </ContentStyled>
    </WrapperStyled>
  );
};

export default Error;
