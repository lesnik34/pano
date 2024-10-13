import React, { useCallback } from 'react';
import { Checkbox, CheckboxGroup } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@store/store';
import { TaskStatus } from '@api/types';
import selectors from '@store/selectors';

interface StatusI {
  setCurrentStatus: (argument: Array<string>) => void;
}

const Status: React.FC<StatusI> = ({ setCurrentStatus }) => {
  const { t } = useTranslation();
  const tasksStoreParams = useAppSelector(selectors.tasks.params);

  const onChange = useCallback(
    (statuses: Array<string>) => {
      setCurrentStatus(statuses);
    },
    [setCurrentStatus],
  );

  return (
    <CheckboxGroup label={t('filter.status.text')} defaultValue={tasksStoreParams.statuses} onChange={onChange}>
      <Checkbox value={TaskStatus.done}>{t('task.status.done')}</Checkbox>

      <Checkbox value={TaskStatus.toDo}>{t('task.status.to.do')}</Checkbox>

      <Checkbox value={TaskStatus.inProgress}>{t('task.status.in.progress')}</Checkbox>

      <Checkbox value={TaskStatus.canceled}>{t('task.status.canceled')}</Checkbox>
    </CheckboxGroup>
  );
};

export default Status;
