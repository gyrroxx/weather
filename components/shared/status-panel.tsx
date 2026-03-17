import { WifiOff } from "lucide-react";
import { SectionCard } from "@/components/shared/section-card";

export function StatusPanel({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
}) {
  return (
    <SectionCard className="flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
        {icon ?? <WifiOff className="ui-icon-muted h-5 w-5" />}
      </div>
      <div>
        <p className="ui-text-strong text-sm font-semibold">{title}</p>
        <p className="ui-text-muted text-sm">{description}</p>
      </div>
    </SectionCard>
  );
}
