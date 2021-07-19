import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from './slices/AuthSlice';
import userDataSlice from './slices/UserDataSlice';
import { getAppointments } from './actions/get_appointments';
import { getCars } from './actions/get_cars_action';

const store = configureStore({
  reducer: {
    authInfo: authSlice.reducer,
    userInfo: userDataSlice.reducer,
    [getAppointments.reducerPath]: getAppointments.reducer,
    [getCars.reducerPath]: getCars.reducer,
  },
  middleware: (getDefaultMiddiware) => getDefaultMiddiware().concat(...[getAppointments.middleware, getCars.middleware]),
});

setupListeners(store.dispatch);

export default store;
