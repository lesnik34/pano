import React from 'react';
import { Accordion, AccordionItem, ScrollShadow } from '@heroui/react';

import { DepartmentI } from '@api/types';
import Users from './users';

import { WrapperStyled } from './list.styled';

interface ListI {
  data?: DepartmentI[];
}

const List: React.FC<ListI> = ({ data }) => (
  <WrapperStyled>
    <Accordion variant="splitted">
      {(data ?? []).map((el) => (
        <AccordionItem className="bg-default-100" key={el.id} title={el.title} subtitle={el.description}>
          <ScrollShadow className="max-h-[600px]">
            <Users department={el.id} />
          </ScrollShadow>
        </AccordionItem>
      ))}
    </Accordion>
  </WrapperStyled>
);

export default List;
