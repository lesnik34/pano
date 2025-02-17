import { RootState } from '../store';

export const params = (state: RootState) => state.tasks.params;

export const viewedUser = (state: RootState) => state.tasks.viewedUser;
