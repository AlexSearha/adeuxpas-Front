import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import { addressAPI } from '../../utils/axios';

// Typescript data
import { Coordinates, Feature, Root } from '../../@types';

interface AddressesState {
  addresses: Root;
  isLoading: boolean;
  isFirstForm: boolean;
  coordinates: Coordinates[];
}

export const initialState: AddressesState = {
  addresses: [],
  isLoading: false,
  isFirstForm: true,
  coordinates: [],
};

export const setLoading = createAction<boolean>('addresses/setLoading');

export const isFirstForm = createAction<boolean>('addresses/isFirstForm');

export const getGpsCoordinates = createAction<Coordinates[]>(
  'addresses/getGpsCoordinates'
);

export const fetchAddresses = createAsyncThunk(
  'address/all',
  async (addressValue: string) => {
    const { data } = await addressAPI.get<Feature[]>(
      `?q=${addressValue}&type=housenumber&autocomplete=1`
    );
    return data as Feature[];
  }
);

const addressesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(fetchAddresses.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchAddresses.fulfilled, (state, action) => {
      state.addresses = action.payload;
      state.isLoading = false;
    })
    .addCase(isFirstForm, (state) => {
      state.isFirstForm = !state.isFirstForm;
    })
    .addCase(getGpsCoordinates, (state, action) => {
      state.coordinates = action.payload;
    });
});

export default addressesReducer;
