import { AssignmentStatus, ViewQueryEnum } from '@api/types';
import { VIEWED_SELF } from '@constants/pages';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AssignmentsState {
  params: {
    page: number;
    statuses: Array<string>;
    view: ViewQueryEnum;
    user: string;
  };
}

const initialState: AssignmentsState = {
  params: {
    page: 1,
    statuses: [AssignmentStatus.inProgress, AssignmentStatus.toDo],
    view: ViewQueryEnum.creator,
    user: VIEWED_SELF,
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
    setUser: (state, action: PayloadAction<string>) => {
      state.params.user = action.payload;
    },
    setView: (state, action: PayloadAction<ViewQueryEnum>) => {
      state.params.view = action.payload;
    },
  },
});

export const { setPage, setStatus, setUser, setView } = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
