import { fetchJson } from "@/lib/api/client";
import { airQualityResponseSchema, weatherResponseSchema } from "@/lib/api/schemas";
import { mapWeatherBundle } from "@/lib/api/mappers";
import type { CitySearchResult } from "@/lib/types/city";

export async function getWeatherBundle(city: CitySearchResult) {
  const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
  weatherUrl.searchParams.set("latitude", String(city.latitude));
  weatherUrl.searchParams.set("longitude", String(city.longitude));
  weatherUrl.searchParams.set(
    "current",
    [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "weather_code",
      "wind_speed_10m",
      "wind_direction_10m",
      "pressure_msl",
      "visibility",
      "is_day",
    ].join(","),
  );
  weatherUrl.searchParams.set(
    "hourly",
    ["temperature_2m", "precipitation_probability", "weather_code"].join(","),
  );
  weatherUrl.searchParams.set(
    "daily",
    [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
    ].join(","),
  );
  weatherUrl.searchParams.set("forecast_days", "7");
  weatherUrl.searchParams.set("timezone", city.timezone || "auto");

  const airUrl = new URL("https://air-quality-api.open-meteo.com/v1/air-quality");
  airUrl.searchParams.set("latitude", String(city.latitude));
  airUrl.searchParams.set("longitude", String(city.longitude));
  airUrl.searchParams.set("hourly", ["us_aqi", "pm10", "pm2_5", "ozone"].join(","));
  airUrl.searchParams.set("timezone", city.timezone || "auto");

  const [weatherPayload, airPayload] = await Promise.all([
    fetchJson(weatherUrl).then((value) => weatherResponseSchema.parse(value)),
    fetchJson(airUrl)
      .then((value) => airQualityResponseSchema.parse(value))
      .catch(() => null),
  ]);

  return mapWeatherBundle(city, weatherPayload, airPayload);
}
