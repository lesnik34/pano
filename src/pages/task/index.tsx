import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@components/global/layout';
import Error from '@components/error';
import TaskComponent from '@components/task';
import { useGetTaskQuery } from '@api/query/tasks';

import { ErrorWrapperStyled, WrapperStyled } from './task.styled';

interface TaskI {}

const Task: React.FC<TaskI> = () => {
  const { id } = useParams();
  const { data, isFetching, isError, refetch } = useGetTaskQuery({ taskId: id });
  const {} = data || {};

  const isErrorVisible = isError;
  const isTaskVisible = !isError;

  const errorHandler = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <Layout navHidden>
      {isTaskVisible && (
        <WrapperStyled>
          <TaskComponent isLoading={isFetching} data={data} />
        </WrapperStyled>
      )}

      {isErrorVisible && (
        <ErrorWrapperStyled>
          <Error onClick={errorHandler} />
        </ErrorWrapperStyled>
      )}
    </Layout>
  );
};

export default Task;
