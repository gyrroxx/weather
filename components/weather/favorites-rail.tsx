import { Heart, MapPinned } from "lucide-react";
import { motion } from "framer-motion";
import type { FavoriteCity, SelectedCity } from "@/lib/types/city";

export function FavoritesRail({
  favorites,
  selectedCity,
  onSelect,
  onToggleFavorite,
}: {
  favorites: FavoriteCity[];
  selectedCity: SelectedCity | null;
  onSelect: (city: FavoriteCity) => void;
  onToggleFavorite: (city: FavoriteCity) => void;
}) {
  return (
    <div className="surface-glass surface-glow overflow-hidden rounded-3xl border p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="ui-text-soft text-xs uppercase tracking-[0.24em]">Saved cities</p>
          <p className="ui-text-strong mt-2 text-lg font-semibold">Favorites dock</p>
        </div>
        <MapPinned className="h-5 w-5 text-white/70" />
      </div>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
        {favorites.length ? (
          favorites.map((city) => {
            const active = selectedCity?.id === city.id;

            return (
              <motion.div
                key={city.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`min-w-44 rounded-3xl border ${
                  active ? "ui-border-soft bg-[color:var(--ui-panel-strong)]" : "ui-border-soft ui-panel-soft"
                }`}
              >
                <div className="flex items-start justify-between gap-3 p-4">
                  <div>
                    <p className="ui-text-strong text-base font-semibold">{city.name}</p>
                    <p className="ui-text-muted text-sm">
                      {[city.admin1, city.country].filter(Boolean).join(", ")}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${city.name} from favorites`}
                    onClick={(event) => {
                      event.stopPropagation();
                      onToggleFavorite(city);
                    }}
                    className="ui-button-secondary rounded-2xl border p-2 transition"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => onSelect(city)}
                  className="ui-text-muted w-full px-4 pb-4 text-left text-sm"
                >
                  Open city
                </button>
              </motion.div>
            );
          })
        ) : (
          <div className="ui-panel-soft ui-text-muted rounded-3xl border border-dashed px-5 py-8 text-sm">
            Save cities to build your own fast-access world weather dock.
          </div>
        )}
      </div>
    </div>
  );
}
