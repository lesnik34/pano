import { useCallback, useMemo } from 'react';

import { useGetAssignmentsQuery } from '@api/query/assignments';
import AssignmentsList from '@components/assignment-list';
import Pagination from '@components/pagination';
import Layout from '@components/global/layout';
import { useAppSelector } from '@store/store';
import selectors from '@store/selectors';
import Error from '@components/error';

import withAssignmentsParams, { AssignmentsParamsComponentI } from './hoc/with-assignments-params';
import Elevation from './elevation';
import Header from './header';
import Target from './target';

import { ErrorWrapperStyled, WrapperStyled } from './assignments.styled';

interface AssignmentsI extends AssignmentsParamsComponentI {}

const Assignments: React.FC<AssignmentsI> = ({ params }) => {
  const userId = useAppSelector(selectors.auth.userId);

  const currentQueries = useMemo(() => {
    const currentUser = params.user || userId;

    return {
      page: params.page,
      statuses: params.statuses,
      [params.view]: currentUser,
    };
  }, [params.page, params.statuses, params.user, params.view, userId]);

  const { data, isFetching, isError, refetch } = useGetAssignmentsQuery(currentQueries);
  const { content, totalPages } = data || {};

  const isAssignmentListVisible = !isError;
  const isErrorVisible = isError;

  const errorHandler = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <Layout>
      {isAssignmentListVisible && (
        <WrapperStyled>
          <Target isLoading={isFetching} />

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
