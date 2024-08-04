import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaseErrorI, common } from '@api/index';
import { LOCAL_KEYS } from '@constants/common';

export interface AuthState {
  userId: string;
  token: string | null;
  isAuth: boolean;
  isLoading: boolean;
  error: BaseErrorI['error'] | null;
}

const initialState: AuthState = {
  userId: '',
  token: null,
  isAuth: false,
  isLoading: false,
  error: null,
};

export const authAsync = createAsyncThunk('auth/authUser', async (initData: string, { rejectWithValue }) => {
  const data = await common.authUser(initData);
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

      state.userId = '';
      state.token = null;
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
