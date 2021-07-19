import { createSlice } from '@reduxjs/toolkit';

const userDataSlice = createSlice({
  name: 'userDataSlice',
  initialState: { user: [] },
  reducers: {
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
  },
});

export const userActions = userDataSlice.actions;

export default userDataSlice;
