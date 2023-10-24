// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddressRoot, UserInformationsProps } from '../../@types';

interface GetLoginPost {
  email: string;
  password: string;
}

interface LoginDatas {
  refreshToken: string;
  userInformations: UserInformationsProps;
}
// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
  }),
  endpoints: (builder) => ({
    postLogin: builder.mutation<LoginDatas, GetLoginPost>({
      query: (body) => ({
        url: `login`,
        method: 'POST',
        credentials: 'include',
        body,
      }),
    }),
    postRegister: builder.mutation<AddressRoot, GetLoginPost>({
      query: (body) => ({
        url: `register`,
        method: 'POST',
        body,
      }),
    }),
    getLogout: builder.query<void, void>({
      query: () => ({
        url: 'logout',
        method: 'GET',
        credentials: 'include',
      }),
    }),
    getTokenValidity: builder.mutation<void, void>({
      query: () => ({
        url: 'token-validity',
        method: 'GET',
        credentials: 'include',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  usePostLoginMutation,
  usePostRegisterMutation,
  useLazyGetLogoutQuery,
  useGetTokenValidityMutation,
} = authApi;
