import { format } from "date-fns";

export function formatHourLabel(date: Date, timezone: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    timeZone: timezone,
  }).format(date);
}

export function formatWeekday(dateString: string, timezone: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: timezone,
  }).format(new Date(dateString));
}

export function formatLocalDate(dateString: string, timezone: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: timezone,
  }).format(new Date(dateString));
}

export function formatClock(date: Date, timezone: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  }).format(date);
}

export function formatSunTime(dateString: string, timezone: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  }).format(new Date(dateString));
}

export function formatUpdatedAt(dateString: string) {
  return format(new Date(dateString), "HH:mm");
}
