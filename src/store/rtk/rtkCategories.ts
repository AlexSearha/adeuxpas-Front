import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CategoryRoot, SubCategoryMain, SubCategoryRoot } from '../../@types';

// Define a service using a base URL and expected endpoints
export const categogiesBackEndApi = createApi({
  reducerPath: 'categoriesBackEndApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (builder) => ({
    getAllCategories: builder.query<CategoryRoot, void>({
      query: () => `category`,
    }),
    getSubCategory: builder.mutation<SubCategoryMain, string>({
      query: (categoryId) => ({
        url: `/category/${categoryId}/sub_category`,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllCategoriesQuery, useGetSubCategoryMutation } =
  categogiesBackEndApi;
