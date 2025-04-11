import React, { useCallback, useEffect, useMemo } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@store/store';
import { ASSIGNMENTS_PARAMS } from '@constants/pages';
import { ViewQueryEnum } from '@api/types';
import selectors from '@store/selectors';
import slices from '@store/slices';

export interface AssignmentsParamsComponentI {
  params: {
    statuses: Array<string>;
    view: ViewQueryEnum;
    user?: string;
    page: number;
  };
  totalPages?: number;
}

const withAssignmentsParams = (Component: React.ComponentType<AssignmentsParamsComponentI>) => () => {
  const dispatch = useAppDispatch();
  const assignmentsStoreParams = useAppSelector(selectors.assignments.params);
  const [searchParams, setSearchParams] = useSearchParams();

  const queryList = useMemo(
    () => [
      {
        name: ASSIGNMENTS_PARAMS.page,
        sliceValue: assignmentsStoreParams.page,
        changeStore: slices.assignments.setPage,
      },
      {
        name: ASSIGNMENTS_PARAMS.status,
        sliceValue: assignmentsStoreParams.statuses,
        changeStore: slices.assignments.setStatus,
      },
      {
        name: ASSIGNMENTS_PARAMS.view,
        sliceValue: assignmentsStoreParams.view,
        changeStore: slices.assignments.setView,
      },
      {
        name: ASSIGNMENTS_PARAMS.user,
        sliceValue: assignmentsStoreParams.user,
        changeStore: slices.assignments.setUser,
      },
    ],
    [
      assignmentsStoreParams.page,
      assignmentsStoreParams.statuses,
      assignmentsStoreParams.user,
      assignmentsStoreParams.view,
    ],
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

  return <Component params={assignmentsStoreParams} />;
};

export default withAssignmentsParams;
