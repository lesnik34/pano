import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import query from '@api/query';

import { authMiddleware } from './middlewares/auth';
import authReducer from './slices/authSlice';
import tasksReducer from './slices/tasksSlice';
import assignmentsReducer from './slices/assignmentsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    assignments: assignmentsReducer,
    [query.usersApi.reducerPath]: query.usersApi.reducer,
    [query.tasksApi.reducerPath]: query.tasksApi.reducer,
    [query.departmentsApi.reducerPath]: query.departmentsApi.reducer,
    [query.assignmentsApi.reducerPath]: query.assignmentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([
        query.usersApi.middleware,
        query.tasksApi.middleware,
        query.departmentsApi.middleware,
        query.assignmentsApi.middleware,
      ])
      .prepend(authMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
