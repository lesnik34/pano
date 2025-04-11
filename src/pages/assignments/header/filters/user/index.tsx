import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Input, useDisclosure } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { IoMdClose } from 'react-icons/io';

import { useGetUserByIdQuery, useGetUsersQuery } from '@api/query/users';
import AsyncInputDrawer from '@components/async-input-drawer';
import { VIEWED_SELF } from '@constants/pages';
import { useAppSelector } from '@store/store';
import selectors from '@store/selectors';

import { WrapperStyled } from './user.styled';

interface UserComponentI {
  viewedUser: string;
  setViewedUser: (user: string) => void;
}

const UserComponent: React.FC<UserComponentI> = ({ viewedUser, setViewedUser }) => {
  const { t } = useTranslation();
  const userInputRef = useRef<HTMLInputElement | null>(null);
  const assignmentsViewedUser = useAppSelector(selectors.assignments.user);

  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onOpenChange: onDrawerOpenChange, onClose } = useDisclosure();
  const [search, setSearch] = useState('');

  const { data, isFetching } = useGetUsersQuery({ search, page: 1 });
  const { data: userData, isFetching: isUserFetching } = useGetUserByIdQuery(viewedUser, {
    skip: viewedUser === VIEWED_SELF,
  });

  const searchedItems = useMemo(
    () => data?.content.map((el) => ({ id: String(el.id), title: `${el.lastName || ''} ${el.firstName || ''}` })),
    [data?.content],
  );

  const inputValue = useMemo(() => {
    if (isUserFetching) {
      return t('default.loader.label');
    }

    if (viewedUser === VIEWED_SELF) {
      return '';
    }

    return userData ? `${userData?.lastName} ${userData?.firstName}` : '';
  }, [isUserFetching, t, userData, viewedUser]);

  const onUserClick = useCallback(
    (item: { id: string }) => () => {
      onClose();
      setViewedUser(item.id);
    },
    [onClose, setViewedUser],
  );

  const onFocusInput = useCallback(() => {
    onDrawerOpen();
    userInputRef.current?.blur();
  }, [onDrawerOpen]);

  const onClearClick = useCallback(() => {
    setViewedUser(VIEWED_SELF);
  }, [setViewedUser]);

  useEffect(() => {
    setViewedUser(assignmentsViewedUser);

    return () => {
      setViewedUser(assignmentsViewedUser);
    };
  }, []);

  return (
    <WrapperStyled>
      <span className="text-medium text-foreground-500 mb-2 block">{t('filter.user.text')}</span>

      <div className="relative">
        <Input
          ref={userInputRef}
          label={t('choose.text')}
          onClick={onDrawerOpen}
          onFocus={onFocusInput}
          value={inputValue}
        />

        {viewedUser && (
          <Button onPress={onClearClick} isIconOnly className="absolute top-3.5 right-2.5 w-7 h-7 min-w-7">
            <IoMdClose />
          </Button>
        )}
      </div>

      <AsyncInputDrawer
        isOpen={isDrawerOpen}
        onOpenChange={onDrawerOpenChange}
        title={t('search.user')}
        inputPlaceholder={t('async.input.user.placeholder')}
        isLoading={isFetching || isUserFetching}
        searchedItems={searchedItems}
        onItemClick={onUserClick}
        setSearch={setSearch}
      />
    </WrapperStyled>
  );
};

export default UserComponent;
