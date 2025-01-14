import React, { Key, useCallback, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { useGetDepartmentsQuery } from '@api/query/departments';
import { DEBOUNCE_TIME } from '@constants/common';
import { DepartmentI } from '@api/types';

import { WrapperStyled } from './department.styled';

interface DepartmentComponentI {
  department?: DepartmentI;
  isLoading?: boolean;
}

const fieldId = 'department';

const Department: React.FC<DepartmentComponentI> = ({ department, isLoading }) => {
  const { t } = useTranslation();
  const timeoutRef = useRef<NodeJS.Timeout | null>();
  const [selectedDepartment, setSelectedDepartment] = useState(department);
  const [inputValue, setInputValue] = useState(department?.title || '');
  const [search, setSearch] = useState('');
  const { data, isFetching } = useGetDepartmentsQuery({ search, page: 1 });
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
        setSelectedDepartment(selected);
        setInputValue(selected.title);
        return;
      }

      setSelectedDepartment(undefined);
    },
    [data?.content],
  );

  useEffect(() => {
    setValue(fieldId, selectedDepartment);

    if (selectedDepartment && formError) {
      clearErrors(fieldId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDepartment]);

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
        placeholder={t('async.input.department.placeholder')}
        isLoading={isFetching || isLoading}
        label={t('input.department.label')}
        items={data?.content}
        inputValue={inputValue}
        onInputChange={setInputValue}
        defaultSelectedKey={department?.id}
        defaultItems={department ? [department] : []}
        selectedKey={department?.id}
        onSelectionChange={onSelectionChange}
        isInvalid={Boolean(formError)}
        errorMessage={formError?.message as string | undefined}
        isClearable={false}
        popoverProps={{
          shouldBlockScroll: true,
        }}
        listboxProps={{
          emptyContent: t('async.input.empty.message'),
        }}
        isRequired
      >
        {(possibleDepartment) => (
          <AutocompleteItem key={possibleDepartment.id}>{possibleDepartment.title}</AutocompleteItem>
        )}
      </Autocomplete>
    </WrapperStyled>
  );
};

export default Department;
