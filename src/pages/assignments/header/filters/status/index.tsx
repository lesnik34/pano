import React, { useCallback, useEffect } from 'react';
import { Checkbox, CheckboxGroup } from '@heroui/react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@store/store';
import { TaskStatus } from '@api/types';
import selectors from '@store/selectors';

interface StatusI {
  setCurrentStatus: (argument: Array<string>) => void;
  currentStatus: string[];
}

const Status: React.FC<StatusI> = ({ setCurrentStatus, currentStatus }) => {
  const { t } = useTranslation();
  const assignmentsStoreParams = useAppSelector(selectors.assignments.params);

  const onChange = useCallback(
    (statuses: Array<string>) => {
      if (statuses.length !== 0) {
        setCurrentStatus(statuses.sort());
      }
    },
    [setCurrentStatus],
  );

  useEffect(() => {
    setCurrentStatus(assignmentsStoreParams.statuses);

    return () => {
      setCurrentStatus(assignmentsStoreParams.statuses);
    };
  }, []);

  return (
    <CheckboxGroup label={t('filter.status.text')} onValueChange={onChange} value={currentStatus}>
      <Checkbox value={TaskStatus.done}>{t('task.status.done')}</Checkbox>

      <Checkbox value={TaskStatus.toDo}>{t('task.status.to.do')}</Checkbox>

      <Checkbox value={TaskStatus.inProgress}>{t('task.status.in.progress')}</Checkbox>

      <Checkbox value={TaskStatus.canceled}>{t('task.status.canceled')}</Checkbox>
    </CheckboxGroup>
  );
};

export default Status;
