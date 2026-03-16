"use client";

import { useState } from "react";
import { LoaderCircle, LocateFixed } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CitySearchResult } from "@/lib/types/city";

export function CurrentLocationButton({
  onResolve,
}: {
  onResolve: (city: CitySearchResult) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported in this browser.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(
            `/api/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}`,
          );

          if (!response.ok) {
            throw new Error("Location lookup failed.");
          }

          onResolve((await response.json()) as CitySearchResult);
        } catch {
          setError("Unable to resolve your current location.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location permission was denied.");
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 8000 },
    );
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        onClick={handleClick}
        variant="ghost"
        className="ui-button-secondary rounded-full border px-4"
      >
        {loading ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <LocateFixed className="h-4 w-4" />
        )}
        Current location
      </Button>
      {error ? <p className="text-xs text-rose-200/90">{error}</p> : null}
    </div>
  );
}
