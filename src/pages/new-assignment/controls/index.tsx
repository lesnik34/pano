import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FieldValues, useFormContext } from 'react-hook-form';
import { IoSaveOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { addToast, Button } from '@heroui/react';

import { NewAssignmentI } from '@api/types';
import { parseAssignmentData } from '@pages/assignment/utils/common';
import { useCreateAssignmentMutation } from '@api/query/assignments';
import { PAGE_ASSIGNMENTS } from '@constants/pages';
import { Wrapper } from './controls.styled';

interface ControlsI {
  data: NewAssignmentI;
}

const Controls: React.FC<ControlsI> = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleSubmit } = useFormContext();
  const [createAssignment, { isLoading }] = useCreateAssignmentMutation();

  const onAssignmentSave = useCallback(
    async (editedData: FieldValues) => {
      const result = await createAssignment({ ...data, ...parseAssignmentData(editedData) });

      if (result.data) {
        addToast({
          description: t('edit.success.message'),
          color: 'success',
        });
        navigate(`${PAGE_ASSIGNMENTS}/${result.data.id}`);
      }

      if (result.error) {
        addToast({
          description: t('default.error.page.description'),
          color: 'danger',
        });
      }
    },
    [data, createAssignment, t, navigate],
  );

  return (
    <Wrapper>
      <Button
        className="text-white"
        onPress={(e) => handleSubmit(onAssignmentSave)(e as unknown as React.BaseSyntheticEvent)}
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
