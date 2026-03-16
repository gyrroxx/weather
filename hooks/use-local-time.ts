"use client";

import { useEffect, useState } from "react";

export function useLocalTime(timezone: string) {
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => window.clearInterval(interval);
  }, [timezone]);

  return currentTime;
}
