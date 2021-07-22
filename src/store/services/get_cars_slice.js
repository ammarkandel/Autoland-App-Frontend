import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const getCars = createApi({
  reducerPath: 'cars',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://autoland-api.herokuapp.com',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('jwt');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCars: builder.query({
      query: () => 'cars',
    }),
  }),
});

export const { useGetCarsQuery } = getCars;
