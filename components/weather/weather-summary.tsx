import { Sparkles } from "lucide-react";
import { SectionCard } from "@/components/shared/section-card";

export function WeatherSummary({ summary }: { summary: string }) {
  return (
    <SectionCard className="flex items-start gap-4">
      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10">
        <Sparkles className="h-4 w-4 text-white/80" />
      </div>
      <div>
        <p className="ui-text-soft text-xs uppercase tracking-[0.24em]">Weather note</p>
        <p className="ui-text-strong mt-2 text-sm leading-6">{summary}</p>
      </div>
    </SectionCard>
  );
}
