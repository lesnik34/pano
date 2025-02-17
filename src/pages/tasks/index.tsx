import { useCallback, useState } from 'react';
import Layout from '@components/global/layout';
import TaskList from '@components/task-list';
import Error from '@components/error';
import Pagination from '@components/pagination';
import { useGetTasksQuery } from '@api/query/tasks';
import selectors from '@store/selectors';
import { useAppSelector } from '@store/store';

import Header from './header';
import withTaskParams, { TaskParamsComponentI } from './hoc/with-task-params';
import { ErrorWrapperStyled, WrapperStyled } from './tasks.styled';
import Target from './target';
import Elevation from './elevation';

interface TasksI extends TaskParamsComponentI {}

const Tasks: React.FC<TasksI> = ({ params }) => {
  const userId = useAppSelector(selectors.auth.userId);
  const viewedUserId = useAppSelector(selectors.tasks.viewedUser)?.id;
  const currentUserId = viewedUserId || userId;

  const [target, setTarget] = useState<{ executor?: number; creator?: number }>({ executor: currentUserId });
  const { data, isFetching, isError, refetch } = useGetTasksQuery({
    page: params.page,
    statuses: params.statuses,
    executor: target.executor,
    creator: target.creator,
  });
  const { content, totalPages } = data || {};

  const isErrorVisible = isError;
  const isTaskListVisible = !isError;

  const errorHandler = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <Layout>
      {isTaskListVisible && (
        <WrapperStyled>
          <Target isLoading={isFetching} userId={currentUserId} setTarget={setTarget} />

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
