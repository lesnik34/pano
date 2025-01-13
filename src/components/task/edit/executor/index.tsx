import React, { Key, useCallback, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Autocomplete, AutocompleteItem, User } from '@nextui-org/react';
import { useGetUsersQuery } from '@api/query/users';
import { DEBOUNCE_TIME } from '@constants/common';
import { UserI } from '@api/types';

import { WrapperStyled } from './executor.styled';

interface ExecutorI {
  user?: UserI;
  isLoading?: boolean;
}

const fieldId = 'executor';

const Executor: React.FC<ExecutorI> = ({ user, isLoading }) => {
  const { t } = useTranslation();
  const timeoutRef = useRef<NodeJS.Timeout | null>();
  const [selectedUser, setSelectedUser] = useState(user);
  const [inputValue, setInputValue] = useState(user ? `${user.firstName} ${user.lastName}` : '');
  const [search, setSearch] = useState('');
  const { data, isFetching } = useGetUsersQuery({ search, page: 1 });
  const {
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const formError = errors[fieldId];

  register(fieldId, { required: t('required.message') });

  const onSelectionChange = useCallback(
    (key: Key | null) => {
      const selected = data?.content.find((item) => String(item.id) === String(key));

      if (key && selected) {
        setSelectedUser(selected);
        setInputValue(`${selected.firstName} ${selected.lastName}`);
        return;
      }

      setSelectedUser(undefined);
    },
    [data?.content],
  );

  useEffect(() => {
    setValue(fieldId, selectedUser?.id);

    if (selectedUser && formError) {
      clearErrors(fieldId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setSearch(inputValue);
    }, DEBOUNCE_TIME);
  }, [inputValue]);

  return (
    <WrapperStyled>
      <Autocomplete
        placeholder={t('async.input.placeholder')}
        isLoading={isFetching || isLoading}
        label={t('input.executor.label')}
        items={data?.content}
        inputValue={inputValue}
        onInputChange={setInputValue}
        defaultSelectedKey={user?.id}
        defaultItems={user ? [user] : []}
        selectedKey={selectedUser?.id}
        onSelectionChange={onSelectionChange}
        isInvalid={Boolean(formError)}
        errorMessage={formError?.message as string | undefined}
        isClearable={false}
        popoverProps={{
          shouldBlockScroll: true,
        }}
        isRequired
      >
        {(possibleUser) => {
          const name = `${possibleUser.firstName} ${possibleUser.lastName}`;
          return (
            <AutocompleteItem textValue={name} key={possibleUser.id}>
              <User name={name} description={possibleUser.username} />
            </AutocompleteItem>
          );
        }}
      </Autocomplete>
    </WrapperStyled>
  );
};

export default Executor;
