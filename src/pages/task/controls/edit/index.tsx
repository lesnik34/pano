import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FieldValues, useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

import { parseTaskData } from '@pages/task/utils/common';
import { useUpdateTaskMutation } from '@api/query/tasks';
import { Button } from '@nextui-org/react';
import { EditTaskI } from '@api/types';
import Delete from './delete';

interface EditI {
  data: EditTaskI;
  setEditMode: (value: boolean) => void;
}

const Edit: React.FC<EditI> = ({ data, setEditMode }) => {
  const { t } = useTranslation();
  const { handleSubmit } = useFormContext();
  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  const onTaskSave = useCallback(
    async (editedData: FieldValues) => {
      const result = await updateTask({ ...data, ...parseTaskData(editedData) });

      if (result.data) {
        toast.success(t('edit.success.message'));
        setEditMode(false);
      }

      if (result.error) {
        toast.error(t('default.error.page.description'));
      }
    },
    [data, setEditMode, t, updateTask],
  );

  const onCancelClick = useCallback(() => {
    setEditMode(false);
  }, [setEditMode]);

  return (
    <>
      <Delete id={data?.id} isDisabled={isLoading} />

      <Button
        onPress={onCancelClick}
        className="mb-2.5 mt-2.5"
        isDisabled={isLoading}
        variant="bordered"
        fullWidth
        size="lg"
      >
        {t('cancel.text')}
      </Button>

      <Button
        className="text-white"
        onPress={(e) => handleSubmit(onTaskSave)(e as unknown as React.BaseSyntheticEvent)}
        isDisabled={isLoading}
        color="success"
        variant="solid"
        fullWidth
        size="lg"
      >
        {t('save.text')}
      </Button>
    </>
  );
};

export default Edit;
