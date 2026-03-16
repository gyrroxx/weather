import { fetchJson } from "@/lib/api/client";
import { geocodingResponseSchema } from "@/lib/api/schemas";
import type { CitySearchResult } from "@/lib/types/city";

export async function searchCities(query: string): Promise<CitySearchResult[]> {
  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
  url.searchParams.set("name", query);
  url.searchParams.set("count", "8");
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  const payload = geocodingResponseSchema.parse(await fetchJson(url));

  return (payload.results ?? []).map((city) => ({
    id: city.id
      ? String(city.id)
      : `${city.name}-${city.latitude.toFixed(3)}-${city.longitude.toFixed(3)}`,
    name: city.name,
    country: city.country,
    admin1: city.admin1,
    latitude: city.latitude,
    longitude: city.longitude,
    timezone: city.timezone,
  }));
}

export async function reverseGeocode(latitude: number, longitude: number): Promise<CitySearchResult | null> {
  const url = new URL("https://geocoding-api.open-meteo.com/v1/reverse");
  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  const payload = geocodingResponseSchema.parse(await fetchJson(url));
  const city = payload.results?.[0];

  if (!city) {
    return null;
  }

  return {
    id: city.id
      ? String(city.id)
      : `${city.name}-${city.latitude.toFixed(3)}-${city.longitude.toFixed(3)}`,
    name: city.name,
    country: city.country,
    admin1: city.admin1,
    latitude: city.latitude,
    longitude: city.longitude,
    timezone: city.timezone,
  };
}
