// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ActivitiesRoot } from '../../@types';

// Define a service using a base URL and expected endpoints
export const activitiesBackEndApi = createApi({
  reducerPath: 'activitiesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (builder) => ({
    getActivitiesList: builder.query<ActivitiesRoot, void>({
      query: () => `activity`,
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetActivitiesListQuery } = activitiesBackEndApi;
