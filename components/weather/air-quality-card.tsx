import { Wind } from "lucide-react";
import { SectionCard } from "@/components/shared/section-card";
import { formatNumber } from "@/lib/format/numbers";
import type { AirQualitySummary } from "@/lib/types/weather";

export function AirQualityCard({
  airQuality,
}: {
  airQuality: AirQualitySummary | null;
}) {
  if (!airQuality) {
    return (
      <SectionCard>
        <p className="ui-text-soft text-xs uppercase tracking-[0.24em]">Air quality</p>
        <p className="ui-text-muted mt-4 text-sm">Air quality data is not available for this city right now.</p>
      </SectionCard>
    );
  }

  return (
    <SectionCard className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="ui-text-soft text-xs uppercase tracking-[0.24em]">Air quality</p>
          <p className="ui-text-strong mt-2 text-3xl font-semibold">
            {airQuality.aqi == null ? "--" : formatNumber(airQuality.aqi)}
          </p>
          <p className="ui-text-muted mt-1 text-sm">{airQuality.category}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
          <Wind className="h-5 w-5 text-white/80" />
        </div>
      </div>
      <p className="ui-text-strong text-sm leading-6">{airQuality.label}</p>
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="ui-panel-soft rounded-2xl p-3">
          <p className="ui-text-soft">PM2.5</p>
          <p className="ui-text-strong mt-1 font-medium">
            {airQuality.pm25 == null ? "--" : formatNumber(airQuality.pm25, 1)}
          </p>
        </div>
        <div className="ui-panel-soft rounded-2xl p-3">
          <p className="ui-text-soft">PM10</p>
          <p className="ui-text-strong mt-1 font-medium">
            {airQuality.pm10 == null ? "--" : formatNumber(airQuality.pm10, 1)}
          </p>
        </div>
        <div className="ui-panel-soft rounded-2xl p-3">
          <p className="ui-text-soft">Ozone</p>
          <p className="ui-text-strong mt-1 font-medium">
            {airQuality.ozone == null ? "--" : formatNumber(airQuality.ozone, 1)}
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
