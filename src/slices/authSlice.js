import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

// check login status on refresh
export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, thunkAPI) => {
  try {
    const { data } = await api.get('/auth/me');
    return data.user;
  } catch {
    return thunkAPI.rejectWithValue(null);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.post('/auth/logout');
  } catch {
    return thunkAPI.rejectWithValue(null);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: true,  // true on startup so we wait for /me check
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.loading = false;
    },
    clearUser(state) {
      state.user = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;