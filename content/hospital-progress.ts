export type CampusPhoto = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

type ProgressUpdate = { title: string; summary: string; date?: string };

type HospitalProgress = {
  current: ProgressUpdate | null;
  milestones: ProgressUpdate[];
  photos: CampusPhoto[];
  futureProjects: ProgressUpdate[];
};

const photoDirectory = '/media/support/hospital-progress';

export const floorPlans: CampusPhoto[] = [
  {
    src: `${photoDirectory}/floor-plan-basement.jpeg`,
    alt: 'Architectural drawing of the basement layout',
    caption: 'Basement floor plan',
    width: 1111,
    height: 1600,
  },
  {
    src: `${photoDirectory}/floor-plan-ground.jpeg`,
    alt: 'Architectural drawing of the ground-floor layout',
    caption: 'Ground floor plan',
    width: 1600,
    height: 1141,
  },
  {
    src: `${photoDirectory}/floor-plan-first.jpeg`,
    alt: 'Architectural drawing of the first-floor layout',
    caption: 'First floor plan',
    width: 1600,
    height: 1138,
  },
  {
    src: `${photoDirectory}/floor-plan-second.jpeg`,
    alt: 'Architectural drawing of the second-floor layout',
    caption: 'Second floor plan',
    width: 1600,
    height: 1139,
  },
];

export const hospitalProgress: HospitalProgress = {
  current: {
    title: 'Construction complete and equipping underway',
    summary:
      'Construction of Antharagange Rural Hospital is complete, and care has begun. Work to equip additional facilities continues.',
  },
  milestones: [
    {
      date: '15 September 2024',
      title: 'Bhoomi Puja and start of construction',
      summary: 'A traditional Bhoomi Puja ceremony marked the start of hospital construction.',
    },
    {
      title: 'Basement structure',
      summary:
        'Work progressed from excavation and foundations to columns, retaining walls, the basement roof and plastering.',
    },
    {
      title: 'Ground-floor structure',
      summary:
        'Columns and beams went up, followed by roof and stair reinforcement, plastering and partition walls.',
    },
    {
      title: 'First-floor structure',
      summary:
        'Work included columns, beams and stair reinforcement, concrete pouring and electrical conduit installation.',
    },
    {
      title: 'Hospital construction complete',
      summary: 'Care has begun at the Kolar campus while the hospital continues to add equipment.',
    },
  ],
  photos: [
    {
      src: `${photoDirectory}/hospital-exterior-day.jpeg`,
      alt: 'Daytime view of the hospital building and its entrance ramp',
      caption: 'Hospital exterior in daylight',
      width: 1280,
      height: 960,
    },
    {
      src: `${photoDirectory}/hospital-entrance-evening.jpeg`,
      alt: 'The hospital entrance and front of the building lit at night',
      caption: 'Hospital entrance at night',
      width: 1206,
      height: 911,
    },
    {
      src: `${photoDirectory}/hospital-interior-fit-out.jpeg`,
      alt: 'Reception counter and glass partitions during interior fit-out',
      caption: 'Reception area during interior fit-out',
      width: 1587,
      height: 698,
    },
    {
      src: `${photoDirectory}/hospital-exterior-evening.jpeg`,
      alt: 'Side and front of the hospital building lit at night',
      caption: 'Hospital exterior at night',
      width: 1206,
      height: 887,
    },
    {
      src: `${photoDirectory}/basement-excavation.jpeg`,
      alt: 'Excavator digging below ground level on the hospital site',
      caption: 'Construction archive · Basement excavation',
      width: 720,
      height: 631,
    },
    {
      src: `${photoDirectory}/ground-floor-partitions.jpeg`,
      alt: 'Unfinished masonry partition walls beneath the concrete slab',
      caption: 'Construction archive · Ground-floor partitions',
      width: 901,
      height: 627,
    },
    {
      src: `${photoDirectory}/first-floor-construction.jpeg`,
      alt: 'Masonry walls and exposed reinforcement during first-floor construction',
      caption: 'Construction archive · First-floor work',
      width: 936,
      height: 520,
    },
  ],
  futureProjects: [],
};

export const campusRendering: CampusPhoto = {
  src: '/media/support/shared/hospital-original-render.webp',
  alt: 'Architectural drawing of the proposed Antharagange Rural Hospital campus',
  caption: 'Architectural rendering of the proposed campus',
  width: 1383,
  height: 1080,
};
