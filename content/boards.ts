type BoardMember = {
  name: string;
  portrait: { file: string; width: number; height: number };
};

// Names, board membership and portrait order follow Team2.pdf (November 2026).
export const boards: { id: string; name: string; members: BoardMember[] }[] = [
  {
    id: 'trustee-board',
    name: 'Trustee Board',
    members: [
      {
        name: 'Jagadish Gokavarapu',
        portrait: { file: 'team2/jagadish-gokavarapu.webp', width: 259, height: 321 },
      },
      {
        name: 'Muralidharan Govindarajan',
        portrait: { file: 'team2/muralidharan-govindarajan.webp', width: 640, height: 800 },
      },
      {
        name: 'Dr Pradeep Kumar N',
        portrait: { file: 'team2/pradeep-kumar-n.webp', width: 640, height: 800 },
      },
      {
        name: 'Anupama Chandra',
        portrait: { file: 'team2/anupama-chandra.webp', width: 286, height: 354 },
      },
      {
        name: 'Dr. K S Shankar',
        portrait: { file: 'team2/k-s-shankar.webp', width: 640, height: 800 },
      },
    ],
  },
  {
    id: 'advisory-board',
    name: 'Advisory Board',
    members: [
      {
        name: 'Dr. Sundareshan M N',
        portrait: { file: 'team2/sundareshan-m-n.webp', width: 640, height: 800 },
      },
      {
        name: 'Dr Seemanthini Desai',
        portrait: { file: 'team2/seemanthini-desai.webp', width: 286, height: 354 },
      },
      {
        name: 'Dr Y V Venkatachala',
        portrait: { file: 'team2/y-v-venkatachala.webp', width: 640, height: 800 },
      },
      {
        name: 'K S Chitrita',
        portrait: { file: 'team2/k-s-chitrita.webp', width: 640, height: 800 },
      },
      {
        name: 'Dr. Chirag P Gowda',
        portrait: { file: 'team2/chirag-p-gowda.webp', width: 640, height: 800 },
      },
    ],
  },
];
