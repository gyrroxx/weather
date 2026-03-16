import type { WeatherThemeVariant } from "@/lib/types/weather";

export function getWeatherTheme(code: number, isDay: boolean): WeatherThemeVariant {
  if ([95, 96, 99].includes(code)) return "storm";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  if ([45, 48].includes(code)) return "fog";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return "rain";
  }
  if ([1, 2, 3].includes(code)) return isDay ? "cloudy-day" : "cloudy-night";
  return isDay ? "clear-day" : "clear-night";
}

export const THEME_ACCENTS: Record<
  WeatherThemeVariant,
  {
    primary: string;
    secondary: string;
    glow: string;
    base: string;
    overlay: string;
    orb: string;
    orbPosition: string;
    haze: string;
    stars?: boolean;
  }
> = {
  "clear-day": {
    primary: "from-sky-200/70 via-cyan-100/35 to-amber-100/45",
    secondary: "bg-sky-300/22",
    glow: "bg-amber-200/40",
    base: "from-[#7cc7ff] via-[#bce6ff] to-[#fff1cc]",
    overlay: "from-white/18 via-white/5 to-sky-100/0",
    orb: "bg-[radial-gradient(circle,rgba(255,244,191,0.95)_0%,rgba(255,215,120,0.55)_38%,rgba(255,215,120,0)_72%)]",
    orbPosition: "right-[10%] top-[10%]",
    haze: "bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.32),transparent_52%)]",
  },
  "clear-night": {
    primary: "from-sky-500/18 via-indigo-500/10 to-amber-200/8",
    secondary: "bg-indigo-300/12",
    glow: "bg-sky-300/14",
    base: "from-[#07111f] via-[#0b1932] to-[#13213d]",
    overlay: "from-white/10 via-transparent to-slate-950/24",
    orb: "bg-[radial-gradient(circle,rgba(221,233,255,0.72)_0%,rgba(165,195,255,0.24)_35%,rgba(165,195,255,0)_68%)]",
    orbPosition: "right-[12%] top-[14%]",
    haze: "bg-[radial-gradient(circle_at_bottom,rgba(83,110,170,0.2),transparent_50%)]",
    stars: true,
  },
  "cloudy-day": {
    primary: "from-slate-200/40 via-sky-100/16 to-zinc-100/20",
    secondary: "bg-slate-300/18",
    glow: "bg-sky-200/14",
    base: "from-[#8cb7d8] via-[#c9dae8] to-[#eef3f7]",
    overlay: "from-white/10 via-white/5 to-slate-100/0",
    orb: "bg-[radial-gradient(circle,rgba(255,239,188,0.58)_0%,rgba(255,224,143,0.2)_36%,rgba(255,224,143,0)_70%)]",
    orbPosition: "right-[8%] top-[12%]",
    haze: "bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.2),transparent_55%)]",
  },
  "cloudy-night": {
    primary: "from-slate-500/18 via-indigo-500/12 to-zinc-400/10",
    secondary: "bg-slate-200/10",
    glow: "bg-indigo-200/12",
    base: "from-[#07111d] via-[#111b2f] to-[#1d2940]",
    overlay: "from-white/8 via-transparent to-slate-950/28",
    orb: "bg-[radial-gradient(circle,rgba(216,226,255,0.5)_0%,rgba(160,182,232,0.18)_35%,rgba(160,182,232,0)_68%)]",
    orbPosition: "right-[10%] top-[16%]",
    haze: "bg-[radial-gradient(circle_at_bottom,rgba(92,110,140,0.2),transparent_50%)]",
    stars: true,
  },
  rain: {
    primary: "from-cyan-500/18 via-slate-400/12 to-blue-500/18",
    secondary: "bg-cyan-200/14",
    glow: "bg-blue-300/14",
    base: "from-[#445b78] via-[#5f7691] to-[#2f4968]",
    overlay: "from-white/6 via-transparent to-slate-950/30",
    orb: "bg-[radial-gradient(circle,rgba(220,236,255,0.22)_0%,rgba(181,214,255,0.1)_34%,rgba(181,214,255,0)_68%)]",
    orbPosition: "right-[12%] top-[16%]",
    haze: "bg-[radial-gradient(circle_at_bottom,rgba(168,205,231,0.16),transparent_54%)]",
  },
  storm: {
    primary: "from-violet-500/18 via-slate-500/10 to-blue-500/20",
    secondary: "bg-violet-200/14",
    glow: "bg-blue-300/18",
    base: "from-[#1a1d31] via-[#232843] to-[#101a31]",
    overlay: "from-white/4 via-transparent to-slate-950/38",
    orb: "bg-[radial-gradient(circle,rgba(187,198,255,0.2)_0%,rgba(135,160,255,0.08)_36%,rgba(135,160,255,0)_70%)]",
    orbPosition: "right-[14%] top-[14%]",
    haze: "bg-[radial-gradient(circle_at_bottom,rgba(101,117,170,0.18),transparent_54%)]",
    stars: true,
  },
  snow: {
    primary: "from-slate-100/24 via-cyan-100/18 to-sky-100/16",
    secondary: "bg-white/14",
    glow: "bg-cyan-100/18",
    base: "from-[#9fb6cb] via-[#dceaf4] to-[#f8fbff]",
    overlay: "from-white/16 via-white/8 to-cyan-50/0",
    orb: "bg-[radial-gradient(circle,rgba(255,251,239,0.72)_0%,rgba(235,246,255,0.24)_35%,rgba(235,246,255,0)_70%)]",
    orbPosition: "right-[10%] top-[12%]",
    haze: "bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.34),transparent_55%)]",
  },
  fog: {
    primary: "from-zinc-300/18 via-slate-300/12 to-sky-200/8",
    secondary: "bg-zinc-100/12",
    glow: "bg-slate-100/10",
    base: "from-[#7f8d9b] via-[#aab6c0] to-[#cad3d9]",
    overlay: "from-white/14 via-white/8 to-zinc-100/0",
    orb: "bg-[radial-gradient(circle,rgba(255,243,216,0.34)_0%,rgba(255,243,216,0.12)_34%,rgba(255,243,216,0)_70%)]",
    orbPosition: "right-[8%] top-[14%]",
    haze: "bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.28),transparent_56%)]",
  },
};
