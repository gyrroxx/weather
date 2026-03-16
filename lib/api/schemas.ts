import { z } from "zod";

export const geocodingResponseSchema = z.object({
  results: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string(),
        country: z.string(),
        admin1: z.string().optional(),
        latitude: z.number(),
        longitude: z.number(),
        timezone: z.string(),
      }),
    )
    .optional(),
});

export const weatherResponseSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  utc_offset_seconds: z.number(),
  current: z.object({
    time: z.string(),
    temperature_2m: z.number(),
    apparent_temperature: z.number(),
    relative_humidity_2m: z.number(),
    weather_code: z.number(),
    wind_speed_10m: z.number(),
    wind_direction_10m: z.number(),
    pressure_msl: z.number(),
    visibility: z.number(),
    is_day: z.number(),
  }),
  hourly: z.object({
    time: z.array(z.string()),
    temperature_2m: z.array(z.number()),
    precipitation_probability: z.array(z.number().nullable()),
    weather_code: z.array(z.number()),
  }),
  daily: z.object({
    time: z.array(z.string()),
    weather_code: z.array(z.number()),
    temperature_2m_max: z.array(z.number()),
    temperature_2m_min: z.array(z.number()),
    sunrise: z.array(z.string()),
    sunset: z.array(z.string()),
  }),
});

export const airQualityResponseSchema = z.object({
  hourly: z.object({
    us_aqi: z.array(z.number().nullable()).optional(),
    pm10: z.array(z.number().nullable()).optional(),
    pm2_5: z.array(z.number().nullable()).optional(),
    ozone: z.array(z.number().nullable()).optional(),
  }),
});
