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

// Add verified construction updates and campus photos when the hospital supplies them.
export const hospitalProgress: HospitalProgress = {
  current: null,
  milestones: [],
  photos: [],
  futureProjects: [],
};

export const campusRendering: CampusPhoto = {
  src: '/media/support/shared/hospital-original-render.webp',
  alt: 'Architectural drawing of the proposed Antharagange Rural Hospital campus',
  caption: 'Architectural rendering of the proposed campus',
  width: 1383,
  height: 1080,
};
