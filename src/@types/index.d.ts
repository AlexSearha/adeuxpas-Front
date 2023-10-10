// --------------------------------------------------- //
// ---------------BackEnd API------------------------- //
// --------------------------------------------------- //

export type CategoryRoot = CategoryMain[];

export interface CategoryMain {
  id: number;
  label: string;
}

export type SubCategoryRoot = SubCategoryMain[];

export interface SubCategoryMain {
  name: string;
  souscategories: SubCategoryData[];
}

export interface SubCategoryData {
  name: string;
  id: number;
}

export type ActivitiesRoot = ActivitiesMain[];

export interface ActivitiesMain {
  id: number;
  label: string;
  address: string;
  latitude: string;
  longitude: string;
  photo: string;
  sub_category_id: number;
}

// --------------------------------------------------- //
// ---------------Adresse Gouv API-------------------- //
// --------------------------------------------------- //

export interface AddressRoot {
  features: AddressFeature[];
}

export interface AddressFeature {
  geometry: AddressGeometry;
  properties: AddressProperties;
}

export interface AddressGeometry {
  type: string;
  coordinates: number[];
}

export interface AddressProperties {
  label: string;
  id: string;
  postcode: string;
  x: number;
  y: number;
  city: string;
}

// --------------------------------------------------- //
// ---------------Yelp API---------------------------- //
// --------------------------------------------------- //

export interface YelpRoot {
  businesses: BusinessYelp;
}

export interface BusinessYelp {
  name: string;
  image_url: string;
  rating: number;
  id: string;
  coordinates: Coordinates;
  location: LocationYelp;
  distance: number;
  url: string;
}

export interface CoordinatesYelp {
  latitude: number;
  longitude: number;
}

export interface LocationYelp {
  address1: string;
  city: string;
  zip_code: string;
  display_address: string;
}

export interface CenterYelp {
  longitude: number;
  latitude: number;
}

// --------------------------------------------------- //
// ---------------Yelp API---------------------------- //
// --------------------------------------------------- //

export interface ActivityAddress {
  nom: string;
  adresse: string;
  latitude: number;
  longitude: number;
  photos: string;
  activite: string;
}

// --------------------------------------------------- //
// ---------------Toll PTV API------------------------ //
// --------------------------------------------------- //

export interface RootPTV {
  toll: TollPTV;
}

export interface TollPTV {
  costs: CostsPTV;
}

export interface CostsPTV {
  convertedPrice: PricePTV;
}

export interface PricePTV {
  price: number;
  currency: string;
}

export interface RootPTVemission {
  emissions: EmissionsPTVemission;
}

export interface EmissionsPTVemission {
  en16258_2012: En162582012PTVemission;
}

export interface En162582012PTVemission {
  fuelConsumption: number;
  co2eWellToWheel: number;
  energyUseWellToWheel: number;
}

export interface CostRoot {
  monetaryCosts: MonetaryCosts;
  travelTime: number;
  distance: number;
}

export interface MonetaryCosts {
  currency: string;
  distanceCost: number;
  tollCost: number;
  totalCost: number;
}

// --------------------------------------------------- //
// ---------------Reducers---------------------------- //
// --------------------------------------------------- //

export interface SearchStoreProps {
  addressDeparture: string;
  departureCoordinates: number[] | null;
  departureDate: string;
  addressArrival: ActivitiesMain | null;
  arrivalCoordinates: number[] | null;
  arrivalDate: string;
  category: string;
  activity: string;
  voyager: number | null;
  direction: string;
  areaCoordinates: number[][];
}

// --------------------------------------------------- //
// ---------------FUEL Cost API----------------------- //
// --------------------------------------------------- //

export type FuelCostApiRoot = FuelCostApiMain[];

export interface FuelCostApiMain {
  id: number;
  Fuels: Fuel[];
  LastUpdate: LastUpdate;
}

export interface Fuel {
  id: number;
  name: string;
  available: boolean;
  Price: Price;
}

export interface Price {
  value: number;
  currency: string;
  text: string;
}
