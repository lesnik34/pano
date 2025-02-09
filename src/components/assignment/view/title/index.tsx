import React from 'react';

import { TitleStyled, WrapperStyled } from './title.styled';

interface TitleI {
  text: string;
}

const Title: React.FC<TitleI> = ({ text }) => (
  <WrapperStyled>
    <TitleStyled>{text}</TitleStyled>
  </WrapperStyled>
);

export default Title;
