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

interface TasksI extends TaskParamsComponentI {}

const Tasks: React.FC<TasksI> = ({ params }) => {
  const userId = useAppSelector(selectors.auth.userId);
  const [target, setTarget] = useState<{ executor?: number; creator?: number }>({ executor: userId });
  const { data, isFetching, isError, refetch } = useGetTasksQuery({
    page: params.page,
    statuses: params.statuses,
    executor: target.executor,
    creator: target.creator,
  });
  const { content, totalPages } = data || {};

  console.log(target);

  const isErrorVisible = isError;
  const isTaskListVisible = !isError;
  const isPaginationVisible = totalPages && params.page >= 0 && totalPages > 1;

  const errorHandler = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <Layout>
      {isTaskListVisible && (
        <WrapperStyled>
          <Target userId={userId} setTarget={setTarget} />

          <Header isLoading={isFetching} />

          <TaskList items={content} isLoading={isFetching} />

          {isPaginationVisible && <Pagination totalPages={totalPages} currentPage={params.page} />}
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
