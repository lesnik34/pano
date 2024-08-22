// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URLS } from '@constants/api';
import type { TaskI, TasksListQueryI, TasksListResI } from '../types';
import { customBaseQuery } from '../base-query/custom';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: customBaseQuery({ baseUrl: import.meta.env.VITE_RES_URL }),
  endpoints: (builder) => ({
    getTasks: builder.query<TasksListResI, TasksListQueryI>({
      query: ({ page, status }) => ({
        url: `${API_URLS.TASKS}`,
        params: {
          page,
          status,
        },
      }),
    }),
    getTask: builder.query<TaskI, { taskId?: string }>({
      query: ({ taskId }) => ({
        url: `${API_URLS.TASKS}/${taskId}`,
      }),
    }),
  }),
});

export const { useGetTasksQuery, useGetTaskQuery } = tasksApi;
