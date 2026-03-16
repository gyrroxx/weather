import { Search } from "lucide-react";
import { SectionCard } from "@/components/shared/section-card";

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <SectionCard className="flex min-h-72 flex-col items-center justify-center gap-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
        <Search className="h-6 w-6 text-white/80" />
      </div>
      <div className="space-y-2">
        <h2 className="ui-text-strong text-xl font-semibold">{title}</h2>
        <p className="ui-text-muted max-w-md text-sm leading-6">{description}</p>
      </div>
    </SectionCard>
  );
}
