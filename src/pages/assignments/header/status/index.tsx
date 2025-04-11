import React, { Key, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { AssignmentStatus } from '@api/types';
import { ASSIGNMENTS_PARAMS } from '@constants/pages';
import { Tab, Tabs } from '@heroui/react';
import selectors from '@store/selectors';
import Stub from './stub';

interface StatusI {
  isLoading?: boolean;
}

const statusKeys = {
  actual: 'actual',
  archive: 'archive',
};

const Status: React.FC<StatusI> = ({ isLoading }) => {
  const { t } = useTranslation();
  const { statuses } = useSelector(selectors.assignments.params);
  const setSearchParams = useSearchParams()[1];

  const [currentStatus, setCurrentStatus] = useState<string>();
  const [inactiveTabs, setInactiveTabs] = useState<boolean>(false);

  const onTabClick = useCallback((selection: Key) => {
    setCurrentStatus(selection as string);
  }, []);

  const onStubClick = useCallback((status: string) => {
    setInactiveTabs(false);
    setCurrentStatus(status);
  }, []);

  useEffect(() => {
    if (inactiveTabs) {
      return;
    }

    if (currentStatus === statusKeys.actual) {
      setSearchParams((params) => {
        params.set(ASSIGNMENTS_PARAMS.page, '1');
        params.set(ASSIGNMENTS_PARAMS.status, String([AssignmentStatus.inProgress, AssignmentStatus.toDo]));
        return params;
      });
    }

    if (currentStatus === statusKeys.archive) {
      setSearchParams((params) => {
        params.set(ASSIGNMENTS_PARAMS.page, '1');
        params.set(ASSIGNMENTS_PARAMS.status, String([AssignmentStatus.canceled, AssignmentStatus.done]));
        return params;
      });
    }
  }, [currentStatus, inactiveTabs]);

  useEffect(() => {
    if (statuses.length !== 2) {
      setInactiveTabs(true);
      return;
    }

    if (statuses.includes(AssignmentStatus.inProgress) && statuses.includes(AssignmentStatus.toDo)) {
      setCurrentStatus(statusKeys.actual);
      setInactiveTabs(false);
      return;
    }

    if (statuses.includes(AssignmentStatus.canceled) && statuses.includes(AssignmentStatus.done)) {
      setCurrentStatus(statusKeys.archive);
      setInactiveTabs(false);
      return;
    }

    setInactiveTabs(true);
  }, [statuses]);

  return inactiveTabs ? (
    <Stub setCurrentStatus={onStubClick} statusKeys={statusKeys} isLoading={isLoading} />
  ) : (
    <Tabs
      isDisabled={isLoading}
      onSelectionChange={onTabClick}
      selectedKey={currentStatus}
      variant="light"
      size="md"
      color="primary"
      radius="full"
    >
      <Tab key={statusKeys.actual} title={t('assignments.status.active')} />
      <Tab key={statusKeys.archive} title={t('assignments.status.archive')} />
    </Tabs>
  );
};

export default Status;
