import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import Layout from '@components/global/layout';
import TaskComponent from '@components/task';
import { EMPTY_TASK } from '@constants/common';
import { Button } from '@nextui-org/react';
import { IoIosArrowBack } from 'react-icons/io';
import { PAGE_TASKS } from '@constants/pages';
import { useNavigate } from 'react-router-dom';
import selectors from '@store/selectors';
import { useAppSelector } from '@store/store';

import { WrapperStyled } from './new-task.styled';
import Controls from './controls';

const NewTask = () => {
  const userId = useAppSelector(selectors.auth.userId);
  const { t } = useTranslation();
  const formMethods = useForm();
  const navigate = useNavigate();

  const onBackClick = useCallback(() => {
    navigate(PAGE_TASKS);
  }, [navigate]);

  return (
    <Layout navHidden>
      <FormProvider {...formMethods}>
        <Button onPress={onBackClick} startContent={<IoIosArrowBack />} variant="light">
          {t('move.to.tasks')}
        </Button>

        <WrapperStyled>
          <TaskComponent title={t('create.task.headline')} isEditMode />

          <Controls data={{ ...EMPTY_TASK, creator: userId }} />
        </WrapperStyled>
      </FormProvider>
    </Layout>
  );
};

export default NewTask;
