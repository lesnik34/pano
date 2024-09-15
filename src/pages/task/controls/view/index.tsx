import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@nextui-org/react';
import { MdEdit } from 'react-icons/md';

import { useUpdateTaskMutation } from '@api/query/tasks';
import StatusButton from '@components/status-button';
import { TASK_STATUSES } from '@constants/common';
import { TaskI, TaskStatus } from '@api/types';

interface ViewI {
  data?: TaskI;
  setEditMode: (value: boolean) => void;
}

const View: React.FC<ViewI> = ({ data, setEditMode }) => {
  const { t } = useTranslation();
  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  const availableStatuses = useMemo(() => TASK_STATUSES.filter((el) => el !== data?.status), [data?.status]);

  const onEditClick = useCallback(() => {
    setEditMode(true);
  }, [setEditMode]);

  const onStatusChange = useCallback(
    (status: TaskStatus) => {
      if (!data) {
        return;
      }

      updateTask({ ...data, status });
    },
    [data, updateTask],
  );

  return (
    <>
      <Button
        onClick={onEditClick}
        className="mb-2.5"
        endContent={<MdEdit />}
        isDisabled={isLoading}
        color="primary"
        variant="light"
        fullWidth
        size="lg"
      >
        {t('edit.button.text')}
      </Button>

      <StatusButton
        isLoading={isLoading}
        status={data?.status}
        onClick={onStatusChange}
        availableStatuses={availableStatuses as Array<TaskStatus>}
      />
    </>
  );
};

export default View;
