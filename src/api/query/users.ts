// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URLS } from '@constants/api';
import type { UserI } from '../types';
import { customBaseQuery } from '../base-query/custom';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: customBaseQuery({ baseUrl: import.meta.env.VITE_RES_URL }),
  endpoints: (builder) => ({
    getUserById: builder.query<UserI, string | undefined>({
      query: (id) => ({
        url: `${API_URLS.USER}/${id}`,
      }),
    }),
  }),
});

export const { useGetUserByIdQuery } = usersApi;
