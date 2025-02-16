import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import AsyncInputDrawer from '@components/async-input-drawer';
import { Input, useDisclosure } from '@heroui/react';
import { useGetUsersQuery } from '@api/query/users';
import { DepartmentI, UserI } from '@api/types';

import { WrapperStyled } from './executor.styled';

interface ExecutorI {
  user?: UserI;
  department?: DepartmentI;
  isLoading?: boolean;
}

const fieldId = 'executor';

const Executor: React.FC<ExecutorI> = ({ user, department, isLoading }) => {
  const { t } = useTranslation();
  const userInputRef = useRef<HTMLInputElement | null>(null);

  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onOpenChange: onDrawerOpenChange } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(user);
  const [search, setSearch] = useState('');

  const { data, isFetching } = useGetUsersQuery({ search, page: 1, department: department?.id });
  const {
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const formError = errors[fieldId];
  const inputValue = selectedUser ? `${selectedUser?.lastName} ${selectedUser?.firstName}` : '';
  const searchedItems = useMemo(
    () => data?.content.map((el) => ({ id: String(el.id), title: `${el.lastName || ''} ${el.firstName || ''}` })),
    [data?.content],
  );
  register(fieldId, { required: t('required.message') });

  const onExecutorClick = useCallback(
    (item: { id: string }) => () => {
      const currentExecutor = data?.content.find((el) => String(el.id) === item.id);
      console.log(item, currentExecutor);

      onDrawerOpenChange();
      setSelectedUser(currentExecutor);
    },
    [data?.content, onDrawerOpenChange],
  );

  const onFocusInput = useCallback(() => {
    onDrawerOpen();
    userInputRef.current?.blur();
  }, [onDrawerOpen]);

  useEffect(() => {
    setValue(fieldId, selectedUser);

    if (selectedUser && formError) {
      clearErrors(fieldId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

  useEffect(() => {
    setSelectedUser(undefined);
    setValue(fieldId, undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [department]);

  return (
    <WrapperStyled>
      <Input
        ref={userInputRef}
        label={t('input.executor.label')}
        errorMessage={formError?.message as string | undefined}
        onClick={onDrawerOpen}
        onFocus={onFocusInput}
        value={inputValue}
        isInvalid={Boolean(formError)}
        isRequired
      />

      <AsyncInputDrawer
        isOpen={isDrawerOpen}
        onOpenChange={onDrawerOpenChange}
        title={t('executor.search.title')}
        inputPlaceholder={t('async.input.user.placeholder')}
        isLoading={isLoading || isFetching}
        searchedItems={searchedItems}
        onItemClick={onExecutorClick}
        setSearch={setSearch}
      />
    </WrapperStyled>
  );
};

export default Executor;
