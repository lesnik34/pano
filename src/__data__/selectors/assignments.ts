import { RootState } from '../store';

export const params = (state: RootState) => state.assignments.params;

export const user = (state: RootState) => state.assignments.params.user;

export const view = (state: RootState) => state.assignments.params.view;
