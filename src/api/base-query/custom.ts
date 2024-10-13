import type { BaseQueryApi, BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import axios from 'axios';
import slices from '@store/slices';
import { DEFAULT_ERROR_CODE } from '@constants/common';
import i18n from '@utils/i18next';
import { MAX_ATTEMPTS_403 } from '@constants/api';

export const customBaseQuery = (
  { baseUrl }: { baseUrl: string } = { baseUrl: '' },
): BaseQueryFn<
  {
    url: string;
    method?: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
    headers?: AxiosRequestConfig['headers'];
  },
  BaseQueryApi,
  unknown
> => {
  let attempts = 0;

  return async ({ url, method, data, params, headers }, { getState, dispatch }) => {
    const { auth } = getState() as { auth: { token?: string } };
    const currentHeaders = auth.token
      ? {
          ...headers,
          Authorization: `Bearer ${auth.token}`,
        }
      : headers;
    const reqConfig = {
      url: baseUrl + url,
      method,
      data,
      params,
      headers: currentHeaders,
    };

    try {
      const result = await axios(reqConfig);

      if (result.data?.status) {
        return { data: result.data.body || true };
      }

      return {
        error: {
          status: result.data.error.code || DEFAULT_ERROR_CODE,
          data: result.data.error.message || i18n.t('default.error.message'),
        },
      };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      if (err.response?.status === 403 && attempts < MAX_ATTEMPTS_403) {
        attempts += 1;
        dispatch(slices.auth.clearAuthUser());
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
};
