import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import CoordStamp from '@/components/ui/CoordStamp';

export default function Hero() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/explore${query ? `?q=${encodeURIComponent(query)}` : ''}`);
  };

  return (
    <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
      {/* Background image - Orange River */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/orange_river.jpg')" }}
      />
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 h-full flex flex-col justify-center">
        <CoordStamp className="text-gold mb-6" />
        <h1 className="font-display text-sand text-5xl sm:text-6xl md:text-7xl leading-[1.02] max-w-3xl">
          Where the Karoo
          <br />
          meets the <span className="text-gold">Orange River.</span>
        </h1>
        <p className="mt-6 max-w-xl text-sand/80 text-lg leading-relaxed">
          Dark skies, river valleys and Northern Cape hospitality &mdash; Prieska,
          Marydale &amp; Niekerkshoop, discovered.
        </p>
      </div>

      {/* floating search card */}
      <div className="absolute -bottom-10 left-0 right-0 z-20 px-6 md:px-10">
        <form
          onSubmit={handleSearch}
          role="search"
          aria-label="Search Prieska tourism listings"
          className="max-w-4xl mx-auto bg-sand rounded-2xl shadow-2xl shadow-black/40 p-3 md:p-4 flex flex-col md:flex-row gap-3"
        >
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-night/[0.04]">
            <Search size={18} className="text-night/50" aria-hidden="true" />
            <label htmlFor="hero-search" className="sr-only">
              Search stargazing, guesthouses, river tours
            </label>
            <input
              id="hero-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stargazing, guesthouses, river tours…"
              className="bg-transparent w-full outline-none text-sm text-night placeholder:text-night/40"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-ochre text-sand text-sm font-medium hover:bg-ochre-dark transition-colors flex items-center justify-center gap-2"
          >
            Explore
            <ChevronRight size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}