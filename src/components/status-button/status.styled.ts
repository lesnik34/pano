import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div``;

export const StatusesWrapper = styled.div`
  padding: 5px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StatusWrapper = styled.div`
  ${tw`text-white`}
  margin-bottom: 10px;
  width: 75vw;
  max-width: 500px;

  &:last-child {
    margin-bottom: 0px;
  }
`;
