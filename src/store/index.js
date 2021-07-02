/* eslint-disable */
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/AuthSlice';

const store = configureStore({
 reducer: {
    authInfo: authSlice.reducer,
 },
});

export default store;
