import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const appointments = createApi({
  reducerPath: 'appointments',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://autoland-api.herokuapp.com',
    intityTypes: 'Appointment',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('jwt');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
        headers.set('Content-type', 'application/x-www-form-urlencoded');
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: () => 'user_appointments',
      providesTages: ['Appointment'],
    }),
    addTestDrive: builder.mutation({
      query(body) {
        return {
          url: 'appointments',
          method: 'POST',
          body,
        };
      },
      invalidatesTages: ['Appointment'],
    }),
  }),
});

export const { useAddTestDriveMutation, useGetAppointmentsQuery } = appointments;
