import React, { useCallback, useMemo } from 'react';
import { User } from '@heroui/react';

import { useGetUsersQuery } from '@api/query/users';
import { ROLE_RESTRICTIONS } from '@constants/restrictions';
import SkeletonUserList from '@components/skeleton/user-list';

import {
  ButtonItemStyled,
  ListItemStyled,
  ListStyled,
  ManagerCheckStyled,
  ManagerIconStyled,
  WrapperStyled,
} from './users.styled';

interface UsersI {
  department: string;
}

const Users: React.FC<UsersI> = ({ department }) => {
  const { data, isFetching } = useGetUsersQuery({ page: 1, department, size: 100 });

  const isDataVisible = !isFetching;
  const getName = useCallback((firstName?: string, lastName?: string) => `${lastName ?? ''} ${firstName ?? ''}`, []);

  const managers = useMemo(
    () =>
      data?.content?.filter((element) => {
        const managerElement = element.roles.find(
          (el) => el.department.id === department && ROLE_RESTRICTIONS.structure.main.includes(el.role.name),
        );

        return Boolean(managerElement);
      }),
    [data?.content, department],
  );

  const commons = useMemo(
    () =>
      data?.content?.filter((element) => {
        const managerElement = element.roles.find(
          (el) => el.department.id === department && ROLE_RESTRICTIONS.structure.common.includes(el.role.name),
        );

        return Boolean(managerElement);
      }),
    [data?.content, department],
  );

  return (
    <WrapperStyled>
      {isDataVisible && (
        <ListStyled>
          {managers?.map((el) => (
            <ListItemStyled key={el.id}>
              <ButtonItemStyled variant="light" radius="md" fullWidth>
                <ManagerCheckStyled>
                  <ManagerIconStyled width={10} height={10} />
                </ManagerCheckStyled>

                <User
                  description={
                    // <Link isExternal href={`${TELEGRAM_PROFILE_LINK}/${el.username}`} size="sm">
                    `@${el.username}`
                    // </Link>
                  }
                  name={getName(el.firstName, el.lastName)}
                />
              </ButtonItemStyled>
            </ListItemStyled>
          ))}

          {commons?.map((el) => (
            <ListItemStyled key={el.id}>
              <ButtonItemStyled variant="light" radius="md" fullWidth>
                <User
                  description={
                    // <Link isExternal href={`${TELEGRAM_PROFILE_LINK}/${el.username}`} size="sm">
                    `@${el.username}`
                    // </Link>
                  }
                  name={getName(el.firstName, el.lastName)}
                />
              </ButtonItemStyled>
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
