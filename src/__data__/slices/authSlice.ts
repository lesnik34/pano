import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { common, UserI } from '@api/index';

export interface AuthState {
  user: UserI | null;
  token: string | null;
  isAuth: boolean;
  isLoading: boolean;
  isError: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuth: false,
  isLoading: false,
  isError: false,
};

export const authAsync = createAsyncThunk('auth/authUser', async (initData: string, { rejectWithValue }) => {
  const data = await common.authUser(initData);
  if (data.status) {
    return data.body;
  }

  return rejectWithValue(true);
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthUser: (state) => {
      state.user = null;
      state.token = null;
    },
    clearError: (state) => {
      state.isError = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(authAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isAuth = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(authAsync.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearAuthUser, clearError } = authSlice.actions;

export default authSlice.reducer;
