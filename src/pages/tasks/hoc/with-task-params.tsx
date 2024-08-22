import React, { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, slices, selectors, useAppSelector } from '@store/index';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { TASK_PARAMS } from '@constants/pages';

export interface TaskParamsComponentI {
  params: {
    page: number;
    status: Array<string>;
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
        sliceValue: tasksStoreParams.status,
        changeStore: slices.tasks.setStatus,
      },
    ],
    [tasksStoreParams.page, tasksStoreParams.status],
  );

  const syncQueryStore = useCallback(
    (name: string, sliceValue: string, changeValue: ActionCreatorWithPayload<string>) => {
      const paramValue = searchParams.get(name);
      const currentValue = paramValue || sliceValue;

      if (!paramValue) {
        setSearchParams((params) => {
          params.set(name, String(currentValue));
          return params;
        });
      }

      if (currentValue !== sliceValue) {
        dispatch(changeValue(currentValue));
      }
    },
    [dispatch, searchParams, setSearchParams],
  );

  useEffect(() => {
    queryList.forEach((query) => {
      syncQueryStore(query.name, String(query.sliceValue), query.changeStore);
    });
  }, [queryList, searchParams, syncQueryStore]);

  return <Component params={tasksStoreParams} />;
};

export default withTaskParams;
