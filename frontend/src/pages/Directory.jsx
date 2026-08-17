import { useState, useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import CoordStamp from '@/components/ui/CoordStamp';
import CategoryPills from '@/components/directory/CategoryPills';
import DirectorySearchInput from '@/components/directory/DirectorySearchInput';
import FilterPanel from '@/components/directory/FilterPanel';
import MobileFilterDrawer from '@/components/directory/MobileFilterDrawer';
import SortSelect from '@/components/directory/SortSelect';
import BusinessGrid from '@/components/directory/BusinessGrid';
import useDirectoryFilters from '@/hooks/useDirectoryFilters';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import { BUSINESSES } from '@/data/businesses';
import { filterBusinesses, sortBusinesses } from '@/lib/directory';

export default function Directory() {
  const { filters, update, toggleFeature, clearAll, activeCount } = useDirectoryFilters();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useDocumentTitle(
    'Tourism Business Directory',
    'Search accommodation, dining, adventure, heritage and agri-tourism businesses across Prieska, Marydale and Niekerkshoop.'
  );

  const results = useMemo(() => {
    const filtered = filterBusinesses(BUSINESSES, filters);
    return sortBusinesses(filtered, filters.sort);
  }, [filters]);

  const filterPanelProps = { filters, update, toggleFeature };

  return (
    <div className="bg-sand min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <CoordStamp label="Tourism business directory" className="text-ochre mb-3" />
        <h1 className="font-display text-4xl md:text-5xl text-night mb-3">
          Find your Karoo experience
        </h1>
        <p className="text-night/60 max-w-xl mb-8">
          {BUSINESSES.length} businesses across Prieska, Marydale &amp; Niekerkshoop &mdash;
          accommodation, dining, adventure, heritage and more.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <DirectorySearchInput value={filters.q} onChange={(q) => update({ q })} />
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-night/15 text-sm font-medium text-night hover:border-ochre transition-colors"
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-ochre text-sand text-[11px] flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        <div className="mb-8">
          <CategoryPills active={filters.category} onChange={(category) => update({ category })} />
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-28 bg-white rounded-2xl border border-night/5 px-5">
              <FilterPanel {...filterPanelProps} />
            </div>
          </aside>

          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-night/50">
                {results.length} {results.length === 1 ? 'result' : 'results'}
                {activeCount > 0 && (
                  <button onClick={clearAll} className="ml-3 text-ochre hover:underline">
                    Clear filters
                  </button>
                )}
              </p>
              <SortSelect value={filters.sort} onChange={(sort) => update({ sort })} />
            </div>

            <BusinessGrid businesses={results} onClearFilters={clearAll} />
          </div>
        </div>
      </div>

      <MobileFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        resultCount={results.length}
        {...filterPanelProps}
      />
    </div>
  );
}
