import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  Sun,
} from "lucide-react";

export function WeatherIcon({
  code,
  isDay = true,
  className = "h-5 w-5",
}: {
  code: number;
  isDay?: boolean;
  className?: string;
}) {
  if ([95, 96, 99].includes(code)) return <CloudLightning className={className} />;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return <CloudSnow className={className} />;
  if ([45, 48].includes(code)) return <CloudFog className={className} />;
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return <CloudRain className={className} />;
  }
  if ([1, 2, 3].includes(code)) {
    return isDay ? <Cloud className={className} /> : <CloudMoon className={className} />;
  }
  return <Sun className={className} />;
}
