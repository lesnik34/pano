import { Button } from '@heroui/react';
import styled from 'styled-components';
import tw from 'twin.macro';

export const WrapperStyled = styled.div``;

export const ListStyled = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItemStyled = styled.li`
  margin-bottom: 10px;

  &:last-child: {
    margin-bottom: 0;
  }
`;

export const ButtonItemStyled = styled(Button)`
  ${tw`py-[6px] px-[8px] h-auto justify-start`}

  position: relative;
`;

export const ManagerCheckStyled = styled.div`
  position: absolute;
  top: 4px;
  left: 6px;
  width: 22px;
  height: 44px;
  border-radius: 100px 0 0 100px;
  border-top: 2px solid;
  border-left: 2px solid;
  border-bottom: 2px solid;

  ${tw`border-warning-400`}
`;
