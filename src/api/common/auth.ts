import { API_URLS, DEFAULT_ERROR_RESPONSE } from '@constants/api';
import { LOCAL_KEYS } from '@constants/common';
import { parseInitData } from '@utils/common';
import Http from './http';
import { BaseResponseI, BaseSuccessI } from '../types';

const api = Http.Public();

interface ResponseI {
  userId?: number;
  token: string;
}

export const authUser = async (initData?: string, id?: number): Promise<BaseResponseI<ResponseI>> => {
  const authLocal = localStorage.getItem(LOCAL_KEYS.AUTH);

  if (!initData) {
    return DEFAULT_ERROR_RESPONSE;
  }

  if (authLocal) {
    const localData = JSON.parse(authLocal) as ResponseI;

    return {
      status: true,
      body: { ...localData, userId: Number(localData.userId) },
    } as BaseSuccessI<ResponseI>;
  }

  const { hash, dataCheck } = parseInitData(initData);
  const { data } = await api.post<BaseResponseI<string>>(API_URLS.AUTH_USER, {
    initData: dataCheck,
    id,
    hash,
  });

  const localAuthToSet = data.status && data.body;
  if (localAuthToSet) {
    localStorage.setItem(LOCAL_KEYS.AUTH, JSON.stringify({ token: localAuthToSet, userId: id }));
  }

  if (data.status) {
    return { ...data, body: { token: data.body, userId: id } };
  }

  return data;
};
