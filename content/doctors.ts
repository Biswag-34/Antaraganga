export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  qualifications: string;
  bio: string;
  portrait?: string;
};

export const doctors: Doctor[] = [];
