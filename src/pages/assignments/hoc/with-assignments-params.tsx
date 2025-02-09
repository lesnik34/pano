import React, { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ASSIGNMENTS_PARAMS } from '@constants/pages';
import { useAppDispatch, useAppSelector } from '@store/store';
import selectors from '@store/selectors';
import slices from '@store/slices';

export interface AssignmentsParamsComponentI {
  params: {
    page: number;
    statuses: Array<string>;
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
    ],
    [assignmentsStoreParams.page, assignmentsStoreParams.statuses],
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

  return <Component params={assignmentsStoreParams} />;
};

export default withAssignmentsParams;
