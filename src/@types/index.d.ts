// --------------------------------------------------- //
// ---------------Adresse Gouv API-------------------- //
// --------------------------------------------------- //
export interface Root {
  // type: string;
  features: Feature[];
}

export interface Feature {
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  coordinates: number[];
}

export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface Properties {
  label: string;
  id: string;
}

// Categories
export interface Categories {
  id: number;
  label: string;
  sub_category: SubCategory[];
}

export interface SubCategory {
  id: number;
  label: string;
}

export interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export interface SearchResult {
  title: string;
  description: string;
  imageUrl: string;
}

interface CardsCarouselProps {
  searchResults: CardProps[];
}

export interface AreaCoordinates {
  areaCoordinates: number[][];
}

// --------------------------------------------------- //
// ---------------Yelp API---------------------------- //
// --------------------------------------------------- //

export interface RootYelp {
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
  prices: PricePTV[];
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
