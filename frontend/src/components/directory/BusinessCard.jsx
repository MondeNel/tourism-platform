import { Link } from 'react-router-dom';
import { Star, Crown, Sparkle } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { TOWNS } from '@/data/towns';
import { FEATURES } from '@/data/filters';

const categoryLabel = (slug) => CATEGORIES.find((c) => c.slug === slug)?.label || slug;
const townLabel = (slug) => TOWNS.find((t) => t.slug === slug)?.name || slug;
const featureLabel = (slug) => FEATURES.find((f) => f.slug === slug)?.label || slug;

const TIER_BADGE = {
  platinum: { label: 'Platinum', className: 'bg-night text-gold', Icon: Crown },
  premium: { label: 'Premium', className: 'bg-ochre/10 text-ochre', Icon: Sparkle },
};

export default function BusinessCard({ business }) {
  const badge = TIER_BADGE[business.tier];

  return (
    <Link
      to={`/directory/${business.slug}`}
      className="group bg-white rounded-2xl border border-night/5 hover:border-ochre/30 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col"
    >
      <div className="relative w-full h-36 bg-gradient-to-br from-river/20 to-ochre/20">
        {badge && (
          <span className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium ${badge.className}`}>
            <badge.Icon size={11} />
            {badge.label}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-night font-medium text-sm leading-snug">{business.name}</h3>
          <div className="flex items-center gap-1 text-gold text-xs font-medium shrink-0">
            <Star size={12} fill="currentColor" />
            {business.rating}
            <span className="text-night/30 font-normal">({business.reviewCount})</span>
          </div>
        </div>

        <p className="text-night/50 text-xs mb-3">
          {categoryLabel(business.category)} &middot; {townLabel(business.town)}
        </p>

        <p className="text-night/60 text-sm leading-relaxed mb-4 flex-1">{business.description}</p>

        {business.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {business.features.map((f) => (
              <span key={f} className="text-[11px] px-2 py-1 rounded-full bg-river/10 text-river font-medium">
                {featureLabel(f)}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
