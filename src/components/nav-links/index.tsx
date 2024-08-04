import { NAV_LINKS } from '@constants/pages';

import Item from './item';
import { ItemWrapperStyled, ScrollWrapperStyled } from './nav.styled';

const NavLinks = () => (
  <ScrollWrapperStyled hideScrollBar orientation="horizontal">
    {NAV_LINKS.map((link) => (
      <ItemWrapperStyled key={link.title}>
        <Item title={link.title} url={link.url} icon={link.icon} />
      </ItemWrapperStyled>
    ))}
  </ScrollWrapperStyled>
);

export default NavLinks;
