import { useCallback } from 'react';

import ListSkeleton from '@components/skeleton/departments-list';
import { useGetDepartmentsQuery } from '@api/query/departments';
import Layout from '@components/global/layout';
import Error from '@components/error';

import { ErrorWrapperStyled } from './structure.styled';
import List from './list';

const Structure: React.FC = () => {
  const { data, isFetching, isError, refetch } = useGetDepartmentsQuery({ size: 100, page: 1 });

  const isErrorVisible = isError;
  const isDataVisible = !isError && !isFetching;

  const errorHandler = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <Layout>
      {isFetching && <ListSkeleton />}

      {isDataVisible && <List data={data?.content} />}

      {isErrorVisible && (
        <ErrorWrapperStyled>
          <Error onClick={errorHandler} />
        </ErrorWrapperStyled>
      )}
    </Layout>
  );
};

export default Structure;
