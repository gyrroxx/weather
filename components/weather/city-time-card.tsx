"use client";

import { Clock3, Globe2 } from "lucide-react";
import { SectionCard } from "@/components/shared/section-card";
import { useLocalTime } from "@/hooks/use-local-time";
import { formatClock, formatLocalDate } from "@/lib/format/time";

export function CityTimeCard({
  timezone,
  localTime,
}: {
  timezone: string;
  localTime: string;
}) {
  const now = useLocalTime(timezone);

  return (
    <SectionCard className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-white/14" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="ui-text-soft text-xs uppercase tracking-[0.24em]">Local time</p>
          <p className="ui-text-strong mt-3 font-display text-4xl">{formatClock(now, timezone)}</p>
          <p className="ui-text-muted mt-2 text-sm">{formatLocalDate(localTime, timezone)}</p>
        </div>
        <div className="ui-text-muted space-y-3 text-right text-sm">
          <div className="flex items-center justify-end gap-2">
            <Clock3 className="h-4 w-4" />
            Live
          </div>
          <div className="flex items-center justify-end gap-2">
            <Globe2 className="h-4 w-4" />
            <span className="max-w-32 truncate">{timezone}</span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
