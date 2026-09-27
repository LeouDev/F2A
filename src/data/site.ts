/**
 * Business information — the single source of truth for F2A's details.
 * Everything here is taken from the F2A CARS Facebook page (facebook.com/F2Acars).
 * Do not add hours, branches, coordinates or policies until F2A confirms them.
 */
const address = {
  street: 'Timog',
  locality: 'Quezon City',
  country: 'Philippines',
  countryCode: 'PH',
  postalCode: '1103',
  /** Display lines, as listed on Facebook: "Timog Q.C, Quezon City, Philippines, 1103" */
  lines: ['Timog Q.C.', 'Quezon City, Philippines', '1103'],
}

export const site = {
  name: 'F2A CARS',
  legalName: 'F2A Cars',
  category: 'Car dealership',
  tagline: 'Quality pre-owned cars.',
  description:
    'F2A Cars finds and provides quality pre-owned cars from Timog, Quezon City. Buy, sell, trade or consign with a team that communicates aftersales.',
  phone: { display: '0927 775 5709', href: 'tel:+639277755709', international: '+63 927 775 5709' },
  email: 'franz_aldover2005@yahoo.com',
  address,
  /** Search link (no coordinates) — opens Google Maps on the listed address. */
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Timog, Quezon City, Philippines 1103')}`,
  facebook: 'https://www.facebook.com/F2Acars',
  /** Messenger deep link for the facebook.com/F2Acars page username. */
  messenger: 'https://m.me/F2Acars',
}

/** Official social profiles (supplied by F2A). `null` = not available; the UI then shows that button as unavailable. Never guess URLs. */
export const socialLinks: Record<'facebook' | 'youtube' | 'tiktok', string | null> = {
  facebook: 'https://www.facebook.com/F2Acars',
  youtube: 'https://www.youtube.com/@franzaldover',
  tiktok: 'https://www.tiktok.com/@f2acars',
}

/** Brand statements, verbatim (grammar lightly polished) from the Facebook page intro. */
export const brand = {
  pillars: ['Honesty', 'Integrity', 'Transparency'] as const,
  motto: 'Honesty + Integrity + Transparency',
  mission: 'We find & provide quality pre-owned cars for our clients.',
  satisfaction: 'Client satisfaction with excellent after-sales service.',
  aftersales: 'We communicate aftersales.',
  services: 'Buy + Sell + Trade + Consign',
  weBuy: 'We buy cars 24/7',
  weBuyCta: 'Wanna sell your car? DM us.',
}

export const values = [
  { title: 'Honesty', text: 'We aim to provide clear and straightforward vehicle information.' },
  { title: 'Integrity', text: 'We value professional and trustworthy transactions.' },
  { title: 'Transparency', text: 'We want customers to understand what they are buying.' },
  { title: 'After-sales', text: '“We communicate aftersales.”' },
]

export const services = [
  {
    key: 'buy',
    title: 'Buy',
    text: 'Browse quality pre-owned cars and inquire directly with F2A.',
    cta: 'Browse cars',
    to: '/cars',
  },
  {
    key: 'sell',
    title: 'Sell',
    text: 'We buy cars 24/7. Tell us about your car and get a quote.',
    cta: 'Get a quote',
    to: '/sell-your-car',
  },
  {
    key: 'trade',
    title: 'Trade',
    text: 'Put your current car toward your next ride.',
    cta: 'Start a trade-in',
    to: '/trade',
  },
  {
    key: 'consign',
    title: 'Consign',
    text: 'Let F2A help you find a buyer for your car.',
    cta: 'Consign with F2A',
    to: '/consign',
  },
] as const

export type NavItem = { label: string; to: string; match?: string[] }

export const isActive = (item: NavItem, pathname: string) =>
  item.to === '/' ? pathname === '/' : (item.match ?? [item.to]).some((path) => pathname.startsWith(path))

export const mainNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Cars', to: '/cars' },
  { label: 'Sell', to: '/sell-your-car' },
  { label: 'Trade / Consign', to: '/trade', match: ['/trade', '/consign'] },
  { label: 'Financing', to: '/financing' },
  { label: 'Vlogs', to: '/vlogs' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const mobileNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Available Cars', to: '/cars' },
  { label: 'Sell Your Car', to: '/sell-your-car' },
  { label: 'Trade / Consign', to: '/trade', match: ['/trade', '/consign'] },
  { label: 'Financing', to: '/financing' },
  { label: 'F2A Vlogs', to: '/vlogs' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const footerNav = {
  showroom: [
    { label: 'Available Cars', to: '/cars' },
    { label: 'Sell Your Car', to: '/sell-your-car' },
    { label: 'Trade-in', to: '/trade' },
    { label: 'Consignment', to: '/consign' },
    { label: 'Financing', to: '/financing' },
  ],
  f2a: [
    { label: 'F2A Vlogs', to: '/vlogs' },
    { label: 'About F2A', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Privacy', to: '/privacy' },
    { label: 'Terms', to: '/terms' },
  ],
}
