import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { IoSaveOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { NewTaskI, TaskI } from '@api/types';
import { useCreateTaskMutation } from '@api/query/tasks';
import { PAGE_TASKS } from '@constants/pages';
import { Button } from '@nextui-org/react';
import { Wrapper } from './controls.styled';

interface ControlsI {
  data?: TaskI | NewTaskI;
}

const Controls: React.FC<ControlsI> = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getValues } = useFormContext();
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const onTaskSave = useCallback(async () => {
    if (!data) {
      return;
    }

    const editedData = getValues();
    const result = await createTask({ ...data, ...editedData });

    if (result.data) {
      toast.success(t('edit.success.message'));
      navigate(`${PAGE_TASKS}/${result.data.id}`);
    }

    if (result.error) {
      toast.error(t('default.error.page.title'));
    }
  }, [data, getValues, createTask, t, navigate]);

  return (
    <Wrapper>
      <Button
        className="text-white"
        onClick={onTaskSave}
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
