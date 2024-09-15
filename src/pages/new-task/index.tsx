import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import Layout from '@components/global/layout';
import TaskComponent from '@components/task';
import { EMPTY_TASK } from '@constants/common';

import { WrapperStyled } from './new-task.styled';
import Controls from './controls';

const NewTask = () => {
  const { t } = useTranslation();
  const formMethods = useForm();

  return (
    <Layout navHidden>
      <FormProvider {...formMethods}>
        <WrapperStyled>
          <TaskComponent title={t('create.task.headline')} isEditMode />

          <Controls data={EMPTY_TASK} />
        </WrapperStyled>
      </FormProvider>
    </Layout>
  );
};

export default NewTask;
