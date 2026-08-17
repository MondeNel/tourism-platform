import { CATEGORIES } from '@/data/categories';

export default function CategoryPills({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap" role="group" aria-label="Filter by category">
      <button
        onClick={() => onChange('')}
        className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
          !active
            ? 'bg-night text-sand border-night'
            : 'bg-transparent text-night/60 border-night/15 hover:border-night/40'
        }`}
        aria-pressed={!active}
      >
        All
      </button>
      {CATEGORIES.map((c) => (
        <button
          key={c.slug}
          onClick={() => onChange(active === c.slug ? '' : c.slug)}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
            active === c.slug
              ? 'bg-ochre text-sand border-ochre'
              : 'bg-transparent text-night/60 border-night/15 hover:border-night/40'
          }`}
          aria-pressed={active === c.slug}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
