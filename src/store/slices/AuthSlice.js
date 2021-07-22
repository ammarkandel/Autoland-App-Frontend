import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { notification: null },
  reducers: {
    showNotification(state, { payload }) {
      state.notification = {
        status: payload.status,
        message: payload.message,
      };
    },
    hideNotification(state, { payload }) {
      state.notification = {
        status: payload.status,
      };
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
