import { Link } from 'react-router-dom';
import { MapPin, Compass } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { ROUTES } from '@/data/routes';

export default function RoutesStrip() {
  return (
    <section className="bg-sand py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <SectionHeading eyebrow="Plan your visit" title="Themed tourism routes" />
          <Compass size={26} className="text-ochre hidden md:block" strokeWidth={1.5} />
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 snap-x">
          {ROUTES.map((r) => (
            <Link
              key={r.slug}
              to={`/routes/${r.slug}`}
              className="min-w-[240px] snap-start bg-night rounded-2xl p-6 flex-shrink-0 hover:bg-river transition-colors"
            >
              <MapPin size={18} className="text-gold mb-8" />
              <h3 className="font-display text-lg text-sand mb-1">{r.name}</h3>
              <p className="text-sand/50 text-xs font-mono">{r.stops}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
