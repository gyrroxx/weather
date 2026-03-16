export type CitySearchResult = {
  id: string;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone: string;
};

export type SelectedCity = CitySearchResult;

export type FavoriteCity = CitySearchResult & {
  addedAt: string;
};
