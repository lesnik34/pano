import { RootState } from '../types';

export const selectCount = (state: RootState) => state.counter.value;
