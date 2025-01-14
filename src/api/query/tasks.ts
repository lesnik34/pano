// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URLS } from '@constants/api';
import { TASKS_LIST_LENGTH } from '@constants/common';
import type { EditTaskI, NewTaskI, TaskI, TasksListQueryI, TasksListResI } from '../types';
import { customBaseQuery } from '../base-query/custom';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  tagTypes: ['Task', 'AllTasks'],
  baseQuery: customBaseQuery({ baseUrl: import.meta.env.VITE_RES_URL }),
  endpoints: (builder) => ({
    getTasks: builder.query<TasksListResI, TasksListQueryI>({
      query: ({ page, statuses, search, executor, creator, size = TASKS_LIST_LENGTH }) => ({
        url: `${API_URLS.TASKS}`,
        params: {
          page: page ? page - 1 : undefined,
          statuses: statuses?.join(','),
          size,
          executor,
          creator,
          search,
        },
      }),
      providesTags: (result) =>
        result
          ? [...result.content.map(({ id }) => ({ type: 'Task' as const, id })), 'Task', 'AllTasks']
          : ['Task', 'AllTasks'],
    }),
    getTask: builder.query<TaskI, { taskId?: string }>({
      query: ({ taskId }) => ({
        url: `${API_URLS.TASKS}/${taskId}`,
      }),
      providesTags: (result) => (result ? [{ type: 'Task', id: result.id }, 'Task'] : ['Task']),
    }),
    updateTask: builder.mutation<TaskI, EditTaskI>({
      query: (task) => ({
        url: API_URLS.TASKS,
        method: 'POST',
        data: task,
      }),
      invalidatesTags: (result) => [{ type: 'Task', id: result?.id }],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          tasksApi.util.updateQueryData('getTask', { taskId: id }, (draft) => {
            Object.assign(draft, data);
          }),
        );
      },
    }),
    updateTaskStatus: builder.mutation<TaskI, { id: string; status: TaskI['status'] }>({
      query: ({ status, id }) => ({
        url: `${API_URLS.TASKS}/${id}`,
        method: 'PATCH',
        data: { status },
      }),
      invalidatesTags: (result) => [{ type: 'Task', id: result?.id }],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          tasksApi.util.updateQueryData('getTask', { taskId: id }, (draft) => {
            Object.assign(draft, data);
          }),
        );
      },
    }),
    createTask: builder.mutation<TaskI, NewTaskI>({
      query: (task) => ({
        url: API_URLS.TASKS,
        method: 'POST',
        data: task,
      }),
      invalidatesTags: () => ['Task'],
    }),
    deleteTask: builder.mutation<TaskI, { id: string }>({
      query: ({ id }) => ({
        url: `${API_URLS.TASKS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => ['Task'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useUpdateTaskMutation,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
} = tasksApi;
