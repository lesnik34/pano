import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URLS } from '@constants/api';
import { ASSIGNMENTS_LIST_LENGTH } from '@constants/common';
import type {
  AssignmentI,
  AssignmentsListQueryI,
  AssignmentsListResI,
  EditAssignmentI,
  NewAssignmentI,
} from '../types';
import { customBaseQuery } from '../base-query/custom';

const TAGS = {
  ONE: 'assignment',
  ALL: 'all_assignments',
};

export const assignmentsApi = createApi({
  reducerPath: 'assignmentsApi',
  tagTypes: [TAGS.ONE, TAGS.ALL],
  baseQuery: customBaseQuery({ baseUrl: import.meta.env.VITE_RES_URL }),
  endpoints: (builder) => ({
    getAssignments: builder.query<AssignmentsListResI, AssignmentsListQueryI>({
      query: ({ page, statuses, search, executor, creator, size = ASSIGNMENTS_LIST_LENGTH }) => ({
        url: `${API_URLS.ASSIGNMENTS}`,
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
    getAssignment: builder.query<AssignmentI, { assignmentId?: string }>({
      query: ({ assignmentId }) => ({
        url: `${API_URLS.ASSIGNMENTS}/${assignmentId}`,
      }),
      providesTags: (result) => (result ? [{ type: TAGS.ONE, id: result.id }, TAGS.ONE] : [TAGS.ONE]),
    }),
    updateAssignment: builder.mutation<AssignmentI, EditAssignmentI>({
      query: (assignment) => ({
        url: API_URLS.ASSIGNMENTS,
        method: 'POST',
        data: assignment,
      }),
      invalidatesTags: (result) => [{ type: TAGS.ONE, id: result?.id }, TAGS.ALL],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          assignmentsApi.util.updateQueryData('getAssignment', { assignmentId: id }, (draft) => {
            Object.assign(draft, data);
          }),
        );
      },
    }),
    updateAssignmentStatus: builder.mutation<AssignmentI, { id: string; status: AssignmentI['status'] }>({
      query: ({ status, id }) => ({
        url: `${API_URLS.ASSIGNMENTS}/${id}`,
        method: 'PATCH',
        data: { status },
      }),
      invalidatesTags: (result) => [{ type: TAGS.ONE, id: result?.id }, TAGS.ALL],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          assignmentsApi.util.updateQueryData('getAssignment', { assignmentId: id }, (draft) => {
            Object.assign(draft, data);
          }),
        );
      },
    }),
    createAssignment: builder.mutation<AssignmentI, NewAssignmentI>({
      query: (assignment) => ({
        url: API_URLS.ASSIGNMENTS,
        method: 'POST',
        data: assignment,
      }),
      invalidatesTags: () => [TAGS.ALL],
    }),
    deleteAssignment: builder.mutation<AssignmentI, { id: string }>({
      query: ({ id }) => ({
        url: `${API_URLS.ASSIGNMENTS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [TAGS.ALL],
    }),
  }),
});

export const {
  useCreateAssignmentMutation,
  useDeleteAssignmentMutation,
  useGetAssignmentQuery,
  useGetAssignmentsQuery,
  useUpdateAssignmentMutation,
  useUpdateAssignmentStatusMutation,
} = assignmentsApi;
