"use client";

import { useQuery } from "@tanstack/react-query";
import type { SelectedCity } from "@/lib/types/city";
import type { WeatherBundle } from "@/lib/types/weather";

export function useWeather(city: SelectedCity | null) {
  return useQuery<WeatherBundle>({
    queryKey: ["weather", city?.id],
    enabled: Boolean(city),
    refetchInterval: 1000 * 60 * 10,
    queryFn: async () => {
      if (!city) {
        throw new Error("No city selected.");
      }

      const params = new URLSearchParams({
        name: city.name,
        country: city.country,
        lat: String(city.latitude),
        lon: String(city.longitude),
        timezone: city.timezone,
      });

      if (city.admin1) {
        params.set("admin1", city.admin1);
      }

      const response = await fetch(`/api/weather?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Unable to load weather.");
      }

      return response.json();
    },
  });
}
