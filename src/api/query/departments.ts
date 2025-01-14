// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URLS } from '@constants/api';
import { DEPARTMENTS_LIST_LENGTH } from '@constants/common';
import { customBaseQuery } from '../base-query/custom';
import type {
  DepartmentI,
  DepartmentsListQueryI,
  DepartmentsListResI,
  EditDepartmentI,
  NewDepartmentI,
} from '../types';

export const departmentsApi = createApi({
  reducerPath: 'departmentsApi',
  tagTypes: ['Department', 'AllDepartments'],
  baseQuery: customBaseQuery({ baseUrl: import.meta.env.VITE_RES_URL }),
  endpoints: (builder) => ({
    getDepartments: builder.query<DepartmentsListResI, DepartmentsListQueryI>({
      query: ({ page, search, size = DEPARTMENTS_LIST_LENGTH }) => ({
        url: `${API_URLS.DEPARTMENTS}`,
        params: {
          page: page ? page - 1 : undefined,
          size,
          search,
        },
      }),
      providesTags: (result) =>
        result
          ? [...result.content.map(({ id }) => ({ type: 'Department' as const, id })), 'Department', 'AllDepartments']
          : ['Department', 'AllDepartments'],
    }),
    getDepartment: builder.query<DepartmentI, { departmentId?: string }>({
      query: ({ departmentId }) => ({
        url: `${API_URLS.DEPARTMENTS}/${departmentId}`,
      }),
      providesTags: (result) => (result ? [{ type: 'Department', id: result.id }, 'Department'] : ['Department']),
    }),
    updateDepartment: builder.mutation<DepartmentI, EditDepartmentI>({
      query: (department) => ({
        url: API_URLS.DEPARTMENTS,
        method: 'POST',
        data: department,
      }),
      invalidatesTags: () => ['AllDepartments'],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          departmentsApi.util.updateQueryData('getDepartment', { departmentId: id }, (draft) => {
            Object.assign(draft, data);
          }),
        );
      },
    }),
    createDepartment: builder.mutation<DepartmentI, NewDepartmentI>({
      query: (department) => ({
        url: API_URLS.DEPARTMENTS,
        method: 'POST',
        data: department,
      }),
      invalidatesTags: () => ['Department'],
    }),
    deleteDepartments: builder.mutation<DepartmentI, { id: string }>({
      query: ({ id }) => ({
        url: `${API_URLS.DEPARTMENTS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => ['Department'],
    }),
  }),
});

export const {
  useGetDepartmentQuery,
  useGetDepartmentsQuery,
  useUpdateDepartmentMutation,
  useCreateDepartmentMutation,
  useDeleteDepartmentsMutation,
} = departmentsApi;
