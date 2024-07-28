import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import { AppDispatch, RootState } from './types';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
