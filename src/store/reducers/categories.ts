import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import { backEndAPI } from '../../utils/axios';

// Typescript data
import { Feature } from '../../@types';

interface CategoryState {
  categories: string[];
  subCategories: string[];
  activitesList: string[];
  isLoading: boolean;
}

export const initialState: CategoryState = {
  categories: [],
  subCategories: [],
  activitesList: [],
  isLoading: false,
};

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async () => {
    try {
      const { data } = await backEndAPI.get('category');
      return data;
      //
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const getSubCategories = createAsyncThunk(
  'category/getSubCategories',
  async (categoryId: number) => {
    try {
      const { data } = await backEndAPI.get(
        `category/${categoryId}/sub_category`
      );
      return data;
      //
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const getActivitieslist = createAsyncThunk(
  'category/getActivitieslist',
  async (activityId: number) => {
    try {
      const { data } = await backEndAPI.get(
        `sub_category/${activityId}/activity`
      );
      // const { data } = await backEndAPI.get(`activity`);
      console.log('activités list: ', data[0].activites);
      return data[0].activites;
      //
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

const categoryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    })
    .addCase(getSubCategories.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getSubCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.subCategories = action.payload;
    })
    .addCase(getActivitieslist.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getActivitieslist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.activitesList = action.payload;
    });
});

export default categoryReducer;
