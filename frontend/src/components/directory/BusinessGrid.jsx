import { SearchX } from 'lucide-react';
import BusinessCard from './BusinessCard';
import Button from '@/components/ui/Button';

export default function BusinessGrid({ businesses, onClearFilters }) {
  if (businesses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-6">
        <SearchX size={28} className="text-night/30 mb-4" strokeWidth={1.5} aria-hidden="true" />
        <h3 className="font-display text-xl text-night mb-2">No listings match those filters</h3>
        <p className="text-night/50 text-sm mb-6 max-w-sm">
          Try widening your search &mdash; drop a filter or two, or clear everything and start over.
        </p>
        <Button variant="ochre" onClick={onClearFilters}>
          Clear all filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {businesses.map((b) => (
        <BusinessCard key={b.slug} business={b} />
      ))}
    </div>
  );
}
