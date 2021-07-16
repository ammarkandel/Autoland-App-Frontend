import { createSlice } from '@reduxjs/toolkit';

const userDataSlice = createSlice({
  name: 'userDataSlice',
  initialState: { cars: [], appointments: [], user: [] },
  reducers: {
    getCars(state, { payload }) {
      state.cars = payload;
    },
    userData(state) {
      const getInfo = (token) => {
        if (!token) { return; }
        const baseUrl = token.split('.')[1];
        const base = baseUrl.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base));
      };
      const userData = getInfo(localStorage.getItem('jwt'));
      state.user = userData;
    },
    getAppointments(state, { payload }) {
      state.appointments = payload;
    },
  },
});

export const userActions = userDataSlice.actions;

export default userDataSlice;
