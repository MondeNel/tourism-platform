import { TOWNS } from '@/data/towns';
import { FEATURES, PRICE_RANGES } from '@/data/filters';

function FilterGroup({ label, children }) {
  return (
    <div className="py-5 border-b border-night/10 last:border-b-0">
      <h4 className="text-xs font-mono tracking-widest uppercase text-night/40 mb-3">{label}</h4>
      {children}
    </div>
  );
}

function RadioPill({ checked, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
        checked ? 'bg-ochre/10 text-ochre font-medium' : 'text-night/70 hover:bg-night/5'
      }`}
      aria-pressed={checked}
    >
      {children}
    </button>
  );
}

export default function FilterPanel({ filters, update, toggleFeature }) {
  return (
    <div>
      <FilterGroup label="Area">
        <div className="space-y-1">
          <RadioPill checked={!filters.town} onClick={() => update({ town: '' })}>
            All areas
          </RadioPill>
          {TOWNS.map((t) => (
            <RadioPill key={t.slug} checked={filters.town === t.slug} onClick={() => update({ town: filters.town === t.slug ? '' : t.slug })}>
              {t.name}
            </RadioPill>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Price range">
        <div className="space-y-1">
          <RadioPill checked={!filters.priceRange} onClick={() => update({ priceRange: '' })}>
            Any price
          </RadioPill>
          {PRICE_RANGES.map((p) => (
            <RadioPill
              key={p.slug}
              checked={filters.priceRange === p.slug}
              onClick={() => update({ priceRange: filters.priceRange === p.slug ? '' : p.slug })}
            >
              {p.label}
            </RadioPill>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Minimum rating">
        <div className="flex gap-2">
          {[4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => update({ minRating: filters.minRating === r ? 0 : r })}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                filters.minRating === r
                  ? 'bg-ochre text-sand border-ochre'
                  : 'bg-transparent text-night/60 border-night/15 hover:border-night/40'
              }`}
              aria-pressed={filters.minRating === r}
            >
              {r}+
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Special features">
        <div className="space-y-2">
          {FEATURES.map((f) => (
            <label key={f.slug} className="flex items-center gap-2.5 text-sm text-night/70 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.features.includes(f.slug)}
                onChange={() => toggleFeature(f.slug)}
                className="w-4 h-4 rounded border-night/30 text-ochre focus:ring-ochre accent-ochre"
              />
              {f.label}
            </label>
          ))}
        </div>
      </FilterGroup>
    </div>
  );
}
