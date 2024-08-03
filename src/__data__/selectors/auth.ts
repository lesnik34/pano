import { RootState } from '../store';

export const isAuth = (state: RootState) => state.auth.isAuth;

export const user = (state: RootState) => state.auth.user;

export const token = (state: RootState) => state.auth.token;

export const isLoading = (state: RootState) => state.auth.isLoading;

export const isError = (state: RootState) => state.auth.isError;
