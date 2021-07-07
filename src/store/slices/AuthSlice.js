/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { notification: null },
  reducers: {
    showNotification(state, { payload }) {
      state.notification = {
        status: payload.status,
        title: payload.title,
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
