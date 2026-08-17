/**
 * Subscription tiers — feature matrix taken directly from spec §3.3.
 *
 * PRICING IS PLACEHOLDER. The spec requires the service provider to propose
 * a pricing model ("appropriate for a developing local economy"), so these
 * amounts are ours to set — swap them here and nothing else needs touching.
 */

export const PLANS = [
  {
    slug: 'standard',
    name: 'Standard',
    price: 0,
    priceLabel: 'Free',
    cadence: '',
    tagline: 'Get on the map at no cost.',
    highlight: false,
    features: {
      profile: 'Basic',
      gallery: 'Up to 5 images',
      video: false,
      homepage: false,
      ranking: 'Standard',
      analytics: false,
      promotions: false,
      social: false,
      support: 'Email only',
    },
    summary: [
      'Basic business profile',
      'Up to 5 images',
      'Standard search ranking',
      'Email support',
    ],
  },
  {
    slug: 'premium',
    name: 'Premium',
    price: 150,
    priceLabel: 'R150',
    cadence: '/month',
    tagline: 'More visibility, more enquiries.',
    highlight: true,
    features: {
      profile: 'Enhanced',
      gallery: 'Up to 15 images',
      video: '1 video',
      homepage: 'Rotating slot',
      ranking: 'Priority',
      analytics: 'Basic',
      promotions: 'Quarterly',
      social: 'Included',
      support: 'Email & phone',
    },
    summary: [
      'Enhanced profile',
      'Up to 15 images + 1 video',
      'Priority search ranking',
      'Rotating homepage slot',
      'Basic analytics',
      'Quarterly promotions',
    ],
  },
  {
    slug: 'platinum',
    name: 'Platinum',
    price: 400,
    priceLabel: 'R400',
    cadence: '/month',
    tagline: 'Top placement and a dedicated contact.',
    highlight: false,
    features: {
      profile: 'Full',
      gallery: 'Unlimited',
      video: 'Multiple videos',
      homepage: 'Guaranteed slot',
      ranking: 'Top placement',
      analytics: 'Full dashboard',
      promotions: 'Monthly campaigns',
      social: 'Enhanced promotion',
      support: 'Account manager',
    },
    summary: [
      'Full profile',
      'Unlimited images & videos',
      'Top search placement',
      'Guaranteed homepage slot',
      'Full analytics dashboard',
      'Monthly campaigns',
      'Dedicated account manager',
    ],
  },
];

/** Row order and labels for the side-by-side comparison table (§3.3). */
export const PLAN_FEATURE_ROWS = [
  { key: 'profile', label: 'Business profile' },
  { key: 'gallery', label: 'Image gallery' },
  { key: 'video', label: 'Video content' },
  { key: 'homepage', label: 'Homepage feature' },
  { key: 'ranking', label: 'Search ranking' },
  { key: 'analytics', label: 'Analytics' },
  { key: 'promotions', label: 'Promotions' },
  { key: 'social', label: 'Social media' },
  { key: 'support', label: 'Support' },
];

export const getPlan = (slug) => PLANS.find((p) => p.slug === slug);