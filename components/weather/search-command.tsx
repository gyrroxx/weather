"use client";

import { LoaderCircle, Search, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useCitySearch } from "@/hooks/use-city-search";
import type { CitySearchResult } from "@/lib/types/city";

const suggestedCities: CitySearchResult[] = [
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    admin1: "Tokyo",
    latitude: 35.6895,
    longitude: 139.6917,
    timezone: "Asia/Tokyo",
  },
  {
    id: "new-york",
    name: "New York",
    country: "United States",
    admin1: "New York",
    latitude: 40.7128,
    longitude: -74.006,
    timezone: "America/New_York",
  },
  {
    id: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    admin1: "Western Cape",
    latitude: -33.9249,
    longitude: 18.4241,
    timezone: "Africa/Johannesburg",
  },
];

export function SearchCommand({
  selectedCity,
  recentCities,
  onSelect,
}: {
  selectedCity: CitySearchResult | null;
  recentCities: CitySearchResult[];
  onSelect: (city: CitySearchResult) => void;
}) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [open, setOpen] = useState(false);
  const { data, isFetching, isError } = useCitySearch(debouncedQuery);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedQuery(query), 220);
    return () => window.clearTimeout(timeout);
  }, [query]);

  const options = useMemo(() => {
    if (debouncedQuery.trim().length >= 2) {
      return data ?? [];
    }

    return recentCities.length ? recentCities : suggestedCities;
  }, [data, debouncedQuery, recentCities]);

  return (
    <div className="relative w-full max-w-xl">
      <div className="surface-glass ui-border-soft flex items-center gap-3 rounded-full border px-4 py-3">
        <Search className="ui-text-soft h-4 w-4" />
        <input
          value={query}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={selectedCity ? `Switch from ${selectedCity.name}` : "Search any city in the world"}
          className="ui-text-strong w-full bg-transparent text-sm placeholder:text-[color:var(--ui-text-soft)] focus:outline-none"
        />
        {isFetching ? <LoaderCircle className="ui-text-soft h-4 w-4 animate-spin" /> : null}
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="surface-glass ui-border-soft absolute inset-x-0 top-[calc(100%+0.75rem)] z-20 rounded-3xl border p-3"
          >
            {isError ? (
              <div className="ui-panel-soft ui-text-muted rounded-2xl p-4 text-sm">
                Search is temporarily unavailable.
              </div>
            ) : options.length ? (
              <div className="space-y-2">
                {(debouncedQuery.trim().length >= 2 ? options : options.slice(0, 5)).map((city) => (
                  <button
                    key={city.id}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      onSelect(city);
                      setQuery("");
                      setOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition hover:bg-[color:var(--ui-panel)]"
                  >
                    <div>
                      <p className="ui-text-strong text-sm font-medium">{city.name}</p>
                      <p className="ui-text-soft text-xs">
                        {[city.admin1, city.country].filter(Boolean).join(", ")}
                      </p>
                    </div>
                    {recentCities.some((entry) => entry.id === city.id) ? (
                      <Star className="h-4 w-4 text-amber-200" />
                    ) : null}
                  </button>
                ))}
              </div>
            ) : (
              <div className="ui-panel-soft ui-text-muted rounded-2xl p-4 text-sm">
                No matching cities found. Try a larger city or alternative spelling.
              </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
