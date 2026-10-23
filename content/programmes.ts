import mapping from './programme-map.json';
export type Programme = {
  id: string;
  title: string;
  asset: string;
  cover: string;
  source_document: string;
  note: string;
  heading: string;
  need: string;
  scope: string[];
  budget: number | null;
  category: string;
  disclosure?: string;
  fundingStatus: 'unconfirmed';
  statusUpdatedAt: string | null;
};
const details: Record<
  string,
  Omit<
    Programme,
    | 'id'
    | 'title'
    | 'asset'
    | 'cover'
    | 'source_document'
    | 'note'
    | 'fundingStatus'
    | 'statusUpdatedAt'
  >
> = {
  it: {
    heading: 'Connected systems. More connected care.',
    need: 'Reliable digital systems help registration, records and clinical teams work together.',
    scope: [
      'Hospital management and electronic records',
      'Registration, laboratory and pharmacy workflows',
      'Secure connectivity, backup and staff training',
    ],
    budget: 1200000,
    category: 'Hospital systems',
  },
  mobility: {
    heading: 'Support mobility. Strengthen independence.',
    need: 'Accessible equipment can support safe movement, dignity and everyday participation.',
    scope: [
      'Wheelchairs and patient mobility aids',
      'Safe transfers and assisted movement',
      'Equipment access and caregiver support',
    ],
    budget: 300000,
    category: 'Rehabilitation',
  },
  reception: {
    heading: 'A welcoming start to every care journey.',
    need: 'Clear registration and administration help families navigate their hospital visit.',
    scope: [
      'Reception and registration furniture',
      'Administration equipment',
      'Patient guidance and record workflows',
    ],
    budget: 1000000,
    category: 'Hospital systems',
  },
  ambulance: {
    heading: 'Connecting people to timely care.',
    need: 'Appropriately equipped and staffed transport can support referrals and transfers.',
    scope: [
      'Advanced ambulance vehicle',
      'Monitoring and emergency-support equipment',
      'Safe transport and referral readiness',
    ],
    budget: 2500000,
    category: 'Critical care',
    disclosure:
      'The source states ₹25 lakh, while its listed items total ₹27 lakh. This ₹2 lakh discrepancy needs reconciliation before a funding commitment.',
  },
  emergency: {
    heading: 'Support the first moments of care.',
    need: 'A prepared emergency and casualty area supports assessment, stabilisation and referral.',
    scope: [
      'Emergency assessment and treatment equipment',
      'Patient monitoring and support',
      'Clinical workflow and readiness',
    ],
    budget: 900000,
    category: 'Critical care',
  },
  dialysis: {
    heading: 'Bring dialysis closer to rural families.',
    need: 'A local service can reduce the burden of travel for ongoing treatment.',
    scope: [
      'Three haemodialysis machines and three beds or recliners',
      'RO water treatment, reliable power and essential infrastructure',
      'Patient monitoring, emergency support and furniture',
    ],
    budget: 1250000,
    category: 'Critical care',
  },
  rehab: {
    heading: 'More movement. More independence.',
    need: 'Repeated therapy and supervised exercise can be difficult to access far from home.',
    scope: [
      'Physiotherapy and exercise equipment',
      'Balance, gait training and mobility systems',
      'Rehabilitation tools and treatment furniture',
    ],
    budget: 1250000,
    category: 'Rehabilitation',
  },
  wound: {
    heading: 'A clearer pathway for wound care.',
    need: 'People with complex wounds need assessment, appropriate care and consistent follow-up.',
    scope: [
      'Proposed wound and diabetic foot assessment',
      'Treatment and dressing resources',
      'Clinical training and follow-up pathways',
    ],
    budget: null,
    category: 'Critical care',
    disclosure:
      'The source does not allocate a dedicated budget to this proposed service. Scope and cost require confirmation.',
  },
  ct: {
    heading: 'Strengthen access to diagnostic imaging.',
    need: 'Locally accessible imaging can support assessment and clinical decision-making.',
    scope: [
      'Proposed 64-slice CT scanner',
      'Technical planning and procurement specifications',
      'Commissioning, training and service planning',
    ],
    budget: 15000000,
    category: 'Diagnostics',
    disclosure:
      'The summary allocates ₹1.50 crore; the detailed source gives a ₹1–1.5 crore range. This uses the upper planning allocation, not a supplier quotation.',
  },
  carm: {
    heading: 'Support imaging where care happens.',
    need: 'Intraoperative imaging can support appropriate procedures within a prepared clinical service.',
    scope: [
      'C-Arm imaging system',
      'Compatibility and technical assessment',
      'Training, commissioning and maintenance planning',
    ],
    budget: 1500000,
    category: 'Diagnostics',
    disclosure:
      'This allocation is included within the operation theatre proposal. It must not be counted twice.',
  },
  xray: {
    heading: 'A clearer picture. Closer to home.',
    need: 'Diagnostic imaging supports timely assessment and referral for rural families.',
    scope: [
      'Digital X-ray equipment',
      'Technical and room-readiness planning',
      'Installation, staff training and service support',
    ],
    budget: 1500000,
    category: 'Diagnostics',
    disclosure:
      'The summary lists ₹15 lakh; the detailed source gives a ₹12–15 lakh range. The upper figure is a planning allocation.',
  },
  lab: {
    heading: 'Better access to essential diagnostics.',
    need: 'A local diagnostic laboratory can support the care pathway with appropriate investigations.',
    scope: [
      'Diagnostic laboratory equipment',
      'Sample and reporting workflows',
      'Quality, training and procurement planning',
    ],
    budget: 2000000,
    category: 'Diagnostics',
  },
  ot: {
    heading: 'Help build the foundations of surgical care.',
    need: 'Surgical care requires a coordinated environment, trained teams and dependable equipment.',
    scope: [
      'Operation theatre equipment and infrastructure',
      'Anaesthesia and monitoring systems',
      'Commissioning and staff readiness',
    ],
    budget: 8680000,
    category: 'Critical care',
    disclosure:
      'The operation theatre allocation includes the C-Arm component. Programme totals overlap and must not be added together.',
  },
  icu: {
    heading: 'Support care when people need it most.',
    need: 'Critical care depends on trained teams, monitoring, equipment and continuity of support.',
    scope: [
      'Intensive care beds and monitoring',
      'Ventilation and emergency-support systems',
      'Clinical readiness and equipment training',
    ],
    budget: 10250000,
    category: 'Critical care',
  },
  opd: {
    heading: 'A first point of care for rural families.',
    need: 'Accessible outpatient care can help people seek assessment and navigate further treatment.',
    scope: [
      'Outpatient consultation spaces and equipment',
      'Patient assessment and clinical workflows',
      'Furniture, support and referral pathways',
    ],
    budget: 1000000,
    category: 'Hospital systems',
  },
};
export const programmes: Programme[] = mapping.map((p) => ({
  ...p,
  ...details[p.id],
  fundingStatus: 'unconfirmed',
  statusUpdatedAt: null,
}));
export const getProgramme = (id: string) => programmes.find((p) => p.id === id);
export const money = (amount: number) =>
  amount >= 10000000
    ? `₹${(amount / 10000000).toFixed(2)} crore`
    : `₹${(amount / 100000).toFixed(2)} lakh`;
export const enquiryUrl = (interest: string, type = 'partnership') =>
  `/contact?type=${type}&interest=${encodeURIComponent(interest)}`;
