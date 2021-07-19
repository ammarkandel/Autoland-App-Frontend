import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from './slices/AuthSlice';
import userDataSlice from './slices/UserDataSlice';
import { getAppointments } from './actions/get_appointments';
import { getCars } from './actions/get_cars_action';
import { addTestDrive } from './actions/book_appointment_action';
import { addLogin } from './actions/login_action';
import { addSignup } from './actions/signup_action';

const addMiddlewares = [getAppointments.middleware,
  getCars.middleware,
  addTestDrive.middleware,
  addLogin.middleware, addSignup.middleware];

const store = configureStore({
  reducer: {
    authInfo: authSlice.reducer,
    userInfo: userDataSlice.reducer,
    [getAppointments.reducerPath]: getAppointments.reducer,
    [getCars.reducerPath]: getCars.reducer,
    [addTestDrive.reducerPath]: addTestDrive.reducer,
    [addLogin.reducerPath]: addLogin.reducer,
    [addSignup.reducerPath]: addSignup.reducer,
  },
  middleware: (getDefaultMiddiware) => getDefaultMiddiware().concat(...addMiddlewares),
});

setupListeners(store.dispatch);

export default store;
