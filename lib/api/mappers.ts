import { getWeatherTheme } from "@/lib/constants/theme";
import { getWeatherLabel } from "@/lib/constants/weather-codes";
import type { CitySearchResult } from "@/lib/types/city";
import type { AirQualitySummary, WeatherBundle } from "@/lib/types/weather";

type WeatherPayload = {
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset_seconds: number;
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    pressure_msl: number;
    visibility: number;
    is_day: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: Array<number | null>;
    weather_code: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
  };
};

type AirPayload = {
  hourly: {
    us_aqi?: Array<number | null>;
    pm10?: Array<number | null>;
    pm2_5?: Array<number | null>;
    ozone?: Array<number | null>;
  };
};

function mapAirQuality(payload: AirPayload): AirQualitySummary | null {
  const aqi = payload.hourly.us_aqi?.[0] ?? null;
  const pm25 = payload.hourly.pm2_5?.[0] ?? null;
  const pm10 = payload.hourly.pm10?.[0] ?? null;
  const ozone = payload.hourly.ozone?.[0] ?? null;

  if (aqi == null && pm25 == null && pm10 == null && ozone == null) {
    return null;
  }

  if (aqi == null) {
    return {
      aqi: null,
      category: "Unavailable",
      label: "Air quality data is limited for this location right now.",
      pm25,
      pm10,
      ozone,
    };
  }

  const category =
    aqi <= 50
      ? "Good"
      : aqi <= 100
        ? "Moderate"
        : aqi <= 150
          ? "Unhealthy for sensitive groups"
          : aqi <= 200
            ? "Unhealthy"
            : "Very unhealthy";

  const label =
    aqi <= 50
      ? "Excellent outdoor conditions."
      : aqi <= 100
        ? "Air is fair for most people."
        : "Sensitive groups should limit longer outdoor exposure.";

  return {
    aqi,
    category,
    label,
    pm25,
    pm10,
    ozone,
  };
}

export function mapWeatherBundle(
  city: CitySearchResult,
  weather: WeatherPayload,
  airQuality: AirPayload | null,
): WeatherBundle {
  const currentCode = weather.current.weather_code;
  const isDay = weather.current.is_day === 1;
  const theme = getWeatherTheme(currentCode, isDay);
  const hourly = weather.hourly.time.slice(0, 24).map((time, index) => ({
    time,
    temperature: weather.hourly.temperature_2m[index],
    precipitationProbability: weather.hourly.precipitation_probability[index] ?? 0,
    conditionCode: weather.hourly.weather_code[index],
    isNow: index === 0,
  }));
  const daily = weather.daily.time.slice(0, 7).map((date, index) => ({
    date,
    min: weather.daily.temperature_2m_min[index],
    max: weather.daily.temperature_2m_max[index],
    conditionCode: weather.daily.weather_code[index],
    sunrise: weather.daily.sunrise[index],
    sunset: weather.daily.sunset[index],
  }));

  const current = {
    temperature: weather.current.temperature_2m,
    feelsLike: weather.current.apparent_temperature,
    conditionCode: currentCode,
    conditionLabel: getWeatherLabel(currentCode),
    humidity: weather.current.relative_humidity_2m,
    windSpeed: weather.current.wind_speed_10m,
    windDirection: weather.current.wind_direction_10m,
    pressure: weather.current.pressure_msl,
    visibility: weather.current.visibility / 1000,
    isDay,
    high: weather.daily.temperature_2m_max[0],
    low: weather.daily.temperature_2m_min[0],
  };

  const summary = `${current.conditionLabel} with ${Math.round(current.windSpeed)} km/h winds and a feels-like temperature of ${Math.round(current.feelsLike)} degrees.`;

  return {
    city: {
      name: city.name,
      country: city.country,
      admin1: city.admin1,
      latitude: city.latitude,
      longitude: city.longitude,
      timezone: weather.timezone,
    },
    current,
    hourly,
    daily,
    airQuality: airQuality ? mapAirQuality(airQuality) : null,
    localTime: weather.current.time,
    timezoneOffset: weather.utc_offset_seconds,
    refreshedAt: new Date().toISOString(),
    summary,
    theme,
  };
}
