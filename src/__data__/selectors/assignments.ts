import { RootState } from '../store';

export const params = (state: RootState) => state.assignments.params;

export const viewedUser = (state: RootState) => state.assignments.viewedUser;
