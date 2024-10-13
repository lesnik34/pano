import React, { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { TASK_PARAMS } from '@constants/pages';
import { useAppDispatch, useAppSelector } from '@store/store';
import selectors from '@store/selectors';
import slices from '@store/slices';

export interface TaskParamsComponentI {
  params: {
    page: number;
    statuses: Array<string>;
  };
  totalPages?: number;
}

const withTaskParams = (Component: React.ComponentType<TaskParamsComponentI>) => () => {
  const dispatch = useAppDispatch();
  const tasksStoreParams = useAppSelector(selectors.tasks.params);
  const [searchParams, setSearchParams] = useSearchParams();

  const queryList = useMemo(
    () => [
      {
        name: TASK_PARAMS.page,
        sliceValue: tasksStoreParams.page,
        changeStore: slices.tasks.setPage,
      },
      {
        name: TASK_PARAMS.status,
        sliceValue: tasksStoreParams.statuses,
        changeStore: slices.tasks.setStatus,
      },
    ],
    [tasksStoreParams.page, tasksStoreParams.statuses],
  );

  const syncQueryStore = useCallback(
    (name: string, sliceValue: unknown, changeValue: ActionCreatorWithPayload<unknown>) => {
      const paramValue = searchParams.get(name);

      if (!paramValue) {
        setSearchParams((params) => {
          params.set(name, String(sliceValue));
          return params;
        });
      }

      if (paramValue && paramValue !== String(sliceValue)) {
        dispatch(changeValue(paramValue));
      }
    },
    [dispatch, searchParams, setSearchParams],
  );

  useEffect(() => {
    queryList.forEach((query) => {
      syncQueryStore(query.name, query.sliceValue, query.changeStore);
    });
  }, [queryList, searchParams, syncQueryStore]);

  return <Component params={tasksStoreParams} />;
};

export default withTaskParams;
