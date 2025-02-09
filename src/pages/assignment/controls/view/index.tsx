import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@heroui/react';
import { MdEdit } from 'react-icons/md';

import { useUpdateAssignmentStatusMutation } from '@api/query/assignments';
import StatusButton from '@components/status-button';
import { ASSIGNMENT_STATUSES } from '@constants/common';
import { AssignmentI, AssignmentStatus } from '@api/types';

interface ViewI {
  data?: AssignmentI;
  setEditMode: (value: boolean) => void;
}

const View: React.FC<ViewI> = ({ data, setEditMode }) => {
  const { t } = useTranslation();
  const [updateAssignment, { isLoading }] = useUpdateAssignmentStatusMutation();
  const availableStatuses = useMemo(() => ASSIGNMENT_STATUSES.filter((el) => el !== data?.status), [data?.status]);

  const onEditClick = useCallback(() => {
    setEditMode(true);
  }, [setEditMode]);

  const onStatusChange = useCallback(
    (status: AssignmentStatus) => {
      if (!data) {
        return;
      }

      updateAssignment({ status, id: data.id });
    },
    [data, updateAssignment],
  ) as (status: string) => void;

  return (
    <>
      <Button
        onPress={onEditClick}
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
        availableStatuses={availableStatuses as Array<AssignmentStatus>}
      />
    </>
  );
};

export default View;
