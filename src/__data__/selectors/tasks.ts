import { RootState } from '../store';

export const params = (state: RootState) => state.tasks.params;

export const user = (state: RootState) => state.tasks.params.user;

export const view = (state: RootState) => state.tasks.params.view;
