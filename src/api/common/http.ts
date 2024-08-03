import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { DEFAULT_ERROR_CODE } from '@constants/common';
import i18n from '@/utils/i18next';

const responseHandler = (response: AxiosResponse) => response;
const errorHandler = (error: AxiosError) => {
  console.log('handler', error);
  return Promise.resolve({
    data: {
      status: false,
      error: {
        code: error.response?.status || DEFAULT_ERROR_CODE,
        message: error.message || i18n.t('default.error.message'),
      },
    },
  });
};

const Http = {
  Private: (config?: AxiosRequestConfig, baseUrl?: string) => {
    const instance = axios.create({
      baseURL: baseUrl || import.meta.env.VITE_RES_URL,
      timeout: 60000,
      ...(config || {}),
    });

    instance.interceptors.response.use(
      (response) => responseHandler(response),
      (error) => errorHandler(error),
    );

    return instance;
  },

  Public: (config?: AxiosRequestConfig, baseUrl?: string) => {
    const instance = axios.create({
      baseURL: baseUrl || import.meta.env.VITE_RES_URL,
      timeout: 60000,
      ...(config || {}),
    });

    instance.interceptors.response.use(
      (request) => responseHandler(request),
      (error) => errorHandler(error),
    );

    return instance;
  },
};

export default Http;
