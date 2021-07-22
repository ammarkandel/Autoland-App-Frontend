import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from './slices/AuthSlice';
import userDataSlice from './slices/UserDataSlice';
import { getAppointments } from './services/get_appointments_slice';
import { getCars } from './services/get_cars_slice';
import { addTestDrive } from './services/book_appointment_slice';

const addMiddlewares = [getAppointments.middleware,
  getCars.middleware,
  addTestDrive.middleware];

const store = configureStore({
  reducer: {
    authInfo: authSlice.reducer,
    userInfo: userDataSlice.reducer,
    [getAppointments.reducerPath]: getAppointments.reducer,
    [getCars.reducerPath]: getCars.reducer,
    [addTestDrive.reducerPath]: addTestDrive.reducer,
  },
  middleware: (getDefaultMiddiware) => getDefaultMiddiware().concat(...addMiddlewares),
});

setupListeners(store.dispatch);

export default store;
