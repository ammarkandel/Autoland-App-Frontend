/* eslint-disable */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addSignup = createApi({
  reducerPath: "signup",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://autoland-api.herokuapp.com",
    prepareHeaders: (headers) => {
      headers.set('Content-type', 'application/x-www-form-urlencoded')

      return headers
    },
  }),
  endpoints: (builder) => ({
    addSignup: builder.mutation({
      query(body) {
        return {
          url: `auth/signup`,
          method: 'POST',
          body,
        }
      },
    }),
  }),
});

export const { useAddSignupMutation } = addSignup;
