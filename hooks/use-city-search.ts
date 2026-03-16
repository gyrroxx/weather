"use client";

import { useQuery } from "@tanstack/react-query";
import type { CitySearchResult } from "@/lib/types/city";

export function useCitySearch(query: string) {
  return useQuery<CitySearchResult[]>({
    queryKey: ["city-search", query],
    enabled: query.trim().length >= 2,
    queryFn: async () => {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error("Unable to search cities.");
      }

      return response.json();
    },
  });
}
