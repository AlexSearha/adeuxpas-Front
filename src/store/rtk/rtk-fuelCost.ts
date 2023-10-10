// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FuelCostApiRoot } from '../../@types';

interface FuelCostDataProps {
  departureLatitude: number;
  departureLongitude: number;
}
// Define a service using a base URL and expected endpoints
export const fuelCostApi = createApi({
  reducerPath: 'fuelCostApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.prix-carburants.2aaz.fr/stations/around/',
  }),
  endpoints: (builder) => ({
    getFuelCosts: builder.mutation<FuelCostApiRoot, FuelCostDataProps>({
      query: (coordinates) => ({
        url: `${coordinates.departureLatitude},${coordinates.departureLongitude}?responseFields=Fuels,Price`,
        method: 'GET',
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetFuelCostsMutation } = fuelCostApi;
