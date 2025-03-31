import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URLS } from '@constants/api';
import { USERS_LIST_LENGTH } from '@constants/common';

import type { UserI, UsersListI } from '../types';
import { customBaseQuery } from '../base-query/custom';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: customBaseQuery({ baseUrl: import.meta.env.VITE_RES_URL }),
  endpoints: (builder) => ({
    getUserById: builder.query<UserI, number | undefined>({
      query: (id) => ({
        url: `${API_URLS.USER}/${id}`,
      }),
    }),
    getUsers: builder.query<UsersListI, { search?: string; page?: number; size?: number; department?: string }>({
      query: ({ search, page, size = USERS_LIST_LENGTH, department }) => ({
        url: API_URLS.USER,
        params: {
          page: page ? page - 1 : undefined,
          size,
          search,
          department,
        },
      }),
    }),
    getHeads: builder.query<UsersListI, { search?: string; page?: number; size?: number; department?: string }>({
      query: ({ search, page, size = USERS_LIST_LENGTH, department }) => ({
        url: `${API_URLS.USER}/heads`,
        params: {
          page: page ? page - 1 : undefined,
          size,
          search,
          department,
        },
      }),
    }),
  }),
});

export const { useGetUserByIdQuery, useGetUsersQuery, useGetHeadsQuery } = usersApi;
