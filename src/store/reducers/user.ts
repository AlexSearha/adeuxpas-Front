import { createAction, createReducer } from '@reduxjs/toolkit';
import { SearchStoreProps, UserInformationsProps } from '../../@types';

const searchInitialState: SearchStoreProps = {
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

const userInformations: UserInformationsProps = {
  id: null,
  email: '',
  firstname: '',
  lastname: '',
  phone_number: '',
  address: '',
};

// ----------------------USER SEARCH REDUCER---------------------- //

export const searchStore = createAction<SearchStoreProps>(
  'userSearch/searchstore'
);

export const updateAreaCoordinates = createAction<SearchStoreProps>(
  'userSearch/updateAreaCoordinates'
);

export const updateArrivalCoordinates = createAction<SearchStoreProps>(
  'userSearch/updateArrivalCoordinates'
);

export const updateActivityAddress = createAction<SearchStoreProps>(
  'userSearch/updateActivityAddress'
);

export const userSearchReducer = createReducer(
  searchInitialState,
  (builder) => {
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
  }
);

// ----------------------USER INFORMATION REDUCER---------------------- //

export const updateUserInformations = createAction<UserInformationsProps>(
  'userInformations/updateUserInformations'
);
export const resetUserInformations = createAction<void>(
  'userInformations/resetUserInformations'
);

export const userInformationsReducer = createReducer(
  userInformations,
  (builder) => {
    builder
      .addCase(updateUserInformations, (state, action) => {
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.firstname = action.payload.firstname;
        state.lastname = action.payload.lastname;
        state.phone_number = action.payload.phone_number;
        state.address = action.payload.address;
      })
      .addCase(resetUserInformations, () => {
        return userInformations;
      });
  }
);
