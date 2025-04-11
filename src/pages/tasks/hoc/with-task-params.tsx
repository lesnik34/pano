import React, { useCallback, useEffect, useMemo } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@store/store';
import { TASK_PARAMS } from '@constants/pages';
import { ViewQueryEnum } from '@api/types';
import selectors from '@store/selectors';
import slices from '@store/slices';

export interface TaskParamsComponentI {
  params: {
    statuses: Array<string>;
    view: ViewQueryEnum;
    user?: string;
    page: number;
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
      {
        name: TASK_PARAMS.view,
        sliceValue: tasksStoreParams.view,
        changeStore: slices.tasks.setView,
      },
      {
        name: TASK_PARAMS.user,
        sliceValue: tasksStoreParams.user,
        changeStore: slices.tasks.setUser,
      },
    ],
    [tasksStoreParams.page, tasksStoreParams.statuses, tasksStoreParams.user, tasksStoreParams.view],
  );

  const syncQueryStore = useCallback(
    (name: string, sliceValue: unknown, changeValue: ActionCreatorWithPayload<any>) => {
      const paramValue = searchParams.get(name);

      // Ставим в квери значение из стора в случае если квери нет
      if (!paramValue) {
        setSearchParams((params) => {
          params.set(name, String(sliceValue || ''));
          return params;
        });
      }

      // Обновляем стор из квери в случае если: квери не пустое && квери не равно стору
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
