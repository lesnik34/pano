import { API_URLS, DEFAULT_ERROR_RESPONSE } from '@constants/api';
import { LOCAL_KEYS } from '@constants/common';
import Http from './http';
import { BaseResponseI, BaseSuccessI } from '../types';

const api = Http.Public();

interface ResponseI {
  userId: string;
  token: string;
}

export const authUser = async (initData?: string) => {
  const authLocal = localStorage.getItem(LOCAL_KEYS.AUTH);

  if (!initData) {
    return DEFAULT_ERROR_RESPONSE;
  }

  if (authLocal) {
    return {
      status: true,
      body: JSON.parse(authLocal) as ResponseI,
    } as BaseSuccessI<ResponseI>;
  }

  const { data } = await api.post<BaseResponseI<ResponseI>>(API_URLS.AUTH_USER, { initData });
  const localAuthToSet = data.status && data.body;
  if (localAuthToSet) {
    localStorage.setItem(LOCAL_KEYS.AUTH, JSON.stringify(localAuthToSet));
  }

  return data;
};