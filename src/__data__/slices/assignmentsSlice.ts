import { AssignmentStatus } from '@api/types';
import { ASSIGNMENTS_PARAMS } from '@constants/pages';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AssignmentsState {
  params: {
    page: number;
    statuses: Array<string>;
  };
}

const initialState: AssignmentsState = {
  params: {
    page: 1,
    statuses: [AssignmentStatus.inProgress, AssignmentStatus.toDo],
  },
};

export const assignmentsSlice = createSlice({
  name: 'assignments',
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

export const { setPage, setStatus } = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
