// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FavoriteApiMain, FavoriteApiRoot } from '../../@types';

interface GetOneFavoritesProps {
  userId: number;
  favoriteId?: number;
}

// Define a service using a base URL and expected endpoints
export const favoriteBackEndApi = createApi({
  reducerPath: 'favoriteApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
  }),
  tagTypes: ['Favorite'],
  endpoints: (builder) => ({
    getAllFavorites: builder.query<FavoriteApiRoot, number | null>({
      providesTags: ['Favorite'],
      query: (userId) => ({
        url: `member/${userId}/favorite`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    getOneFavorite: builder.query<FavoriteApiMain, GetOneFavoritesProps>({
      providesTags: ['Favorite'],
      query: ({ userId, favoriteId }) => ({
        url: `member/${userId}/favorite/${favoriteId}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    addOneFavorite: builder.mutation<FavoriteApiMain[], FavoriteApiMain>({
      invalidatesTags: ['Favorite'],
      query: ({ id, ...patch }) => ({
        url: `member/${id}/favorite`,
        method: 'POST',
        body: patch,
        credentials: 'include',
      }),
    }),
    deleteOneFavorite: builder.mutation<void, GetOneFavoritesProps>({
      invalidatesTags: ['Favorite'],
      query: ({ userId, favoriteId }) => ({
        url: `member/${userId}/favorite/${favoriteId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllFavoritesQuery,
  useGetOneFavoriteQuery,
  useAddOneFavoriteMutation,
  useDeleteOneFavoriteMutation,
} = favoriteBackEndApi;
