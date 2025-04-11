import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { IoIosArrowBack } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { Button } from '@heroui/react';

import { useGetTaskQuery } from '@api/query/tasks';
import Layout from '@components/global/layout';
import { PAGE_TASKS } from '@constants/pages';
import TaskComponent from '@components/task';
import Error from '@components/error';

import { ErrorWrapperStyled, WrapperStyled } from './task.styled';
import Controls from './controls';

interface TaskI {}

const Task: React.FC<TaskI> = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const formMethods = useForm();
  const navigate = useNavigate();
  const [isEditMode, setEditMode] = useState(false);
  const { data, isFetching, isError, refetch } = useGetTaskQuery({ taskId: id });

  const isErrorVisible = isError;
  const isTaskVisible = !isError;

  const onBackClick = useCallback(() => {
    if (window.history?.length && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(PAGE_TASKS, { replace: true });
    }
  }, [navigate]);

  const errorHandler = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <Layout navHidden>
      <FormProvider {...formMethods}>
        <Button onPress={onBackClick} startContent={<IoIosArrowBack />} variant="light">
          {t('text.back')}
        </Button>

        {isTaskVisible && (
          <WrapperStyled>
            <TaskComponent title={t('edit.task.headline')} isEditMode={isEditMode} isLoading={isFetching} data={data} />

            {!isFetching && <Controls data={data} isEditMode={isEditMode} setEditMode={setEditMode} />}
          </WrapperStyled>
        )}

        {isErrorVisible && (
          <ErrorWrapperStyled>
            <Error onClick={errorHandler} />
          </ErrorWrapperStyled>
        )}
      </FormProvider>
    </Layout>
  );
};

export default Task;
