import React, { useCallback } from 'react';
import { ScrollShadow, Spinner } from '@heroui/react';
import { useTranslation } from 'react-i18next';

import { useGetAssignmentsQuery } from '@api/query/assignments';
import AssignmentsList from '@components/assignment-list';
import useDebounce from '@hooks/use-debounce';
import Error from '@components/error';

import { ErrorWrapperStyled, LoaderWrapperStyled } from './items.styled';

interface ItemsI {
  search: string;
}

const ITEMS_LENGTH = 8;
const MIN_SEARCH_LENGTH = 3;

const Items: React.FC<ItemsI> = ({ search }) => {
  const { t } = useTranslation();
  const debounceSearch = useDebounce(search);
  const isSkippedSearch = debounceSearch.length < MIN_SEARCH_LENGTH;

  const { data, isFetching, isError, refetch } = useGetAssignmentsQuery(
    {
      page: 1,
      size: ITEMS_LENGTH,
      search: debounceSearch,
    },
    { skip: isSkippedSearch },
  );
  const isLoadingVisible = search !== debounceSearch || isFetching;
  const isErrorVisible = isError && !isLoadingVisible;
  const isTaskListVisible = !isError && !isLoadingVisible && !isSkippedSearch;
  const needMoreMessage = isSkippedSearch && debounceSearch.length !== 0 && !isLoadingVisible;
  const { content } = data || {};

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="h-full">
      {isLoadingVisible && (
        <LoaderWrapperStyled>
          <Spinner label={t('search.tasks.loader.label')} />
        </LoaderWrapperStyled>
      )}

      {isErrorVisible && (
        <ErrorWrapperStyled>
          <Error onClick={onRefresh} />
        </ErrorWrapperStyled>
      )}

      {needMoreMessage && (
        <ErrorWrapperStyled>
          <Error title={t('need.more.text.title')} description={t('need.more.text.description')} hideButton />
        </ErrorWrapperStyled>
      )}

      {isTaskListVisible && (
        <ScrollShadow hideScrollBar className="max-h-[60vh]">
          <AssignmentsList items={content} isLoading={isFetching} isColumn />
        </ScrollShadow>
      )}
    </div>
  );
};

export default Items;
