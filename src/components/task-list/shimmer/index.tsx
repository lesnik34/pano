import React from 'react';

import {
  ButtonWrapperStyled,
  DateStyled,
  DescriptionStyled,
  TitleStyled,
  FooterStyled,
  ButtonStatusStyled,
  HeaderStyled,
} from './shimmer.styled';

const TaskShimmer: React.FC = () => (
  <ButtonWrapperStyled variant="flat">
    <HeaderStyled>
      <TitleStyled />
    </HeaderStyled>

    <DescriptionStyled />

    <FooterStyled>
      <DateStyled />

      <ButtonStatusStyled />
    </FooterStyled>
  </ButtonWrapperStyled>
);

export default TaskShimmer;
