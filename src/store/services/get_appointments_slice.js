import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const getAppointments = createApi({
  reducerPath: 'appointments',
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
    getAppointments: builder.query({
      query: () => 'user_appointments',
    }),
  }),
});

export const { useGetAppointmentsQuery } = getAppointments;
