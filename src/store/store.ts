import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { addressGouvApi } from './queries/queries-address';
import { categoriesBackEndApi } from './queries/queries-categories';
import { userSearchReducer, userInformationsReducer } from './reducers/user';
import { activitiesBackEndApi } from './queries/queries-activities';
import { yelpApi } from './queries/queries-yelp';
import { ptvApi } from './queries/queries-ptv';
import { fuelCostApi } from './queries/queries-fuelCost';
import { authApi } from './queries/queries-auth';
import { userBackEndApi } from './queries/queries-user';
import { favoriteBackEndApi } from './queries/queries-favorites';

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
    [userBackEndApi.reducerPath]: userBackEndApi.reducer,
    [favoriteBackEndApi.reducerPath]: favoriteBackEndApi.reducer,
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
      authApi.middleware,
      userBackEndApi.middleware,
      favoriteBackEndApi.middleware
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
