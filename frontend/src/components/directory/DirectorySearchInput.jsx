import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function DirectorySearchInput({ value, onChange }) {
  // Local state debounced into the URL so typing doesn't rewrite the URL
  // on every keystroke (each rewrite is a history entry + re-filter).
  const [local, setLocal] = useState(value);

  useEffect(() => setLocal(value), [value]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (local !== value) onChange(local);
    }, 300);
    return () => clearTimeout(t);
  }, [local]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative flex-1">
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-night/40" aria-hidden="true" />
      <label htmlFor="directory-search" className="sr-only">
        Search the directory
      </label>
      <input
        id="directory-search"
        type="text"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder="Search businesses, categories, keywords…"
        className="w-full pl-11 pr-10 py-3 rounded-xl border border-night/10 bg-white text-sm text-night placeholder:text-night/40 outline-none focus:border-ochre transition-colors"
      />
      {local && (
        <button
          onClick={() => setLocal('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-night/40 hover:text-night"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
