import { Droplets, Eye, Gauge, Thermometer, Wind } from "lucide-react";
import { SectionCard } from "@/components/shared/section-card";
import { formatNumber, formatPercent } from "@/lib/format/numbers";
import { formatTemperature } from "@/lib/format/temperature";
import type { CurrentWeather } from "@/lib/types/weather";

const metrics = [
  {
    key: "feelsLike",
    label: "Feels like",
    icon: Thermometer,
    format: (value: number) => formatTemperature(value),
  },
  {
    key: "humidity",
    label: "Humidity",
    icon: Droplets,
    format: (value: number) => formatPercent(value),
  },
  {
    key: "windSpeed",
    label: "Wind",
    icon: Wind,
    format: (value: number) => `${formatNumber(value)} km/h`,
  },
  {
    key: "pressure",
    label: "Pressure",
    icon: Gauge,
    format: (value: number) => `${formatNumber(value)} hPa`,
  },
  {
    key: "visibility",
    label: "Visibility",
    icon: Eye,
    format: (value: number) => `${formatNumber(value, 1)} km`,
  },
] as const;

export function MetricsGrid({ current }: { current: CurrentWeather }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const value = current[metric.key];

        return (
          <SectionCard key={metric.key} className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="ui-text-muted text-sm">{metric.label}</p>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                <Icon className="h-4 w-4 text-white/80" />
              </div>
            </div>
            <p className="ui-text-strong text-2xl font-semibold">{metric.format(value)}</p>
          </SectionCard>
        );
      })}
    </div>
  );
}
