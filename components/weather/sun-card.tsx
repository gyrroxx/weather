"use client";

import { Sunrise, Sunset } from "lucide-react";
import { SectionCard } from "@/components/shared/section-card";
import { formatSunTime } from "@/lib/format/time";

function getDaylightProgress(sunrise: string, sunset: string, now: string) {
  const sunriseTime = new Date(sunrise).getTime();
  const sunsetTime = new Date(sunset).getTime();
  const currentTime = new Date(now).getTime();

  if (Number.isNaN(sunriseTime) || Number.isNaN(sunsetTime) || sunsetTime <= sunriseTime) {
    return 0;
  }

  return Math.max(0, Math.min(1, (currentTime - sunriseTime) / (sunsetTime - sunriseTime)));
}

export function SunCard({
  sunrise,
  sunset,
  now,
  timezone,
}: {
  sunrise: string;
  sunset: string;
  now: string;
  timezone: string;
}) {
  const progress = getDaylightProgress(sunrise, sunset, now);

  return (
    <SectionCard className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="ui-text-soft text-xs uppercase tracking-[0.24em]">Sun cycle</p>
          <h3 className="ui-text-strong mt-2 text-xl font-semibold">Daylight rhythm</h3>
        </div>
        <div className="relative h-16 w-16 rounded-full border border-white/10 bg-white/6 p-2">
          <div
            className="absolute inset-2 rounded-full"
            style={{
              background: `conic-gradient(rgba(255,255,255,0.85) ${progress * 360}deg, rgba(255,255,255,0.08) 0deg)`,
            }}
          />
          <div className="absolute inset-4 rounded-full bg-slate-950/80" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="ui-panel-soft rounded-2xl p-4">
          <div className="ui-text-muted flex items-center gap-2">
            <Sunrise className="h-4 w-4" />
            Sunrise
          </div>
          <p className="ui-text-strong mt-3 text-lg font-semibold">{formatSunTime(sunrise, timezone)}</p>
        </div>
        <div className="ui-panel-soft rounded-2xl p-4">
          <div className="ui-text-muted flex items-center gap-2">
            <Sunset className="h-4 w-4" />
            Sunset
          </div>
          <p className="ui-text-strong mt-3 text-lg font-semibold">{formatSunTime(sunset, timezone)}</p>
        </div>
      </div>
    </SectionCard>
  );
}
