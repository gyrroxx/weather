import { Heart, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";
import { WeatherIcon } from "@/components/weather/weather-icon";
import { formatTemperature } from "@/lib/format/temperature";
import { formatUpdatedAt } from "@/lib/format/time";
import type { SelectedCity } from "@/lib/types/city";
import type { WeatherBundle } from "@/lib/types/weather";

export function WeatherHero({
  city,
  weather,
  isFavorite,
  isRefreshing,
  onRefresh,
  onToggleFavorite,
}: {
  city: SelectedCity;
  weather: WeatherBundle;
  isFavorite: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onToggleFavorite: () => void;
}) {
  return (
    <SectionCard className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_30%)]" />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-6">
          <div className="ui-button-secondary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.22em]">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            Live conditions
          </div>
          <div>
            <p className="ui-text-soft text-sm uppercase tracking-[0.24em]">
              {[city.admin1, city.country].filter(Boolean).join(", ")}
            </p>
            <h1 className="ui-text-strong mt-3 text-balance font-display text-5xl md:text-6xl">
              {city.name}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-3xl bg-white/10 p-4 text-white">
              <WeatherIcon
                code={weather.current.conditionCode}
                isDay={weather.current.isDay}
                className="h-8 w-8"
              />
            </div>
            <div>
              <motion.p
                key={Math.round(weather.current.temperature)}
                initial={{ opacity: 0.5, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="ui-text-strong font-display text-7xl md:text-8xl"
              >
                {formatTemperature(weather.current.temperature)}
              </motion.p>
              <p className="ui-text-muted mt-1 text-lg">{weather.current.conditionLabel}</p>
            </div>
          </div>
        </div>
        <div className="space-y-6 lg:max-w-sm">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="ui-panel-soft rounded-2xl p-4">
              <p className="ui-text-soft">High</p>
              <p className="ui-text-strong mt-2 text-lg font-semibold">
                {formatTemperature(weather.current.high)}
              </p>
            </div>
            <div className="ui-panel-soft rounded-2xl p-4">
              <p className="ui-text-soft">Low</p>
              <p className="ui-text-strong mt-2 text-lg font-semibold">
                {formatTemperature(weather.current.low)}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={onRefresh}
              className="ui-button-primary rounded-full hover:opacity-90"
            >
              <RefreshCcw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              onClick={onToggleFavorite}
              variant="ghost"
              className="ui-button-secondary rounded-full border"
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-current text-rose-200" : ""}`} />
              {isFavorite ? "Saved" : "Save city"}
            </Button>
          </div>
          <p className="ui-text-soft text-sm">Updated at {formatUpdatedAt(weather.refreshedAt)}</p>
        </div>
      </div>
    </SectionCard>
  );
}
