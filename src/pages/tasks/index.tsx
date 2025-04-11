import { useCallback, useMemo } from 'react';

import { useGetTasksQuery } from '@api/query/tasks';
import Pagination from '@components/pagination';
import Layout from '@components/global/layout';
import { VIEWED_SELF } from '@constants/pages';
import { useAppSelector } from '@store/store';
import TaskList from '@components/task-list';
import selectors from '@store/selectors';
import Error from '@components/error';

import withTaskParams, { TaskParamsComponentI } from './hoc/with-task-params';
import Elevation from './elevation';
import Header from './header';
import Target from './target';

import { ErrorWrapperStyled, WrapperStyled } from './tasks.styled';

interface TasksI extends TaskParamsComponentI {}

const Tasks: React.FC<TasksI> = ({ params }) => {
  const userId = useAppSelector(selectors.auth.userId);

  const currentQueries = useMemo(() => {
    const currentUser = params.user === VIEWED_SELF ? userId : params.user;

    return {
      page: params.page,
      statuses: params.statuses,
      [params.view]: currentUser,
    };
  }, [params.page, params.statuses, params.user, params.view, userId]);

  const { data, isFetching, isError, refetch } = useGetTasksQuery(currentQueries);
  const { content, totalPages } = data || {};

  const isTaskListVisible = !isError;
  const isErrorVisible = isError;

  const errorHandler = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <Layout>
      {isTaskListVisible && (
        <WrapperStyled>
          <Target isLoading={isFetching} />

          <Header isLoading={isFetching} />

          <TaskList items={content} isLoading={isFetching} />

          <Elevation isLoading={isFetching} />

          <Pagination totalPages={totalPages} currentPage={params.page} />
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

export default withTaskParams(Tasks);
