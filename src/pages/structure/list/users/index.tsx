import React, { useCallback } from 'react';
import { Button, User } from '@heroui/react';

import { useGetUsersQuery } from '@api/query/users';
import SkeletonUserList from '@components/skeleton/user-list';

import { ListItemStyled, ListStyled, WrapperStyled } from './users.styled';

interface UsersI {
  department: string;
}

const Users: React.FC<UsersI> = ({ department }) => {
  const { data, isFetching } = useGetUsersQuery({ page: 1, department, size: 100 });

  const isDataVisible = !isFetching;
  const getName = useCallback((firstName?: string, lastName?: string) => `${lastName ?? ''} ${firstName ?? ''}`, []);

  return (
    <WrapperStyled>
      {isDataVisible && (
        <ListStyled>
          {data?.content.map((el) => (
            <ListItemStyled key={el.id}>
              <Button variant="light" radius="md" fullWidth className="py-[6px] px-[8px] h-auto justify-start">
                <User description={el.username} name={getName(el.firstName, el.lastName)} />
              </Button>
            </ListItemStyled>
          ))}
        </ListStyled>
      )}

      {isFetching && (
        <div className="px-[10px]">
          <SkeletonUserList />
        </div>
      )}
    </WrapperStyled>
  );
};

export default Users;
