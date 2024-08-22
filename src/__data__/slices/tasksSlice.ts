import { TaskStatus } from '@/api/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TasksState {
  params: {
    page: number;
    status: Array<string>;
  };
}

const initialState: TasksState = {
  params: {
    page: 1,
    status: [TaskStatus.done, TaskStatus.canceled, TaskStatus.inProgress, TaskStatus.toDo],
  },
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<string>) => {
      state.params.page = Number(action.payload);
    },
    setStatus: (state, action: PayloadAction<string>) => {
      const value = action.payload.split(',');
      state.params.status = value;
    },
  },
});

export const { setPage, setStatus } = tasksSlice.actions;

export default tasksSlice.reducer;
