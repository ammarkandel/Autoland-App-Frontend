/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const userDataSlice = createSlice({
  name: 'userDataSlice',
  initialState: { cars: [], appointments: [] },
  reducers: {
     getCars(state, { payload }) {
        state.cars.push(payload)
    },
  },
});


export const userActions = userDataSlice.actions;

export default userDataSlice;
