import { RootState } from '../store';

export const isAuth = (state: RootState) => state.auth.isAuth;

export const userId = (state: RootState) => state.auth.userId;

export const token = (state: RootState) => state.auth.token;

export const isLoading = (state: RootState) => state.auth.isLoading;

export const error = (state: RootState) => state.auth.error;
