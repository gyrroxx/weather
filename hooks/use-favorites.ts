"use client";

import { useEffect, useMemo, useState } from "react";
import type { CitySearchResult, FavoriteCity } from "@/lib/types/city";

const STORAGE_KEY = "aether-weather-favorites";
const RECENT_KEY = "aether-weather-recent";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function useFavorites() {
  const hydrated = typeof window !== "undefined";
  const [favorites, setFavorites] = useState<FavoriteCity[]>(() => readJson(STORAGE_KEY, []));
  const [recentCities, setRecentCities] = useState<CitySearchResult[]>(() => readJson(RECENT_KEY, []));

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(recentCities.slice(0, 5)));
  }, [recentCities, hydrated]);

  const favoriteIds = useMemo(() => new Set(favorites.map((city) => city.id)), [favorites]);

  const toggleFavorite = (city: CitySearchResult) => {
    setFavorites((current) => {
      const exists = current.some((entry) => entry.id === city.id);
      if (exists) {
        return current.filter((entry) => entry.id !== city.id);
      }

      return [{ ...city, addedAt: new Date().toISOString() }, ...current].slice(0, 6);
    });
  };

  const saveRecent = (city: CitySearchResult) => {
    setRecentCities((current) => {
      const next = [city, ...current.filter((entry) => entry.id !== city.id)];
      return next.slice(0, 5);
    });
  };

  return {
    favorites,
    favoriteIds,
    recentCities,
    hydrated,
    toggleFavorite,
    saveRecent,
  };
}
