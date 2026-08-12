import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import Starfield from '@/components/ui/Starfield';
import CoordStamp from '@/components/ui/CoordStamp';

export default function Hero() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/explore${query ? `?q=${encodeURIComponent(query)}` : ''}`);
  };

  return (
    <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden bg-night">
      {/* sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-panel to-river/30" />
      <Starfield />

      {/* moon */}
      <div className="absolute top-20 right-10 md:right-24 w-16 h-16 rounded-full bg-sand shadow-[0_0_60px_rgba(247,244,236,0.35)] opacity-90" />

      {/* horizon silhouette */}
      <svg
        className="absolute bottom-[22%] left-0 w-full h-[18%] text-ink"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M0,140 C220,80 380,160 600,110 C820,60 980,150 1180,100 C1320,70 1400,110 1440,100 L1440,200 L0,200 Z" />
      </svg>

      {/* river reflection strip */}
      <div className="absolute bottom-0 left-0 right-0 h-[22%] bg-gradient-to-b from-river/50 to-night" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 h-full flex flex-col justify-center">
        <CoordStamp className="text-gold mb-6" />
        <h1 className="font-display text-sand text-5xl sm:text-6xl md:text-7xl leading-[1.02] max-w-3xl">
          Where the Karoo
          <br />
          meets the <span className="text-gold">Orange River.</span>
        </h1>
        <p className="mt-6 max-w-xl text-sand/70 text-lg leading-relaxed">
          Dark skies, river valleys and Northern Cape hospitality &mdash; Prieska,
          Marydale &amp; Niekerkshoop, discovered.
        </p>
      </div>

      {/* floating search card */}
      <div className="absolute -bottom-10 left-0 right-0 z-20 px-6 md:px-10">
        <form
          onSubmit={handleSearch}
          className="max-w-4xl mx-auto bg-sand rounded-2xl shadow-2xl shadow-black/40 p-3 md:p-4 flex flex-col md:flex-row gap-3"
        >
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-night/[0.04]">
            <Search size={18} className="text-night/50" />
            <input
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
