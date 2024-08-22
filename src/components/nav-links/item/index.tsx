import React, { useCallback, useEffect, useRef } from 'react';
import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';
import useCurrentPath from '@hooks/use-current-path';

import { IconWrapperStyled, TextStyled, ButtonStyled, ButtonWrapperStyled } from './item.styled';

interface ItemI {
  title: string;
  url: string;
  icon: IconType;
}

const Item: React.FC<ItemI> = ({ title, url, icon }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isPathMatch } = useCurrentPath(url);
  const Icon = icon;

  const onClick = useCallback(() => {
    if (url) {
      navigate(url);
    }
  }, [navigate, url]);

  useEffect(() => {
    if (isPathMatch && wrapperRef.current) {
      wrapperRef.current.scrollIntoView({ inline: 'center', behavior: 'smooth' });
    }
  }, [isPathMatch]);

  return (
    <ButtonWrapperStyled ref={wrapperRef} $isActive={isPathMatch}>
      <ButtonStyled
        onClick={onClick}
        variant="flat"
        color={isPathMatch ? 'primary' : 'default'}
        startContent={
          <IconWrapperStyled $isActive={isPathMatch}>
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
