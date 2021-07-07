/* eslint-disable */
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/AuthSlice';
import userDataSlice from './slices/UserDataSlice';

const store = configureStore({
 reducer: {
    authInfo: authSlice.reducer,
    userInfo: userDataSlice.reducer,
 },
});

export default store;
