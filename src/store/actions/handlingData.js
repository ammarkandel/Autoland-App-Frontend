/* eslint-disable */
export const handleLogin = (dataAction) => {
  const result = {
    [dataAction.pending]: (state) => {
      state.status = 'loading';
    },
    [dataAction.rejected]: (state) => {
      state.status = 'failed';
    },
    [dataAction.fulfilled]: (state) => {
      state.auth = true
      state.status = 'success';
    },
  };
  return result;
};
