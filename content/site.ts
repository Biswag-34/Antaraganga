export const navigation = [
  {
    label: 'Our Hospital',
    href: '/hospital',
    children: [
      { label: 'Our purpose', href: '/hospital#purpose' },
      { label: 'Our approach', href: '/hospital#approach' },
      { label: 'Our people', href: '/hospital#people' },
    ],
  },
  {
    label: 'Care & Services',
    href: '/care',
    children: [
      { label: 'Care overview', href: '/care' },
      { label: 'Health-card initiative', href: '/health-card' },
    ],
  },
  {
    label: 'Our Work',
    href: '/work',
    children: [
      { label: 'Community programmes', href: '/work' },
      { label: 'First-aid training', href: '/work#first-aid' },
    ],
  },
  {
    label: 'Locations',
    href: '/network',
    children: [
      { label: 'Hospital campus', href: '/network#campus' },
      { label: 'Community outreach', href: '/network#outreach' },
    ],
  },
];
export const commitments = [
  {
    title: 'Rural-first',
    description: 'Care that comes to you.',
    icon: 'rural-first',
    image: '02-mission-rural-family',
    detail: 'Healthcare shaped around rural families and the communities they call home.',
  },
  {
    title: 'Disability-first',
    description: 'Dignity, mobility and independence.',
    icon: 'disability-first',
    image: '03-mission-disability-rehab',
    detail: 'Dignity, mobility and everyday independence.',
  },
  {
    title: 'Community-first',
    description: 'Stronger, healthier communities.',
    icon: 'community-first',
    image: '04-programme-eye-care',
    detail: 'Care, prevention and support that reach beyond the hospital.',
  },
];
export const workStories = [
  {
    title: 'Meenakshi eye care',
    heading: 'Helping people see a way forward.',
    description: 'Screening and cataract-care support.',
    image: '04-programme-eye-care',
    icon: 'eye-care',
    tab: 'Eye care',
    steps: ['Screen', 'Refer', 'Follow up'],
    enquiry: 'Meenakshi eye care',
  },
  {
    title: 'Rural health camps',
    heading: 'Care where communities gather.',
    description: 'Screening and essential care close to home.',
    image: '05-programme-rural-health-camp',
    icon: 'community-first',
    tab: 'Rural health camps',
    steps: ['Connect', 'Screen', 'Support'],
    enquiry: 'Community health camps',
  },
  {
    title: 'PraChi first aid',
    heading: 'The first response can begin with us.',
    description: 'Practical first-aid skills for safer, stronger communities.',
    image: '06-programme-prachi-first-aid',
    icon: 'first-aid',
    tab: 'PraChi first aid',
    steps: ['Learn', 'Practise', 'Respond'],
    enquiry: 'First-aid training',
  },
];
export type Service = {
  id: string;
  title: string;
  image: string;
  icon: string;
  description: string;
  features: string[];
  group: number;
  programme?: string;
};
export const services: Service[] = [
  {
    id: 'rural',
    title: 'Rural healthcare',
    image: '02-mission-rural-family',
    icon: 'rural-first',
    description:
      'A people-centred approach to primary care, assessment and appropriate referral for rural families.',
    features: ['Consultation', 'Family care', 'Referral guidance'],
    group: 0,
    programme: 'opd',
  },
  {
    id: 'rehabilitation',
    title: 'Disability & rehabilitation',
    image: '10-adult-rehabilitation',
    icon: 'disability-first',
    description:
      'Personalised care to support mobility, independence and participation in daily life.',
    features: ['Physiotherapy', 'Mobility support', 'Caregiver guidance'],
    group: 1,
    programme: 'rehab',
  },
  {
    id: 'mental',
    title: 'Mental health',
    image: '11-mental-health-counselling',
    icon: 'brain',
    description:
      'A supportive conversation about emotional wellbeing, family support and connection to care.',
    features: ['Counselling', 'Family support', 'Community connection'],
    group: 2,
  },
  {
    id: 'wound',
    title: 'Wound & diabetic foot care',
    image: '12-wound-foot-consultation',
    icon: 'treatment',
    description:
      'A proposed pathway for wound assessment, appropriate care and follow-up with trained professionals.',
    features: ['Assessment', 'Care planning', 'Follow-up'],
    group: 0,
    programme: 'wound',
  },
  {
    id: 'kidney',
    title: 'Kidney care',
    image: '13-dialysis-unit',
    icon: 'life-buoy',
    description:
      'A proposed three-station dialysis service to bring repeated care closer to rural families.',
    features: ['Treatment stations', 'Water systems', 'Clinical oversight'],
    group: 0,
    programme: 'dialysis',
  },
  {
    id: 'eye',
    title: 'Eye care',
    image: '04-programme-eye-care',
    icon: 'eye-care',
    description:
      'Community eye screening and guidance towards further assessment and cataract care.',
    features: ['Screening', 'Referral', 'Follow-up'],
    group: 2,
  },
  {
    id: 'telemedicine',
    title: 'Telemedicine',
    image: '21-hospital-it-systems',
    icon: 'monitor',
    description:
      'Explore how connected systems can support referrals, records and continuity of care.',
    features: ['Connected records', 'Referral support', 'Continuity'],
    group: 0,
    programme: 'it',
  },
];
export const careSteps = [
  {
    title: 'Consultation',
    description: 'Understand your needs with compassion.',
    image: '07-care-journey-cutout',
    icon: 'consultation',
  },
  {
    title: 'Assessment',
    description: 'A closer look at your health and functional abilities.',
    image: '02-mission-rural-family',
    icon: 'clipboard-check',
  },
  {
    title: 'Care plan',
    description: 'Your care team creates a plan designed around your goals.',
    image: '10-adult-rehabilitation',
    icon: 'treatment',
  },
  {
    title: 'Follow-up',
    description: 'Ongoing review and support.',
    image: '03-mission-disability-rehab',
    icon: 'rehabilitation',
  },
];
