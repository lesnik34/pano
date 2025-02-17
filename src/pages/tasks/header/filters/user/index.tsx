import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Input, useDisclosure } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { IoMdClose } from 'react-icons/io';

import AsyncInputDrawer from '@components/async-input-drawer';
import { useGetUsersQuery } from '@api/query/users';
import { useAppSelector } from '@store/store';
import selectors from '@store/selectors';
import { UserI } from '@api/types';

import { WrapperStyled } from './user.styled';

interface UserComponentI {
  viewedUser?: UserI;
  setViewedUser: (user: UserI | undefined) => void;
}

const UserComponent: React.FC<UserComponentI> = ({ viewedUser, setViewedUser }) => {
  const { t } = useTranslation();
  const userInputRef = useRef<HTMLInputElement | null>(null);
  const taskViewedUser = useAppSelector(selectors.tasks.viewedUser);

  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onOpenChange: onDrawerOpenChange, onClose } = useDisclosure();
  const [search, setSearch] = useState('');

  const { data, isFetching } = useGetUsersQuery({ search, page: 1 });

  const inputValue = viewedUser ? `${viewedUser?.lastName} ${viewedUser?.firstName}` : '';
  const searchedItems = useMemo(
    () => data?.content.map((el) => ({ id: String(el.id), title: `${el.lastName || ''} ${el.firstName || ''}` })),
    [data?.content],
  );

  const onUserClick = useCallback(
    (item: { id: string }) => () => {
      const currentUser = data?.content.find((el) => String(el.id) === item.id);

      onClose();
      setViewedUser(currentUser);
    },
    [data?.content, onClose, setViewedUser],
  );

  const onFocusInput = useCallback(() => {
    onDrawerOpen();
    userInputRef.current?.blur();
  }, [onDrawerOpen]);

  const onClearClick = useCallback(() => {
    setViewedUser(undefined);
  }, [setViewedUser]);

  useEffect(() => {
    setViewedUser(taskViewedUser);

    return () => {
      setViewedUser(taskViewedUser);
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
        isLoading={isFetching}
        searchedItems={searchedItems}
        onItemClick={onUserClick}
        setSearch={setSearch}
      />
    </WrapperStyled>
  );
};

export default UserComponent;
