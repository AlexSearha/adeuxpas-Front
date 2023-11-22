// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const userBackEndApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUserInfos: builder.query<any, number>({
      providesTags: ['User'],
      query: (userId) => ({
        url: `member/${userId}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    patchUserInfos: builder.mutation<any, any>({
      invalidatesTags: ['User'],
      query: ({ userId, ...patch }) => ({
        url: `member/${userId}`,
        method: 'PATCH',
        body: patch,
        credentials: 'include',
      }),
    }),
    deleteAccount: builder.mutation<void, number>({
      invalidatesTags: ['User'],
      query: (userId) => ({
        url: `member/${userId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  usePatchUserInfosMutation,
  useGetUserInfosQuery,
  useDeleteAccountMutation,
} = userBackEndApi;
