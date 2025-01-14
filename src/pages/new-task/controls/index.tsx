import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FieldValues, useFormContext } from 'react-hook-form';
import { IoSaveOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { NewTaskI } from '@api/types';
import { parseTaskData } from '@pages/task/utils/common';
import { useCreateTaskMutation } from '@api/query/tasks';
import { PAGE_TASKS } from '@constants/pages';
import { Button } from '@nextui-org/react';
import { Wrapper } from './controls.styled';

interface ControlsI {
  data: NewTaskI;
}

const Controls: React.FC<ControlsI> = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleSubmit } = useFormContext();
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const onTaskSave = useCallback(
    async (editedData: FieldValues) => {
      const result = await createTask({ ...data, ...parseTaskData(editedData) });

      if (result.data) {
        toast.success(t('edit.success.message'));
        navigate(`${PAGE_TASKS}/${result.data.id}`);
      }

      if (result.error) {
        toast.error(t('default.error.page.description'));
      }
    },
    [data, createTask, t, navigate],
  );

  return (
    <Wrapper>
      <Button
        className="text-white"
        onPress={(e) => handleSubmit(onTaskSave)(e as unknown as React.BaseSyntheticEvent)}
        endContent={<IoSaveOutline />}
        isDisabled={isLoading}
        color="success"
        variant="solid"
        fullWidth
        size="lg"
      >
        {t('save.text')}
      </Button>
    </Wrapper>
  );
};

export default Controls;
