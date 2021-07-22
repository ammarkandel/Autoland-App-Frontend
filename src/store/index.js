import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from './slices/AuthSlice';
import userDataSlice from './slices/UserDataSlice';
import { appointments } from './services/appointment_slice';
import { getCars } from './services/get_cars_slice';

const addMiddlewares = [appointments.middleware,
  getCars.middleware];

const store = configureStore({
  reducer: {
    authInfo: authSlice.reducer,
    userInfo: userDataSlice.reducer,
    [appointments.reducerPath]: appointments.reducer,
    [getCars.reducerPath]: getCars.reducer,
  },
  middleware: (getDefaultMiddiware) => getDefaultMiddiware().concat(...addMiddlewares),
});

setupListeners(store.dispatch);

export default store;
