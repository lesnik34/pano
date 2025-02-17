import { useCallback, useState } from 'react';
import Layout from '@components/global/layout';
import Error from '@components/error';
import Pagination from '@components/pagination';
import selectors from '@store/selectors';
import { useAppSelector } from '@store/store';
import { useGetAssignmentsQuery } from '@api/query/assignments';
import AssignmentsList from '@components/assignment-list';

import Header from './header';
import withAssignmentsParams, { AssignmentsParamsComponentI } from './hoc/with-assignments-params';
import { ErrorWrapperStyled, WrapperStyled } from './assignments.styled';
import Target from './target';
import Elevation from './elevation';

interface AssignmentsI extends AssignmentsParamsComponentI {}

const Assignments: React.FC<AssignmentsI> = ({ params }) => {
  const userId = useAppSelector(selectors.auth.userId);
  const viewedUserId = useAppSelector(selectors.assignments.viewedUser)?.id;
  const currentUserId = viewedUserId || userId;

  const [target, setTarget] = useState<{ executor?: number; creator?: number }>({ creator: currentUserId });
  const { data, isFetching, isError, refetch } = useGetAssignmentsQuery({
    page: params.page,
    statuses: params.statuses,
    executor: target.executor,
    creator: target.creator,
  });
  const { content, totalPages } = data || {};

  const isErrorVisible = isError;
  const isAssignmentListVisible = !isError;

  const errorHandler = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <Layout>
      {isAssignmentListVisible && (
        <WrapperStyled>
          <Target isLoading={isFetching} userId={currentUserId} setTarget={setTarget} target={target} />

          <Header isLoading={isFetching} />

          <AssignmentsList items={content} isLoading={isFetching} />

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

export default withAssignmentsParams(Assignments);
