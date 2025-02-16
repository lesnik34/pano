import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Input, useDisclosure } from '@heroui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetDepartmentsQuery } from '@api/query/departments';
import AsyncInputDrawer from '@components/async-input-drawer';
import { DepartmentI } from '@api/types';

import { WrapperStyled } from './department.styled';

interface DepartmentComponentI {
  department?: DepartmentI;
  isLoading?: boolean;
}

const fieldId = 'department';

const Department: React.FC<DepartmentComponentI> = ({ department, isLoading }) => {
  const { t } = useTranslation();
  const departmentInputRef = useRef<HTMLInputElement | null>(null);

  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onOpenChange: onDrawerOpenChange } = useDisclosure();
  const [selectedDepartment, setSelectedDepartment] = useState(department);
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

  const onDepartmentClick = useCallback(
    (item: DepartmentI) => () => {
      onDrawerOpenChange();
      setSelectedDepartment(item);
    },
    [onDrawerOpenChange],
  );

  const onFocusInput = useCallback(() => {
    onDrawerOpen();
    departmentInputRef.current?.blur();
  }, [onDrawerOpen]);

  useEffect(() => {
    setValue(fieldId, selectedDepartment);

    if (selectedDepartment && formError) {
      clearErrors(fieldId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDepartment]);

  return (
    <WrapperStyled>
      <Input
        ref={departmentInputRef}
        label={t('input.department.label')}
        errorMessage={formError?.message as string | undefined}
        onClick={onDrawerOpen}
        onFocus={onFocusInput}
        value={selectedDepartment?.title}
        isInvalid={Boolean(formError)}
        isRequired
      />

      <AsyncInputDrawer
        isOpen={isDrawerOpen}
        onOpenChange={onDrawerOpenChange}
        title={t('department.search.title')}
        inputPlaceholder={t('async.input.department.placeholder')}
        isLoading={isLoading || isFetching}
        searchedItems={data?.content}
        onItemClick={onDepartmentClick}
        setSearch={setSearch}
      />
    </WrapperStyled>
  );
};

export default Department;
