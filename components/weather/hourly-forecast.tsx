"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";
import { WeatherIcon } from "@/components/weather/weather-icon";
import { formatHourLabel } from "@/lib/format/time";
import { formatTemperature } from "@/lib/format/temperature";
import type { HourlyForecastPoint } from "@/lib/types/weather";

export function HourlyForecast({
  hourly,
  timezone,
  isDay,
}: {
  hourly: HourlyForecastPoint[];
  timezone: string;
  isDay: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollRight() {
    scrollRef.current?.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  }

  function scrollLeft() {
    scrollRef.current?.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  }

  return (
    <SectionCard>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="ui-text-soft text-xs uppercase tracking-[0.24em]">Next 24 hours</p>
          <h3 className="ui-text-strong mt-2 text-xl font-semibold">Hourly outlook</h3>
        </div>
        <div className="flex items-center gap-3">
          <p className="ui-text-muted text-sm">Chance of rain and temperature</p>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={scrollLeft}
            className="ui-button-secondary h-10 w-10 rounded-full border"
            aria-label="Scroll hourly forecast to the left"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={scrollRight}
            className="ui-button-secondary h-10 w-10 rounded-full border"
            aria-label="Scroll hourly forecast to the right"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="scrollbar-none mt-6 grid grid-flow-col auto-cols-[88px] gap-3 overflow-x-auto pb-2 sm:auto-cols-[96px]"
      >
        {hourly.map((point) => (
          <div
            key={point.time}
            className={`rounded-[1.75rem] border px-4 py-3 ${
              point.isNow ? "ui-border-soft bg-[color:var(--ui-panel-strong)]" : "ui-border-soft ui-panel-soft"
            }`}
          >
            <p className="ui-text-soft text-sm">{formatHourLabel(new Date(point.time), timezone)}</p>
            <div className="mt-4 flex items-center justify-between">
              <WeatherIcon code={point.conditionCode} isDay={isDay} className="h-5 w-5 text-white/82" />
              <p className="text-sm text-cyan-100">{Math.round(point.precipitationProbability)}%</p>
            </div>
            <p className="ui-text-strong mt-4 text-lg font-semibold">{formatTemperature(point.temperature)}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
