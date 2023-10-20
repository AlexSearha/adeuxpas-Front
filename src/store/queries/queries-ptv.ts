// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  BusinessYelp,
  CostRoot,
  CostsPTV,
  RootPTV,
  RootPTVemission,
  TollPTV,
} from '../../@types';
import apiKeys from '../../env/env';

const { aptApiKey } = apiKeys;

interface PtvDataProps {
  departureLatitude: number;
  departureLongitude: number;
  arrivalLatitude: number;
  arrivalLongitude: number;
}

// Define a service using a base URL and expected endpoints
export const ptvApi = createApi({
  reducerPath: 'ptvApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.myptv.com/routing/v1/routes/',
  }),
  endpoints: (builder) => ({
    getEmission: builder.mutation<RootPTVemission, PtvDataProps>({
      query: (value) => ({
        url: `?waypoints=${value.departureLatitude},${value.departureLongitude}&waypoints=${value.arrivalLatitude},${value.arrivalLongitude}&results=EMISSIONS_EN16258_2012_HBEFA&vehicle[fuelType]=DIESEL&apiKey=${aptApiKey}`,
        method: 'GET',
      }),
    }),
    getCost: builder.mutation<CostRoot, PtvDataProps>({
      query: (value) => ({
        url: `?waypoints=${value.departureLatitude},${value.departureLongitude}&waypoints=${value.arrivalLatitude},${value.arrivalLongitude}&vehicle[engineType]=HYBRID&vehicle[hybridRatio]=50&vehicle[electricityType]=BATTERY&vehicle[averageElectricityConsumption]=100&options[currency]=EUR&profile=EUR_CAR&monetaryCostOptions[costPerKilometer]=1.2&monetaryCostOptions[workingCostPerHour]=20.5&results=POLYLINE,MONETARY_COSTS&options[routingMode]=FAST&apiKey=${aptApiKey}`,
        method: 'GET',
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetEmissionMutation, useGetCostMutation } = ptvApi;
