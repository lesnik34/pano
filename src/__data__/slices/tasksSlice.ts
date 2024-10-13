import { TaskStatus } from '@/api/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TasksState {
  params: {
    page: number;
    statuses: Array<string>;
  };
}

const initialState: TasksState = {
  params: {
    page: 1,
    statuses: [TaskStatus.done, TaskStatus.inProgress, TaskStatus.toDo],
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
  },
});

export const { setPage, setStatus } = tasksSlice.actions;

export default tasksSlice.reducer;
