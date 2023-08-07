import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import { backEndAPI, ptvAPI } from '../../utils/axios';
import {
  ActivityAddress,
  BusinessYelp,
  Geometry,
  RootPTV,
  RootPTVemission,
} from '../../@types';

interface SearchState {
  address: string;
  activityAddress: ActivityAddress[];
  category: string;
  activity: string;
  arrivalDate: string;
  tolls: RootPTV[];
  fuelConsumption: RootPTVemission[];
  departureDate: string;
  voyager: number;
  direction: string;
  departureCoordinates: Geometry[];
  arrivalCoordinates: Geometry[];
  areaCoordinates: number[][];
  carbonFootprint: RootPTVemission[];
  hotelListSuggered: BusinessYelp[];
  restaurantListSuggered: BusinessYelp[];
  marketListSuggered: BusinessYelp[];
  isLoading: boolean;
}

export const initialState: SearchState = {
  address: '',
  activityAddress: [],
  category: '',
  activity: '',
  arrivalDate: '',
  tolls: [],
  fuelConsumption: [],
  departureDate: '',
  voyager: 2,
  direction: '',
  departureCoordinates: [],
  arrivalCoordinates: [],
  areaCoordinates: [],
  carbonFootprint: [],
  hotelListSuggered: [],
  restaurantListSuggered: [],
  marketListSuggered: [],
  isLoading: false,
};

export const getSearchDatas = createAction<SearchState>('search/getSearchdata');

export const updateActivityAddress = createAction<ActivityAddress[]>(
  'search/updateActivityAddress'
);
export const updateAreaCoordinates = createAction<SearchState>(
  'search/updateAreaCoordinates'
);

export const updateArrivalCoordinates = createAction<SearchState>(
  'search/updateArrivalCoordinates'
);

export const fetchTolls = createAsyncThunk(
  'search/getTolls',
  async ({
    latitudeStart,
    longitudeStart,
    latitudeEnd,
    longitudeEnd,
  }: {
    latitudeStart: number;
    longitudeStart: number;
    latitudeEnd: number;
    longitudeEnd: number;
  }) => {
    const { data } = await ptvAPI.get<RootPTV[]>(
      `?waypoints=${latitudeStart},${longitudeStart}&waypoints=${latitudeEnd},${longitudeEnd}&results=TOLL_COSTS&options[trafficMode]=AVERAGE&apiKey=RVVfMGEwNTJjM2MwMGI1NDFlNGI2OTFjNGZiOGNhZmI3MTk6NThmM2YwM2UtMDEzYy00ZDkxLTk2YjQtNTE5OGRlYTg5M2Rm`
    );
    return data as RootPTV[];
  }
);

export const fetchFuelConsumption = createAsyncThunk(
  'search/getFuelConsumption',
  async ({
    latitudeStart,
    longitudeStart,
    latitudeEnd,
    longitudeEnd,
  }: {
    latitudeStart: number;
    longitudeStart: number;
    latitudeEnd: number;
    longitudeEnd: number;
  }) => {
    const { data } = await ptvAPI.get<RootPTVemission[]>(
      `?waypoints=${latitudeStart},${longitudeStart}&waypoints=${latitudeEnd},${longitudeEnd}&results=EMISSIONS_EN16258_2012_HBEFA&vehicle[engineType]=COMBUSTION&vehicle[fuelType]=DIESEL&options[trafficMode]=AVERAGE&apiKey=RVVfMGEwNTJjM2MwMGI1NDFlNGI2OTFjNGZiOGNhZmI3MTk6NThmM2YwM2UtMDEzYy00ZDkxLTk2YjQtNTE5OGRlYTg5M2Rm`
    );
    return data as RootPTVemission[];
  }
);

export const fetchYelpHotels = createAsyncThunk(
  'search/getSearchHotel',
  async ({
    latitude,
    longitude,
    term,
  }: {
    latitude: number;
    longitude: number;
    term: string;
  }) => {
    const bodyData = {
      latitude,
      longitude,
      term,
    };
    const { data } = await backEndAPI.post<BusinessYelp[]>(`yelp`, bodyData);
    return data as BusinessYelp[];
  }
);

export const fetchYelpRestaurants = createAsyncThunk(
  'search/getSearchRestaurants',
  async ({
    latitude,
    longitude,
    term,
  }: {
    latitude: number;
    longitude: number;
    term: string;
  }) => {
    const bodyData = {
      latitude,
      longitude,
      term,
    };
    const { data } = await backEndAPI.post<BusinessYelp[]>(`yelp`, bodyData);
    return data as BusinessYelp[];
  }
);

export const fetchYelpMarkets = createAsyncThunk(
  'search/getSearchMarkets',
  async ({
    latitude,
    longitude,
    term,
  }: {
    latitude: number;
    longitude: number;
    term: string;
  }) => {
    const bodyData = {
      latitude,
      longitude,
      term,
    };
    const { data } = await backEndAPI.post<BusinessYelp[]>(`yelp`, bodyData);
    return data as BusinessYelp[];
  }
);

const searchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getSearchDatas, (state, action) => {
      state.address = action.payload.address;
      state.category = action.payload.category;
      state.activity = action.payload.activity;
      state.arrivalDate = action.payload.arrivalDate;
      state.departureDate = action.payload.departureDate;
      state.direction = action.payload.direction;
      state.voyager = action.payload.voyager;
      state.departureCoordinates = action.payload.departureCoordinates;
    })
    .addCase(updateActivityAddress, (state, action) => {
      state.activityAddress = action.payload;
    })
    .addCase(updateAreaCoordinates, (state, action) => {
      state.areaCoordinates = action.payload.areaCoordinates;
    })
    .addCase(updateArrivalCoordinates, (state, action) => {
      state.arrivalCoordinates = action.payload.arrivalCoordinates;
    })
    .addCase(fetchYelpHotels.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchYelpHotels.fulfilled, (state, action) => {
      state.hotelListSuggered = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchYelpRestaurants.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchYelpRestaurants.fulfilled, (state, action) => {
      state.restaurantListSuggered = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchYelpMarkets.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchYelpMarkets.fulfilled, (state, action) => {
      state.marketListSuggered = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchTolls.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchTolls.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tolls = action.payload;
    })
    .addCase(fetchFuelConsumption.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchFuelConsumption.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fuelConsumption = action.payload;
    });
});

export default searchReducer;
