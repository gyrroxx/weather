import { cn } from "@/lib/utils";

export function SectionCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("surface-glass surface-glow rounded-3xl border p-5 md:p-6", className)}>
      {children}
    </section>
  );
}
