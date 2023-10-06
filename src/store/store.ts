import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { addressGouvApi } from './rtk/rtk-address';
import { categogiesBackEndApi } from './rtk/rtkCategories';

// ...

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [addressGouvApi.reducerPath]: addressGouvApi.reducer,
    [categogiesBackEndApi.reducerPath]: categogiesBackEndApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      addressGouvApi.middleware,
      categogiesBackEndApi.middleware
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
