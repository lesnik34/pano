import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

const requestHandler = (request: InternalAxiosRequestConfig<unknown>) => request;
const errorHandler = (error: unknown) => Promise.reject(error);

const Http = {
  Private: (config?: AxiosRequestConfig, baseUrl?: string) => {
    const instance = axios.create({
      baseURL: baseUrl || import.meta.env.VITE_RES_URL,
      timeout: 60000,
      ...(config || {}),
    });

    instance.interceptors.request.use(
      (request) => requestHandler(request),
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

    instance.interceptors.request.use(
      (request) => requestHandler(request),
      (error) => errorHandler(error),
    );

    return instance;
  },
};

export default Http;
