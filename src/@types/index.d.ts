// --------------------------------------------------- //
// -------------------Contact------------------------- //
// --------------------------------------------------- //
export interface ContactForm {
  firstname: string;
  email: string;
  message: string;
}

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
// ---------------User Reducer------------------------ //
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

export interface UserInformationsProps {
  id: number | null;
  role_id: number | null;
  isLogged: boollean;
  email: string;
  firstname: string;
  lastname: string;
  phone_number: string;
  address: string;
  photo: string;
  dateofbirth: string;
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

// --------------------------------------------------- //
// ---------------Favorite API------------------------ //
// --------------------------------------------------- //

export type FavoriteApiRoot = FavoriteApiMain[];

export interface FavoriteApiMain {
  id: number;
  address_departure: string;
  address_destination: string | undefined;
  cardinal_point: string;
  gps_latitude: string | undefined;
  gps_longitude: string | undefined;
  date_of_arrival: string;
  date_of_departure: string;
  created_at: string;
  updated_at: string | null;
  category_id: string;
  sub_category_id: number | undefined;
  activity_id: string;
  member_id: number;
}
