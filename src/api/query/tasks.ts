import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URLS } from '@constants/api';
import { TASKS_LIST_LENGTH } from '@constants/common';
import type { EditTaskI, NewTaskI, TaskI, TasksListQueryI, TasksListResI } from '../types';
import { customBaseQuery } from '../base-query/custom';

const TAGS = {
  ONE: 'task',
  ALL: 'all_tasks',
};

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  tagTypes: [TAGS.ONE, TAGS.ALL],
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
          ? [...result.content.map(({ id }) => ({ type: TAGS.ONE, id })), TAGS.ONE, TAGS.ALL]
          : [TAGS.ONE, TAGS.ALL],
    }),
    getTask: builder.query<TaskI, { taskId?: string }>({
      query: ({ taskId }) => ({
        url: `${API_URLS.TASKS}/${taskId}`,
      }),
      providesTags: (result) => (result ? [{ type: TAGS.ONE, id: result.id }, TAGS.ONE] : [TAGS.ONE]),
    }),
    updateTask: builder.mutation<TaskI, EditTaskI>({
      query: (task) => ({
        url: API_URLS.TASKS,
        method: 'POST',
        data: task,
      }),
      invalidatesTags: (result) => [{ type: TAGS.ONE, id: result?.id }, TAGS.ALL],
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
      invalidatesTags: (result) => [{ type: TAGS.ONE, id: result?.id }, TAGS.ALL],
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
      invalidatesTags: () => [TAGS.ALL],
    }),
    deleteTask: builder.mutation<TaskI, { id: string }>({
      query: ({ id }) => ({
        url: `${API_URLS.TASKS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [TAGS.ALL],
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
