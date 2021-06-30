/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';

const login = createAsyncThunk(
  'userLogin/login',
  async (loginData) => fetch('http://localhost:3000/auth/signin', {
   method: 'POST',
   headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
   },
   body: JSON.stringify(loginData)
  }).then((res) => {
    const data = res.json();
    console.log(data);
    return data
  })
);

export default login;
