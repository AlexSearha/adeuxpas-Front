import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { addressGouvApi } from './rtk/rtk-address';
import { categoriesBackEndApi } from './rtk/rtkCategories';
import { userSearchReducer, userInformationsReducer } from './reducers/user';
import { activitiesBackEndApi } from './rtk/rtk-activities';
import { yelpApi } from './rtk/rtk-yelp';
import { ptvApi } from './rtk/rtk-ptv';
import { fuelCostApi } from './rtk/rtk-fuelCost';
import { authApi } from './rtk/rtk-auth';

// ...

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [addressGouvApi.reducerPath]: addressGouvApi.reducer,
    [categoriesBackEndApi.reducerPath]: categoriesBackEndApi.reducer,
    [activitiesBackEndApi.reducerPath]: activitiesBackEndApi.reducer,
    [yelpApi.reducerPath]: yelpApi.reducer,
    [ptvApi.reducerPath]: ptvApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [fuelCostApi.reducerPath]: fuelCostApi.reducer,
    userSearchReducer,
    userInformationsReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      addressGouvApi.middleware,
      categoriesBackEndApi.middleware,
      activitiesBackEndApi.middleware,
      yelpApi.middleware,
      ptvApi.middleware,
      fuelCostApi.middleware,
      authApi.middleware
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
