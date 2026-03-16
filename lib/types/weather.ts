export type WeatherThemeVariant =
  | "clear-day"
  | "clear-night"
  | "cloudy-day"
  | "cloudy-night"
  | "rain"
  | "storm"
  | "snow"
  | "fog";

export type CurrentWeather = {
  temperature: number;
  feelsLike: number;
  conditionCode: number;
  conditionLabel: string;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  isDay: boolean;
  high: number;
  low: number;
};

export type HourlyForecastPoint = {
  time: string;
  temperature: number;
  precipitationProbability: number;
  conditionCode: number;
  isNow: boolean;
};

export type DailyForecastPoint = {
  date: string;
  min: number;
  max: number;
  conditionCode: number;
  sunrise: string;
  sunset: string;
};

export type AirQualitySummary = {
  aqi: number | null;
  category: string;
  label: string;
  pm25: number | null;
  pm10: number | null;
  ozone: number | null;
};

export type WeatherBundle = {
  city: {
    name: string;
    country: string;
    admin1?: string;
    latitude: number;
    longitude: number;
    timezone: string;
  };
  current: CurrentWeather;
  hourly: HourlyForecastPoint[];
  daily: DailyForecastPoint[];
  airQuality: AirQualitySummary | null;
  localTime: string;
  timezoneOffset: number;
  refreshedAt: string;
  summary: string;
  theme: WeatherThemeVariant;
};
