import { AssignmentStatus } from '@api/types';
import { ASSIGNMENTS_PARAMS } from '@constants/pages';
import { Tab, Tabs } from '@heroui/react';
import React, { Key, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

interface StatusI {
  isLoading?: boolean;
}

const statusKeys = {
  actual: 'actual',
  archive: 'archive',
};

const Status: React.FC<StatusI> = ({ isLoading }) => {
  const { t } = useTranslation();
  const setSearchParams = useSearchParams()[1];
  const [currentStatus, setCurrentStatus] = useState(statusKeys.actual);

  const onTabClick = useCallback((selection: Key) => {
    setCurrentStatus(selection as string);
  }, []);

  useEffect(() => {
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
  }, [currentStatus]);

  return (
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
