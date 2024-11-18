import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_KEYS } from '@constants/common';
import common from '@api/common';
import { BaseErrorI } from '@api/types';

export interface AuthState {
  userId?: number;
  token?: string;
  isAuth: boolean;
  isLoading: boolean;
  error: BaseErrorI['error'] | null;
}

interface AuthParamI {
  initData?: string;
  user?: number;
}

const initialState: AuthState = {
  userId: undefined,
  token: undefined,
  isAuth: false,
  isLoading: false,
  error: null,
};

export const authAsync = createAsyncThunk('auth/authUser', async (params: AuthParamI, { rejectWithValue }) => {
  const data = await common.authUser(params.initData, params.user);
  if (data.status) {
    return data.body;
  }

  return rejectWithValue(data.error);
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthUser: (state) => {
      localStorage.removeItem(LOCAL_KEYS.AUTH);

      state.userId = undefined;
      state.token = undefined;
      state.isAuth = false;
    },
    setError: (state, action: PayloadAction<BaseErrorI['error'] | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.error = null;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
      })
      .addCase(authAsync.rejected, (state, action) => {
        const error = action.payload as BaseErrorI['error'];
        state.isLoading = false;
        state.error = error;
      });
  },
});

export const { clearAuthUser, setError } = authSlice.actions;

export default authSlice.reducer;
