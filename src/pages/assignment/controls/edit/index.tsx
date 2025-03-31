import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FieldValues, useFormContext } from 'react-hook-form';
import { addToast, Button } from '@heroui/react';

import { parseAssignmentData } from '@pages/assignment/utils/common';
import { useUpdateAssignmentMutation } from '@api/query/assignments';
import { EditAssignmentI } from '@api/types';
import Delete from './delete';

interface EditI {
  data: EditAssignmentI;
  setEditMode: (value: boolean) => void;
}

const Edit: React.FC<EditI> = ({ data, setEditMode }) => {
  const { t } = useTranslation();
  const { handleSubmit } = useFormContext();
  const [updateAssignment, { isLoading }] = useUpdateAssignmentMutation();

  const onAssignmentSave = useCallback(
    async (editedData: FieldValues) => {
      const result = await updateAssignment({ ...data, ...parseAssignmentData(editedData) });

      if (result.data) {
        addToast({
          description: t('edit.success.message'),
          color: 'success',
        });
        setEditMode(false);
      }

      if (result.error) {
        addToast({
          description: t('default.error.page.description'),
          color: 'danger',
        });
      }
    },
    [data, setEditMode, t, updateAssignment],
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
        onPress={(e) => handleSubmit(onAssignmentSave)(e as unknown as React.BaseSyntheticEvent)}
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
