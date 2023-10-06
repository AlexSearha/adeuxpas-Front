// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddressRoot } from '../../@types';

// Define a service using a base URL and expected endpoints
export const addressGouvApi = createApi({
  reducerPath: 'addressGouvApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-adresse.data.gouv.fr/search/',
  }),
  endpoints: (builder) => ({
    getAddressList: builder.mutation<AddressRoot, string>({
      query: (searchAddress) => ({
        url: `?q=${searchAddress}&type=housenumber&autocomplete=1`,
        method: 'GET',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAddressListMutation } = addressGouvApi;
