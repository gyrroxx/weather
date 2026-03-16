"use client";

import { motion } from "framer-motion";
import { THEME_ACCENTS } from "@/lib/constants/theme";
import type { WeatherThemeVariant } from "@/lib/types/weather";

export function DynamicBackdrop({ theme }: { theme: WeatherThemeVariant }) {
  const accent = THEME_ACCENTS[theme];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        key={theme}
        initial={{ opacity: 0.55, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className={`absolute inset-0 bg-gradient-to-b ${accent.base}`}
      />

      <motion.div
        key={`${theme}-wash`}
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className={`absolute inset-0 bg-gradient-to-br ${accent.primary}`}
      />

      <motion.div
        animate={{ x: [0, 18, -12, 0], y: [0, -18, 12, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        className={`absolute ${accent.orbPosition} h-72 w-72 rounded-full blur-3xl ${accent.orb}`}
      />

      <motion.div
        animate={{ x: [0, 18, -12, 0], y: [0, -18, 12, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        className={`absolute left-[-8%] top-[8%] h-72 w-72 rounded-full blur-3xl ${accent.glow}`}
      />

      <motion.div
        animate={{ x: [0, -16, 14, 0], y: [0, 16, -10, 0] }}
        transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
        className={`absolute bottom-[8%] right-[-6%] h-96 w-96 rounded-full blur-3xl ${accent.secondary}`}
      />

      <div className={`absolute inset-0 ${accent.haze}`} />

      {accent.stars ? (
        <div className="absolute inset-0 opacity-70">
          <div className="absolute left-[12%] top-[14%] h-1 w-1 rounded-full bg-white/80 shadow-[120px_40px_0_rgba(255,255,255,0.6),240px_10px_0_rgba(255,255,255,0.5),360px_80px_0_rgba(255,255,255,0.7),520px_30px_0_rgba(255,255,255,0.45),660px_120px_0_rgba(255,255,255,0.65)]" />
          <div className="absolute left-[18%] top-[26%] h-1 w-1 rounded-full bg-white/70 shadow-[170px_70px_0_rgba(255,255,255,0.55),320px_22px_0_rgba(255,255,255,0.6),480px_100px_0_rgba(255,255,255,0.4),640px_18px_0_rgba(255,255,255,0.6)]" />
        </div>
      ) : null}

      <div className={`absolute inset-0 bg-gradient-to-b ${accent.overlay}`} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_18%,rgba(4,10,19,0.1)_65%,rgba(4,10,19,0.26)_100%)]" />
    </div>
  );
}
