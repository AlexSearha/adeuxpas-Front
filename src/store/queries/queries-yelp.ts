// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BusinessYelp } from '../../@types';

interface BodyYelpProps {
  latitude: number;
  longitude: number;
  term: string;
}
// Define a service using a base URL and expected endpoints
export const yelpApi = createApi({
  reducerPath: 'yelpApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (builder) => ({
    getHotelList: builder.mutation<BusinessYelp[], BodyYelpProps>({
      query: (value) => ({
        url: 'yelp',
        method: 'POST',
        body: value,
      }),
    }),
    getRestaurantsList: builder.mutation<BusinessYelp[], BodyYelpProps>({
      query: (value) => ({
        url: 'yelp',
        method: 'POST',
        body: value,
      }),
    }),
    getStoresList: builder.mutation<BusinessYelp[], BodyYelpProps>({
      query: (value) => ({
        url: 'yelp',
        method: 'POST',
        body: value,
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetHotelListMutation,
  useGetRestaurantsListMutation,
  useGetStoresListMutation,
} = yelpApi;
