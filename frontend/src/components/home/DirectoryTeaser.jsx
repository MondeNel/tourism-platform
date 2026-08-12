import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import CoordStamp from '@/components/ui/CoordStamp';
import Button from '@/components/ui/Button';
import { FEATURED_BUSINESSES } from '@/data/businesses';

export default function DirectoryTeaser() {
  return (
    <section className="bg-sand pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 bg-river rounded-2xl p-9 flex flex-col justify-between">
          <div>
            <CoordStamp label="Local business" className="text-sand/70 mb-3" />
            <h3 className="font-display text-2xl md:text-3xl text-sand mb-3">
              Own a guesthouse, tour or restaurant here?
            </h3>
            <p className="text-sand/70 text-sm leading-relaxed">
              List your business on the platform visitors actually search &mdash; free
              listings available, premium tiers for extra visibility.
            </p>
          </div>
          <Button as={Link} to="/directory/add" variant="sand" className="mt-8 self-start">
            Add your listing
          </Button>
        </div>

        <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
          {FEATURED_BUSINESSES.map((b) => (
            <Link
              key={b.slug}
              to={`/directory/${b.slug}`}
              className="bg-white rounded-2xl p-6 border border-night/5 hover:border-ochre/30 transition-colors"
            >
              <div className="w-full h-28 rounded-xl bg-gradient-to-br from-river/20 to-ochre/20 mb-4" />
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-night font-medium text-sm">{b.name}</h4>
                  <p className="text-night/50 text-xs mt-0.5">{b.category}</p>
                </div>
                <div className="flex items-center gap-1 text-gold text-xs font-medium">
                  <Star size={12} fill="currentColor" />
                  {b.rating}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
