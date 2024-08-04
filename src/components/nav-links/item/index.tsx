import React from 'react';
import { IconType } from 'react-icons';
import useCurrentPath from '@hooks/use-current-path';

import { IconWrapperStyled, TextStyled, ButtonStyled, ButtonWrapperStyled } from './item.styled';

interface ItemI {
  title: string;
  url: string;
  icon: IconType;
}

const Item: React.FC<ItemI> = ({ title, url, icon }) => {
  const { isPathMatch } = useCurrentPath(url);
  console.log(isPathMatch, url);
  const Icon = icon;

  return (
    <ButtonWrapperStyled $isActive={isPathMatch}>
      <ButtonStyled
        variant={isPathMatch ? 'solid' : 'flat'}
        color="default"
        startContent={
          <IconWrapperStyled>
            <Icon size={18} />
          </IconWrapperStyled>
        }
      >
        <TextStyled $isActive={isPathMatch}>{title}</TextStyled>
      </ButtonStyled>
    </ButtonWrapperStyled>
  );
};

export default Item;
