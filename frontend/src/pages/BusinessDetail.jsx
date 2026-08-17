import { Link, useParams } from 'react-router-dom';
import {
  Star, MapPin, Phone, Mail, Globe, MessageCircle, Clock, CreditCard,
  Accessibility, Crown, Sparkle, ChevronLeft, Navigation,
} from 'lucide-react';
import BusinessGallery from '@/components/directory/BusinessGallery';
import EnquiryForm from '@/components/directory/EnquiryForm';
import BusinessCard from '@/components/directory/BusinessCard';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import { BUSINESSES } from '@/data/businesses';
import { CATEGORIES } from '@/data/categories';
import { TOWNS } from '@/data/towns';
import { FEATURES } from '@/data/filters';
import { getBusinessBySlug, getRelatedBusinesses } from '@/lib/directory';

const categoryLabel = (s) => CATEGORIES.find((c) => c.slug === s)?.label || s;
const townLabel = (s) => TOWNS.find((t) => t.slug === s)?.name || s;
const featureLabel = (s) => FEATURES.find((f) => f.slug === s)?.label || s;

const TIER_BADGE = {
  platinum: { label: 'Platinum listing', className: 'bg-night text-gold', Icon: Crown },
  premium: { label: 'Premium listing', className: 'bg-ochre/10 text-ochre', Icon: Sparkle },
};

function NotFound() {
  return (
    <div className="bg-sand min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
      <h1 className="font-display text-3xl text-night mb-2">Listing not found</h1>
      <p className="text-night/50 text-sm mb-6">
        This business may have been removed, or the link is wrong.
      </p>
      <Link to="/directory" className="text-ochre hover:underline text-sm">
        Back to the directory
      </Link>
    </div>
  );
}

function InfoRow({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-3 py-3 border-b border-night/8 last:border-b-0">
      <Icon size={16} className="text-night/35 mt-0.5 shrink-0" aria-hidden="true" />
      <div className="min-w-0">
        <p className="font-mono text-[10px] tracking-widest uppercase text-night/40 mb-0.5">{label}</p>
        <div className="text-sm text-night/75 break-words">{children}</div>
      </div>
    </div>
  );
}

export default function BusinessDetail() {
  const { slug } = useParams();
  const business = getBusinessBySlug(BUSINESSES, slug);

  useDocumentTitle(
    business ? business.name : 'Listing not found',
    business ? business.description : undefined
  );

  if (!business) return <NotFound />;

  const badge = TIER_BADGE[business.tier];
  const related = getRelatedBusinesses(BUSINESSES, business);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${business.name}, ${business.address}`
  )}`;

  return (
    <div className="bg-sand min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Link
          to="/directory"
          className="inline-flex items-center gap-1.5 text-sm text-night/55 hover:text-ochre transition-colors mb-6"
        >
          <ChevronLeft size={15} />
          All listings
        </Link>

        <BusinessGallery business={business} />

        <div className="grid lg:grid-cols-[1fr_360px] gap-10 mt-10">
          {/* Main column */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs px-2.5 py-1 rounded-full bg-night/5 text-night/60">
                {categoryLabel(business.category)}
              </span>
              {badge && (
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${badge.className}`}>
                  <badge.Icon size={11} />
                  {badge.label}
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl md:text-5xl text-night mb-3">{business.name}</h1>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6 text-sm">
              <span className="flex items-center gap-1.5 text-gold font-medium">
                <Star size={14} fill="currentColor" />
                {business.rating}
                <span className="text-night/40 font-normal">({business.reviewCount} reviews)</span>
              </span>
              <span className="flex items-center gap-1.5 text-night/60">
                <MapPin size={14} className="text-night/35" />
                {townLabel(business.town)}
              </span>
              {business.priceFrom && (
                <span className="text-night/60">
                  From <strong className="text-night font-medium">{business.priceFrom}</strong>
                </span>
              )}
            </div>

            <p className="text-night/75 leading-relaxed text-[15px] mb-8">{business.longDescription}</p>

            {business.features.length > 0 && (
              <div className="mb-8">
                <h2 className="font-mono text-[10px] tracking-widest uppercase text-night/40 mb-3">
                  Good to know
                </h2>
                <div className="flex flex-wrap gap-2">
                  {business.features.map((f) => (
                    <span key={f} className="text-sm px-3 py-1.5 rounded-full bg-river/10 text-river font-medium">
                      {featureLabel(f)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mb-8">
              <div>
                <h2 className="font-display text-lg text-night mb-2 flex items-center gap-2">
                  <Clock size={16} className="text-night/40" />
                  Hours
                </h2>
                <dl className="text-sm">
                  {business.hours.map((h) => (
                    <div key={h.label} className="flex justify-between gap-4 py-1.5 border-b border-night/8 last:border-b-0">
                      <dt className="text-night/50">{h.label}</dt>
                      <dd className="text-night/80 text-right">{h.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h2 className="font-display text-lg text-night mb-2 flex items-center gap-2">
                  <CreditCard size={16} className="text-night/40" />
                  Payment
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {business.payments.map((p) => (
                    <span key={p} className="text-xs px-2.5 py-1 rounded-full border border-night/15 text-night/60">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-night/5 mb-10">
              <h2 className="font-display text-lg text-night mb-2 flex items-center gap-2">
                <Accessibility size={16} className="text-night/40" />
                Accessibility
              </h2>
              <p className="text-sm text-night/70 leading-relaxed">{business.accessibility}</p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 self-start space-y-5">
            <EnquiryForm business={business} />

            <div className="bg-white rounded-2xl border border-night/5 p-6">
              <h2 className="font-display text-lg text-night mb-2">Contact & location</h2>
              <div className="mb-4">
                {business.phone && (
                  <InfoRow icon={Phone} label="Phone">
                    <a href={`tel:${business.phone.replace(/\s/g, '')}`} className="hover:text-ochre">
                      {business.phone}
                    </a>
                  </InfoRow>
                )}
                {business.whatsapp && (
                  <InfoRow icon={MessageCircle} label="WhatsApp">
                    <a
                      href={`https://wa.me/27${business.whatsapp.replace(/\D/g, '').slice(1)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-ochre"
                    >
                      {business.whatsapp}
                    </a>
                  </InfoRow>
                )}
                {business.email && (
                  <InfoRow icon={Mail} label="Email">
                    <a href={`mailto:${business.email}`} className="hover:text-ochre">
                      {business.email}
                    </a>
                  </InfoRow>
                )}
                {business.website && (
                  <InfoRow icon={Globe} label="Website">
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-ochre"
                    >
                      {business.website.replace(/^https?:\/\//, '')}
                    </a>
                  </InfoRow>
                )}
                <InfoRow icon={MapPin} label="Address">
                  {business.address}
                  <p className="font-mono text-[11px] text-night/40 mt-1">{business.coord}</p>
                </InfoRow>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full border border-night/15 text-sm text-night hover:border-ochre hover:text-ochre transition-colors"
              >
                <Navigation size={14} />
                Get directions
              </a>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-night/10">
            <h2 className="font-display text-2xl text-night mb-6">You might also like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((b) => (
                <BusinessCard key={b.slug} business={b} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}