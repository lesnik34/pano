// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URLS } from '@constants/api';
import type { NewTaskI, TaskI, TasksListQueryI, TasksListResI } from '../types';
import { customBaseQuery } from '../base-query/custom';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  tagTypes: ['Task'],
  baseQuery: customBaseQuery({ baseUrl: import.meta.env.VITE_RES_URL }),
  endpoints: (builder) => ({
    getTasks: builder.query<TasksListResI, TasksListQueryI>({
      query: ({ page, status }) => ({
        url: `${API_URLS.TASKS}`,
        params: {
          page,
          status: status?.join(','),
        },
      }),
      providesTags: (result) =>
        result ? [...result.content.map(({ id }) => ({ type: 'Task' as const, id })), 'Task'] : ['Task'],
    }),
    getTask: builder.query<TaskI, { taskId?: string }>({
      query: ({ taskId }) => ({
        url: `${API_URLS.TASKS}/${taskId}`,
      }),
      providesTags: (result) => (result ? [{ type: 'Task', id: result.id }, 'Task'] : ['Task']),
    }),
    updateTask: builder.mutation<TaskI, TaskI>({
      query: (task) => ({
        url: `${API_URLS.TASKS}/${task.id}`,
        method: 'POST',
        data: task,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Task', id: arg.id }],
    }),
    createTask: builder.mutation<TaskI, NewTaskI>({
      query: (task) => ({
        url: API_URLS.TASKS,
        method: 'POST',
        data: task,
      }),
      invalidatesTags: () => ['Task'],
    }),
  }),
});

export const { useGetTasksQuery, useGetTaskQuery, useUpdateTaskMutation, useCreateTaskMutation } = tasksApi;
