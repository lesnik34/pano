import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskStatus, UserI } from '@api/types';

export interface TasksState {
  params: {
    page: number;
    statuses: Array<string>;
  };
  viewedUser?: UserI;
}

const initialState: TasksState = {
  params: {
    page: 1,
    statuses: [TaskStatus.inProgress, TaskStatus.toDo],
  },
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<unknown>) => {
      state.params.page = Number(action.payload);
    },
    setStatus: (state, action: PayloadAction<unknown>) => {
      const values = String(action.payload).split(',');
      state.params.statuses = values;
    },
    setViewedUser: (state, action: PayloadAction<UserI | undefined>) => {
      state.viewedUser = action.payload;
    },
  },
});

export const { setPage, setStatus, setViewedUser } = tasksSlice.actions;

export default tasksSlice.reducer;
