import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

import { EditTaskI } from '@api/types';
import { useUpdateTaskMutation } from '@api/query/tasks';
import { Button } from '@nextui-org/react';
import Delete from './delete';

interface EditI {
  data?: EditTaskI;
  setEditMode: (value: boolean) => void;
}

const Edit: React.FC<EditI> = ({ data, setEditMode }) => {
  const { t } = useTranslation();
  const { getValues } = useFormContext();
  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  const onTaskSave = useCallback(async () => {
    if (!data) {
      return;
    }

    const editedData = getValues();
    const result = await updateTask({ ...data, ...editedData });

    if (result.data) {
      toast.success(t('edit.success.message'));
      setEditMode(false);
    }

    if (result.error) {
      toast.error(t('default.error.page.description'));
    }
  }, [data, getValues, setEditMode, t, updateTask]);

  const onCancelClick = useCallback(() => {
    setEditMode(false);
  }, [setEditMode]);

  return (
    <>
      <Delete id={data?.id} isDisabled={isLoading} />

      <Button
        onClick={onCancelClick}
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
        onClick={onTaskSave}
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
