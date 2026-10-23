export type Location = {
  id: string;
  name: string;
  kind: 'campus' | 'outreach';
  region: string;
  verifiedAddress: string | null;
  phone: string | null;
  email: string | null;
  hours: string | null;
  detailsConfirmed: boolean;
};

export const hospital = {
  name: 'Antharagange Rural Hospital & Research Institute',
  region: 'Kolar district, Karnataka',
  address: 'Antharagange, Kolar District, Karnataka',
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  email: 'antaraganga2019@gmail.com',
  operatingStatus: 'requires-confirmation',
  leadership: [],
  brandingStatus: 'concept-awaiting-approval',
} as const;

export const locations: Location[] = [
  {
    id: 'kolar',
    name: 'Antharagange, Kolar',
    kind: 'campus',
    region: hospital.region,
    verifiedAddress: 'Antharagange, Kolar District, Karnataka',
    phone: hospital.phone,
    email: hospital.email,
    hours: null,
    detailsConfirmed: false,
  },
];

// Outreach is an activity, not an invented permanent branch or map pin.
export const outreach = {
  region: hospital.region,
  verifiedSites: [],
  schedule: null,
} as const;
