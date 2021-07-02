/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { auth: false, notification: null },
  reducers: {
    askAuth(state) {
      state.auth = !state.auth;
    },
    showNotification(state, { payload }) {
      state.notification = {
        status: payload.status,
        title: payload.title,
        message: payload.message,
      };
    },
  },
});


export const authActions = authSlice.actions;

export default authSlice;
