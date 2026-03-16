"use client";

import { CloudAlert, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { AirQualityCard } from "@/components/weather/air-quality-card";
import { CityTimeCard } from "@/components/weather/city-time-card";
import { CurrentLocationButton } from "@/components/weather/current-location-button";
import { DynamicBackdrop } from "@/components/weather/dynamic-backdrop";
import { FavoritesRail } from "@/components/weather/favorites-rail";
import { HourlyForecast } from "@/components/weather/hourly-forecast";
import { MetricsGrid } from "@/components/weather/metrics-grid";
import { SearchCommand } from "@/components/weather/search-command";
import { SunCard } from "@/components/weather/sun-card";
import { WeatherHero } from "@/components/weather/weather-hero";
import { WeatherSummary } from "@/components/weather/weather-summary";
import { WeeklyForecast } from "@/components/weather/weekly-forecast";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { LoadingSkeleton } from "@/components/shared/loading-skeleton";
import { StatusPanel } from "@/components/shared/status-panel";
import { useFavorites } from "@/hooks/use-favorites";
import { useOnlineStatus } from "@/hooks/use-online-status";
import { useWeather } from "@/hooks/use-weather";
import type { SelectedCity } from "@/lib/types/city";
import type { WeatherThemeVariant } from "@/lib/types/weather";

const defaultCity: SelectedCity = {
  id: "almaty-default",
  name: "Almaty",
  country: "Kazakhstan",
  admin1: "Almaty",
  latitude: 43.238949,
  longitude: 76.889709,
  timezone: "Asia/Almaty",
};

export function AppShell() {
  const queryClient = useQueryClient();
  const [selectedCity, setSelectedCity] = useState<SelectedCity>(defaultCity);
  const isOnline = useOnlineStatus();
  const { favorites, favoriteIds, recentCities, toggleFavorite, saveRecent } = useFavorites();
  const weatherQuery = useWeather(selectedCity);

  const isFavorite = favoriteIds.has(selectedCity.id);
  const weather = weatherQuery.data;
  const theme: WeatherThemeVariant = weather?.theme ?? "clear-night";

  const titleCopy = weather
    ? `Tracking ${weather.current.conditionLabel.toLowerCase()} in ${weather.city.name}.`
    : "Explore weather with a premium global dashboard.";

  const handleCitySelect = (city: SelectedCity) => {
    setSelectedCity(city);
    saveRecent(city);
  };

  return (
    <main
      className={`ui-shell ${weather?.current.isDay ? "ui-day" : "ui-night"} relative min-h-screen overflow-hidden`}
    >
      <DynamicBackdrop theme={theme} />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-5 pb-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="ui-text-soft text-sm uppercase tracking-[0.36em]">Aether Weather</p>
            <h1 className="ui-text-strong mt-3 max-w-xl text-balance text-3xl font-semibold md:text-4xl">
              World weather, designed like a product.
            </h1>
            <p className="ui-text-muted mt-3 max-w-2xl text-sm leading-6">{titleCopy}</p>
          </div>
          <div className="flex w-full flex-col gap-3 lg:max-w-3xl lg:items-end">
            <SearchCommand
              selectedCity={selectedCity}
              recentCities={recentCities}
              onSelect={handleCitySelect}
            />
            <div className="flex flex-wrap items-center gap-3">
              <CurrentLocationButton onResolve={handleCitySelect} />
              {!isOnline ? (
                <span className="ui-button-secondary rounded-full border px-4 py-2 text-sm">
                  Offline mode
                </span>
              ) : null}
            </div>
          </div>
        </header>

        {!isOnline ? (
          <div className="mb-6">
            <StatusPanel
              title="You are offline"
              description="Cached weather stays visible if already loaded. New searches may fail until the connection returns."
              icon={<CloudAlert className="h-5 w-5 text-amber-200" />}
            />
          </div>
        ) : null}

        {weatherQuery.isPending ? (
          <div className="grid gap-4">
            <LoadingSkeleton className="h-80 rounded-[2rem]" />
            <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
              <LoadingSkeleton className="h-48 rounded-[2rem]" />
              <LoadingSkeleton className="h-48 rounded-[2rem]" />
            </div>
            <LoadingSkeleton className="h-72 rounded-[2rem]" />
          </div>
        ) : weatherQuery.isError ? (
          <ErrorState
            title="Weather data could not be loaded"
            description="The data provider did not return a usable response. Try again or switch to another city."
            onRetry={() => weatherQuery.refetch()}
          />
        ) : weather ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCity.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="space-y-4"
            >
              <WeatherHero
                city={selectedCity}
                weather={weather}
                isFavorite={isFavorite}
                isRefreshing={weatherQuery.isFetching}
                onRefresh={() => {
                  weatherQuery.refetch();
                  void queryClient.invalidateQueries({ queryKey: ["weather", selectedCity.id] });
                }}
                onToggleFavorite={() => toggleFavorite(selectedCity)}
              />

              <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
                <WeatherSummary summary={weather.summary} />
                <CityTimeCard timezone={weather.city.timezone} localTime={weather.localTime} />
              </div>

              <MetricsGrid current={weather.current} />

              <HourlyForecast
                hourly={weather.hourly}
                timezone={weather.city.timezone}
                isDay={weather.current.isDay}
              />

              <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
                <WeeklyForecast daily={weather.daily} timezone={weather.city.timezone} />
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
                  <SunCard
                    sunrise={weather.daily[0]?.sunrise ?? weather.localTime}
                    sunset={weather.daily[0]?.sunset ?? weather.localTime}
                    now={weather.localTime}
                    timezone={weather.city.timezone}
                  />
                  <AirQualityCard airQuality={weather.airQuality} />
                </div>
              </div>

              <FavoritesRail
                favorites={favorites}
                selectedCity={selectedCity}
                onSelect={handleCitySelect}
                onToggleFavorite={toggleFavorite}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <EmptyState
            title="Pick a city to begin"
            description="Search for any city worldwide to reveal a live-feeling weather dashboard with forecasts, AQI, local time, and atmospheric visuals."
          />
        )}

        {weatherQuery.isFetching && weather ? (
          <div className="ui-button-secondary pointer-events-none fixed bottom-5 right-5 flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-xl">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Refreshing
          </div>
        ) : null}
      </div>
    </main>
  );
}
