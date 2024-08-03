import { API_URLS, DEFAULT_ERROR_RESPONSE } from '@constants/api';
import Http from './http';
import { UserI, BaseResponseI } from '../types';

const api = Http.Public();

interface ResponseI {
  user: UserI;
  token: string;
}

export const authUser = async (initData?: string) => {
  if (!initData) {
    return DEFAULT_ERROR_RESPONSE;
  }

  const { data } = await api.post<BaseResponseI<ResponseI>>(API_URLS.AUTH_USER, { initData });

  return data;
};
