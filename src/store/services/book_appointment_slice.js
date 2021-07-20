/* eslint-disable */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addTestDrive = createApi({
  reducerPath: "testDrive",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://autoland-api.herokuapp.com",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('jwt');
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
        headers.set('Content-type', 'application/x-www-form-urlencoded')
      }

      return headers
    },
  }),
  tagTypes: ['Appointment'],
  endpoints: (builder) => ({
    addTestDrive: builder.mutation({
      query(body) {
        return {
          url: `appointments`,
          method: 'POST',
          body,
        }
      }
    }),
  }),
});

export const { useAddTestDriveMutation } = addTestDrive;
