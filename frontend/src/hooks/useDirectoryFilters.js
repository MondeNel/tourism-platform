import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

/**
 * Keeps directory filter state in the URL (?q=&category=&town=&price=&rating=&features=&sort=)
 * so results are shareable and survive back/forward navigation.
 */
export default function useDirectoryFilters() {
  const [params, setParams] = useSearchParams();

  const filters = useMemo(
    () => ({
      q: params.get('q') || '',
      category: params.get('category') || '',
      town: params.get('town') || '',
      priceRange: params.get('price') || '',
      minRating: params.get('rating') ? Number(params.get('rating')) : 0,
      features: params.get('features') ? params.get('features').split(',') : [],
      sort: params.get('sort') || 'recommended',
    }),
    [params]
  );

  const update = useCallback(
    (patch) => {
      const next = new URLSearchParams(params);
      Object.entries(patch).forEach(([key, value]) => {
        const urlKey = key === 'priceRange' ? 'price' : key === 'minRating' ? 'rating' : key;
        if (!value || (Array.isArray(value) && value.length === 0)) {
          next.delete(urlKey);
        } else {
          next.set(urlKey, Array.isArray(value) ? value.join(',') : String(value));
        }
      });
      setParams(next, { replace: true });
    },
    [params, setParams]
  );

  const toggleFeature = useCallback(
    (slug) => {
      const current = filters.features;
      const next = current.includes(slug) ? current.filter((f) => f !== slug) : [...current, slug];
      update({ features: next });
    },
    [filters.features, update]
  );

  const clearAll = useCallback(() => setParams({}, { replace: true }), [setParams]);

  const activeCount =
    (filters.category ? 1 : 0) +
    (filters.town ? 1 : 0) +
    (filters.priceRange ? 1 : 0) +
    (filters.minRating ? 1 : 0) +
    filters.features.length;

  return { filters, update, toggleFeature, clearAll, activeCount };
}
