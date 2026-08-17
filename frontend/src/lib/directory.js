/**
 * Filters/sorts business listings client-side.
 * Shape mirrors what a future `/api/businesses?...` endpoint would take as
 * query params, so swapping this for a real fetch later shouldn't require
 * touching any component — just the data source.
 */

export function filterBusinesses(businesses, filters) {
  const { q, category, town, priceRange, minRating, features } = filters;

  return businesses.filter((b) => {
    if (category && b.category !== category) return false;
    if (town && b.town !== town) return false;
    if (priceRange && b.priceRange !== priceRange) return false;
    if (minRating && b.rating < minRating) return false;
    if (features?.length && !features.every((f) => b.features.includes(f))) return false;

    if (q) {
      const needle = q.trim().toLowerCase();
      const haystack = `${b.name} ${b.description} ${b.category}`.toLowerCase();
      if (!haystack.includes(needle)) return false;
    }

    return true;
  });
}

const TIER_WEIGHT = { platinum: 0, premium: 1, standard: 2 };

export function sortBusinesses(businesses, sort) {
  const list = [...businesses];

  switch (sort) {
    case 'rating':
      return list.sort((a, b) => b.rating - a.rating);
    case 'name':
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case 'recommended':
    default:
      // Premium/platinum tiers surface first (spec §3.3: priority search ranking),
      // then by rating within each tier.
      return list.sort((a, b) => {
        const tierDiff = TIER_WEIGHT[a.tier] - TIER_WEIGHT[b.tier];
        return tierDiff !== 0 ? tierDiff : b.rating - a.rating;
      });
  }
}
