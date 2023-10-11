import { createAction, createReducer } from '@reduxjs/toolkit';
import { SearchStoreProps } from '../../@types';

const initialState: SearchStoreProps = {
  addressDeparture: '',
  departureCoordinates: [],
  departureDate: '',
  addressArrival: null,
  arrivalCoordinates: [],
  arrivalDate: '',
  category: '',
  activity: '',
  voyager: null,
  direction: '',
  areaCoordinates: [],
};

export const searchStore = createAction<SearchStoreProps>('user/searchstore');

export const updateAreaCoordinates = createAction<SearchStoreProps>(
  'user/updateAreaCoordinates'
);

export const updateArrivalCoordinates = createAction<SearchStoreProps>(
  'user/updateArrivalCoordinates'
);

export const updateActivityAddress = createAction<SearchStoreProps>(
  'user/updateActivityAddress'
);

export const userSearchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(searchStore, (state, action) => {
      state.addressDeparture = action.payload.addressDeparture;
      state.departureCoordinates = action.payload.departureCoordinates;
      state.departureDate = action.payload.departureDate;
      state.addressArrival = action.payload.addressArrival;
      state.arrivalCoordinates = action.payload.arrivalCoordinates;
      state.arrivalDate = action.payload.arrivalDate;
      state.category = action.payload.category;
      state.activity = action.payload.activity;
      state.voyager = action.payload.voyager;
      state.direction = action.payload.direction;
    })
    .addCase(updateAreaCoordinates, (state, action) => {
      state.areaCoordinates = action.payload.areaCoordinates;
    })
    .addCase(updateArrivalCoordinates, (state, action) => {
      state.arrivalCoordinates = action.payload.arrivalCoordinates;
    })
    .addCase(updateActivityAddress, (state, action) => {
      state.addressArrival = action.payload.addressArrival;
    });
});
