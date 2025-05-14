import { Button } from '@heroui/react';
import { FaStar } from 'react-icons/fa6';
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
  ${tw`py-[6px] px-[3px] h-auto justify-start`}

  position: relative;
`;

export const ManagerCheckStyled = styled.div`
  position: absolute;
  z-index: 1;
  top: 31px;
  left: 31px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${tw`bg-primary-400`}
`;

export const ManagerIconStyled = styled(FaStar)`
  margin-left: 0.4px;
  width: 11px;
  height: 11px;
`;
