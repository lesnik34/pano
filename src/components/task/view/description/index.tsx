import React from 'react';

import { DescriptionStyled, WrapperStyled } from './description.styled';

interface DescriptionI {
  text: string;
}

const Description: React.FC<DescriptionI> = ({ text }) => (
  <WrapperStyled>
    <DescriptionStyled>{text}</DescriptionStyled>
  </WrapperStyled>
);

export default Description;
