import React, { useCallback } from 'react';
import { ScrollShadow, Spinner } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { useGetTasksQuery } from '@api/query/tasks';
import useDebounce from '@hooks/use-debounce';
import TaskList from '@components/task-list';
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

  const { data, isFetching, isError, refetch } = useGetTasksQuery(
    {
      page: 1,
      size: ITEMS_LENGTH,
      search: debounceSearch,
    },
    { skip: isSkippedSearch },
  );
  const isLoadingVisible = search !== debounceSearch || isFetching;
  const isErrorVisible = isError && !isLoadingVisible;
  const isTaskListVisible = !isError && !isLoadingVisible;
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

      {isTaskListVisible && (
        <ScrollShadow hideScrollBar className="max-h-[60vh]">
          <TaskList items={content} isLoading={isFetching} isColumn />
        </ScrollShadow>
      )}
    </div>
  );
};

export default Items;
