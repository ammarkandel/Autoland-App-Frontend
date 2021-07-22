import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const addLogin = createApi({
  reducerPath: 'login',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://autoland-api.herokuapp.com',
    prepareHeaders: (headers) => {
      headers.set('Content-type', 'application/x-www-form-urlencoded');

      return headers;
    },
  }),
  tagTypes: ['Login'],
  endpoints: (builder) => ({
    addLogin: builder.mutation({
      query(body) {
        return {
          url: 'auth/signin',
          method: 'POST',
          body,
        };
      },
      transformResponse: (response) => {
        localStorage.setItem('jwt', response.jwt);
      },
    }),
  }),
});

export const { useAddLoginMutation } = addLogin;
