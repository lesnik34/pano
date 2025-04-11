import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskStatus, ViewQueryEnum } from '@api/types';
import { VIEWED_SELF } from '@constants/pages';

export interface TasksState {
  params: {
    page: number;
    statuses: Array<string>;
    view: ViewQueryEnum;
    user: string;
  };
}

const initialState: TasksState = {
  params: {
    page: 1,
    statuses: [TaskStatus.inProgress, TaskStatus.toDo],
    view: ViewQueryEnum.executor,
    user: VIEWED_SELF,
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
    setUser: (state, action: PayloadAction<string>) => {
      state.params.user = action.payload;
    },
    setView: (state, action: PayloadAction<ViewQueryEnum>) => {
      state.params.view = action.payload;
    },
  },
});

export const { setPage, setStatus, setUser, setView } = tasksSlice.actions;

export default tasksSlice.reducer;
