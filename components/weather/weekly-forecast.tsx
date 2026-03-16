import { SectionCard } from "@/components/shared/section-card";
import { WeatherIcon } from "@/components/weather/weather-icon";
import { formatWeekday } from "@/lib/format/time";
import { formatTemperature } from "@/lib/format/temperature";
import type { DailyForecastPoint } from "@/lib/types/weather";

export function WeeklyForecast({
  daily,
  timezone,
}: {
  daily: DailyForecastPoint[];
  timezone: string;
}) {
  return (
    <SectionCard>
      <p className="ui-text-soft text-xs uppercase tracking-[0.24em]">7-day forecast</p>
      <div className="mt-5 space-y-3">
        {daily.map((day, index) => (
          <div
            key={day.date}
            className="ui-panel-soft grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl px-4 py-3"
          >
            <div className="ui-text-muted w-14 text-sm font-medium">
              {index === 0 ? "Today" : formatWeekday(day.date, timezone)}
            </div>
            <div className="flex items-center gap-3 text-white/82">
              <WeatherIcon code={day.conditionCode} className="h-4 w-4" />
              <div className="h-1.5 flex-1 rounded-full bg-white/8">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan-200/80 to-amber-200/80" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="ui-text-strong">{formatTemperature(day.max)}</span>
              <span className="ui-text-soft">{formatTemperature(day.min)}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
