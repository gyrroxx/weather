export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function formatNumber(value: number, digits = 0) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(value);
}
