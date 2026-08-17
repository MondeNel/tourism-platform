import { SORT_OPTIONS } from '@/data/filters';

export default function SortSelect({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="directory-sort" className="text-sm text-night/50 hidden sm:inline">
        Sort
      </label>
      <select
        id="directory-sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm border border-night/15 rounded-lg px-3 py-2 bg-white text-night outline-none focus:border-ochre"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.slug} value={o.slug}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
