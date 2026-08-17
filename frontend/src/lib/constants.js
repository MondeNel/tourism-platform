export const SITE = {
  name: 'Prieska',
  region: 'Northern Cape',
  municipality: 'Siyathemba Local Municipality',
  defaultCoord: '29.6647° S, 22.7473° E',
};

/**
 * Primary navigation. Items with `children` render as hover dropdowns on
 * desktop and tap-to-expand accordions on mobile.
 *
 * `href` on a parent is still a real destination — the dropdown supplements
 * the landing page rather than replacing it, so the parent stays clickable
 * (capetown.travel behaves the same way).
 *
 * `description` shows in the dropdown as a one-line hint. Content areas map
 * to spec §3.1 (destination portal), §3.2 (directory) and §3.6 (routes).
 */
export const NAV_LINKS = [
  {
    label: 'Explore',
    href: '/explore',
    description: 'Destinations, attractions and things to see',
    children: [
      { label: 'Prieska', href: '/towns/prieska', description: 'The heart on the river' },
      { label: 'Marydale', href: '/towns/marydale', description: 'Farmland and silence' },
      { label: 'Niekerkshoop', href: '/towns/niekerkshoop', description: 'Rock art and rooibos' },
      { label: 'Dark Sky & Stargazing', href: '/experiences/dark-sky', description: 'Southern Africa\u2019s clearest nights' },
      { label: 'Orange River', href: '/experiences/orange-river', description: 'Canoeing, fishing, riverside camps' },
      { label: 'Heritage & Culture', href: '/experiences/heritage', description: 'Museums, rock art, community tourism' },
    ],
  },
  {
    label: 'Stay & Do',
    href: '/directory',
    description: 'Places to sleep, eat and explore',
    children: [
      { label: 'Accommodation', href: '/directory?category=accommodation', description: 'Guesthouses, B&Bs, camping, self-catering' },
      { label: 'Dining', href: '/directory?category=dining', description: 'Restaurants, padstalle and cafés' },
      { label: 'Adventure & Outdoor', href: '/directory?category=adventure', description: 'Hunting, hiking, 4x4 and river trails' },
      { label: 'Agri-Tourism', href: '/directory?category=agri-tourism', description: 'Farm stays and produce routes' },
      { label: 'Weddings & Conferences', href: '/directory?category=weddings', description: 'Venues under open Karoo skies' },
    ],
  },
  {
    label: 'Routes',
    href: '/routes',
    description: 'Themed self-drive and touring routes',
    children: [
      { label: 'Dark Sky Route', href: '/routes/dark-sky', description: '6 stargazing sites' },
      { label: 'Orange River Route', href: '/routes/orange-river', description: '8 water-access points' },
      { label: 'Heritage Route', href: '/routes/heritage', description: '5 cultural landmarks' },
      { label: 'Adventure Route', href: '/routes/adventure', description: '7 trails and 4x4 tracks' },
      { label: 'Agricultural Route', href: '/routes/agricultural', description: '4 farm stays' },
      { label: 'Self-Drive Discovery', href: '/routes/self-drive', description: 'All three towns, one itinerary' },
    ],
  },
  {
    label: 'Plan Your Visit',
    href: '/plan',
    description: 'Practical travel and arrival information',
    children: [
      { label: 'Getting Here', href: '/plan/getting-here', description: 'Directions, distances and road conditions' },
      { label: 'Visitor Essentials', href: '/plan/essentials', description: 'Fuel, medical, emergency contacts' },
      { label: 'Events & Festivals', href: '/events', description: 'What\u2019s on and when' },
      { label: 'Seasonal Guide', href: '/plan/seasons', description: 'Best times to visit' },
    ],
  },
];