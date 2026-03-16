import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";

export function ErrorState({
  title,
  description,
  onRetry,
}: {
  title: string;
  description: string;
  onRetry?: () => void;
}) {
  return (
    <SectionCard className="flex min-h-72 flex-col items-center justify-center gap-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/12">
        <AlertTriangle className="h-6 w-6 text-rose-200" />
      </div>
      <div className="space-y-2">
        <h2 className="ui-text-strong text-xl font-semibold">{title}</h2>
        <p className="ui-text-muted max-w-md text-sm leading-6">{description}</p>
      </div>
      {onRetry ? (
        <Button
          onClick={onRetry}
          className="ui-button-secondary rounded-full border px-5"
        >
          Try again
        </Button>
      ) : null}
    </SectionCard>
  );
}
