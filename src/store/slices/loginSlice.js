/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import login from '../actions/login';
import { handleLogin } from '../actions/handlingData';

const loginSlice = createSlice({
  name: 'userLogin',
  initialState: {
    auth: false,
    status: null
  },
  extraReducers: handleLogin(login),
});

export default loginSlice;
