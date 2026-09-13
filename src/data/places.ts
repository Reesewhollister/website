/**
 * Geography for the home map hero.
 *
 * Two kinds of geography live here and must never be mixed:
 *   - Place.kind 'worked'    → lived, studied or was employed there (solid mark)
 *   - Place.kind 'travelled' → passed through (hollow ring)
 *   - a hatched region       → wrote about it; see src/data/papers.ts
 *
 * The three must stay visually distinct: that distinction is the point of the map.
 *
 * Every fact below is drawn from src/data/site.ts and src/data/projects.ts.
 * Nothing here is invented; places with no photograph render a designed placeholder.
 */

export type PlaceKind = 'worked' | 'travelled' | 'area' | 'cluster';
export type Relation = 'made' | 'about';
export type StudyRegion = 'africa' | 'western-sahara' | 'morocco';

export interface PlaceProject {
  /** Slug in src/data/projects.ts */
  slug: string;
  relation: Relation;
  /** Region to hatch when this project is hovered/focused. Only for relation 'about'. */
  region?: StudyRegion;
}

export interface PlaceMedia {
  kind: 'photo' | 'video';
  /** Photograph, or the video's poster frame. Local — no third-party request until play. */
  src: string;
  alt: string;
  caption: string;
  /** Unlisted YouTube id. Required when kind is 'video'. */
  youtubeId?: string;
}

export interface Place {
  id: string;
  kind: PlaceKind;
  name: string;
  short: string;
  /** [lon, lat] */
  coords: [number, number];
  labelPos: 'left' | 'right' | 'top' | 'bottom';
  /** Label leader offset in viewBox units, for crowded spots. */
  offset?: [number, number];
  /**
   * Which corner the pinned media card hangs from. Derived from the pin's
   * position by default; set it where the automatic side would cover a
   * neighbouring pin once the map is zoomed in.
   */
  cardSide?: 'left' | 'right' | 'center';
  period: string | null;
  institutions: string[];
  roles: string[];
  context: string;
  /**
   * The evidence pinned to this place. A photograph, or a video that plays in
   * place (the YouTube player is only loaded once someone presses play).
   * null renders the designed "Image needed" placeholder.
   */
  media: PlaceMedia | null;
  /** Shown inside the designed placeholder when media is null. */
  imageNeeded: string;
  projects: PlaceProject[];
  /** A source for the relationship, where separately documented. */
  source?: { label: string; href: string };
  /** Cluster only: [[lon0, lat0], [lon1, lat1]] zoom target. */
  bbox?: [[number, number], [number, number]];
  children?: Place[];
}

export const MAP = {
  /**
   * Framing: the whole world. The research regions reach from the American West
   * to Japan, so an Atlantic-only frame cannot hold them. Antarctica and the high
   * Arctic are cropped away — nothing is marked there.
   */
  frame: {
    type: 'Polygon' as const,
    coordinates: [[[-179, -50], [-179, 76], [179, 76], [179, -50], [-179, -50]]]
  },
  width: 1000,
  height: 495,
  pad: 8,
  /** World scale means clusters need far more magnification than the old Atlantic frame. */
  maxZoom: 12
};

/** Chronological. Drawn once, dashed, no travelling dots. */
export const JOURNEY = ['bronx', 'manah', 'morocco', 'raleigh'];

export const PLACES: Place[] = [
  {
    id: 'mid-atlantic',
    kind: 'cluster',
    name: 'The Mid-Atlantic',
    short: 'Mid-Atlantic',
    coords: [-74.5, 40.6],
    labelPos: 'top',
    bbox: [[-77.6, 38.7], [-71.8, 42.4]],
    period: null,
    institutions: [],
    roles: ['Museum visitor services', 'B.A. in History and Political Science'],
    context:
      'Two places a short drive apart in the northeastern United States: a museum front desk in Bucks County, and an undergraduate degree in the Bronx.',
    media: {
      kind: 'video',
      src: '/assets/fieldwork/video-posters/mercer-doylestown.jpg',
      alt: 'Video still: Reese answering the phone at the Mercer Museum front desk',
      caption: 'A day at the Mercer Museum',
      youtubeId: 'l-b7TlnR3Vs'
    },
    imageNeeded: 'Pennsylvania and New York',
    projects: [],
    children: [
      {
        id: 'doylestown',
        kind: 'worked',
        name: 'Doylestown, Pennsylvania',
        short: 'Doylestown',
        coords: [-75.13, 40.31],
        labelPos: 'left',
        cardSide: 'right', // hangs west, leaving the New York pin clear when zoomed
        period: null, // dates to confirm
        institutions: ['Mercer Museum', 'Fonthill Castle'],
        roles: ['Museum visitor services', 'Public history'],
        context:
          'Visitor services at the Mercer Museum and Fonthill Castle in Bucks County — the front desk of a museum where the history is the building and the collection you walk through.',
        media: {
          kind: 'video',
          src: '/assets/fieldwork/video-posters/mercer-doylestown.jpg',
          alt: 'Video still: Reese answering the phone at the Mercer Museum front desk',
          caption: 'A day at the Mercer Museum',
          youtubeId: 'l-b7TlnR3Vs'
        },
        imageNeeded: 'Mercer Museum & Fonthill Castle',
        projects: []
      },
      {
        id: 'bronx',
        kind: 'worked',
        name: 'The Bronx, New York',
        short: 'New York',
        coords: [-73.9, 40.89],
        labelPos: 'right',
        period: '2019–2023',
        institutions: ['Manhattan College'],
        roles: ['B.A. in History and Political Science'],
        context:
          'Undergraduate history and political science, published in peer-reviewed history journals, and the first work on postcolonial Africa and French institutional history.',
        media: null,
        imageNeeded: 'Manhattan College',
        projects: []
      }
    ]
  },
  {
    id: 'raleigh',
    kind: 'worked',
    name: 'Raleigh, North Carolina',
    short: 'Raleigh',
    coords: [-78.64, 35.78],
    labelPos: 'bottom',
    period: '2024–2026',
    institutions: ['NC State University'],
    roles: [
      'Master of International Studies',
      'Graduate Teaching Assistant — PS 331: U.S. Foreign Policy',
      'Graduate Writing Consultant, Academic Success Center (CRLA Level III)'
    ],
    context:
      'Graduate study, teaching, and writing consultation — and the base where the research projects, datasets, and Huruf La’b were built.',
    media: {
      kind: 'photo',
      src: '/assets/projects/huruf-lab/venturepack-check.jpg',
      alt: "The Hurūf La'b founders holding an oversized four thousand dollar VenturePack Challenge cheque in front of an NC State Innovation and Entrepreneurship backdrop",
      caption: "Hurūf La'b · $4,000 VenturePack award"
    },
    imageNeeded: 'NC State University',
    projects: [
      { slug: 'teaching-writing-support', relation: 'made' },
      { slug: 'from-colonies-to-carriers', relation: 'made' },
      { slug: 'huruf-lab', relation: 'made' },
      { slug: 'western-sahara-capstone', relation: 'made' },
      { slug: 'tazmamart', relation: 'made' }
    ]
  },
  {
    id: 'manah',
    kind: 'worked',
    name: 'Manah, Oman',
    short: 'Manah',
    coords: [57.59, 22.81],
    labelPos: 'left',
    period: 'Summer 2023',
    institutions: [],
    roles: ['Immersive Arabic study'],
    context:
      'Immersive Arabic study in Manah, with language learning carried into everyday encounters and field trips across Oman.',
    media: {
      kind: 'video',
      src: '/assets/fieldwork/video-posters/oman-manah.jpg',
      alt: 'Video still: Reese with two men in Omani dress, captioned Arabic Scholarship Abroad in Oman',
      caption: 'Arabic scholarship abroad in Oman',
      youtubeId: 'ivZ7jb32Al4'
    },
    imageNeeded: 'Manah, Oman',
    projects: [{ slug: 'oman-arabic', relation: 'made' }]
  },
  {
    id: 'morocco',
    kind: 'cluster',
    name: 'Morocco',
    short: 'Morocco',
    coords: [-6.0, 32.2],
    labelPos: 'left',
    bbox: [[-13.5, 27.5], [-1, 36.4]],
    period: '2023–2024',
    institutions: [
      'Fulbright U.S. Student Program',
      'Al Akhawayn University in Ifrane',
      'American Language Center, Rabat'
    ],
    roles: [
      'Fulbright Scholar — field-based research',
      'History Teacher and BrainLyne Convenor',
      'Arabic and Darija study'
    ],
    context:
      'A Fulbright year of research in Ifrane, archival work at the Mohammed VI Library, history teaching in Rabat, and travel around Morocco. It grounded the North Africa focus that runs through everything since.',
    media: {
      kind: 'photo',
      src: '/assets/fieldwork/heroes/chefchaouen-blue-plaza-hero-16x9.webp',
      alt: 'Blue-washed plaza in Chefchaouen, Morocco',
      caption: 'Chefchaouen · Morocco fieldwork'
    },
    imageNeeded: 'Morocco fieldwork',
    projects: [
      { slug: 'fulbright-morocco', relation: 'made' },
      { slug: 'western-sahara-capstone', relation: 'about', region: 'western-sahara' },
      { slug: 'tazmamart', relation: 'about', region: 'morocco' }
    ],
    children: [
      {
        id: 'rabat',
        kind: 'worked',
        name: 'Rabat, Morocco',
        short: 'Rabat',
        coords: [-6.84, 34.02],
        labelPos: 'left',
        period: '2023–2024',
        institutions: ['American Language Center, Rabat'],
        roles: ['History Teacher and BrainLyne Convenor'],
        context:
          'Taught history and convened BrainLyne, a student research and university-access writing program, in an Arabic-language environment.',
        media: {
          kind: 'video',
          src: '/assets/fieldwork/video-posters/rabat-alc.jpg',
          alt: 'Video still: Reese in the Moroccan desert, titled in Arabic “Research in Morocco”, with the Fulbright logo',
          caption: 'Fulbright research in Morocco',
          youtubeId: 'YtidSf3TcIc'
        },
        imageNeeded: 'American Language Center, Rabat',
        projects: [{ slug: 'teaching-writing-support', relation: 'made' }]
      },
      {
        id: 'ifrane',
        kind: 'worked',
        name: 'Ifrane, Morocco',
        short: 'Ifrane',
        coords: [-5.11, 33.53],
        labelPos: 'right',
        period: '2023–2024',
        institutions: ['Al Akhawayn University', 'Mohammed VI Library'],
        roles: ['Fulbright research base', 'Archival research'],
        context:
          'The research base for the Fulbright year: a French colonial hill station turned American-style university, and an archive of postcards, letters, advertisements, photographs, maps, and ephemera.',
        media: {
          kind: 'photo',
          src: '/assets/fieldwork/heroes/mohammed-vi-library-aui-hero-16x9.webp',
          alt: 'The Mohammed VI Library at Al Akhawayn University, Ifrane',
          caption: 'Mohammed VI Library · Al Akhawayn University'
        },
        imageNeeded: 'Mohammed VI Library, Ifrane',
        projects: [{ slug: 'fulbright-morocco', relation: 'made' }]
      },
      {
        id: 'chefchaouen',
        kind: 'travelled',
        name: 'Chefchaouen, Morocco',
        short: 'Chefchaouen',
        coords: [-5.26, 35.17],
        labelPos: 'top',
        period: null,
        institutions: [],
        roles: [],
        context: 'The blue city in the Rif, visited during the Fulbright year.',
        media: {
          kind: 'photo',
          src: '/assets/fieldwork/heroes/chefchaouen-blue-plaza-hero-16x9.webp',
          alt: 'Blue-washed plaza in Chefchaouen, Morocco',
          caption: 'Chefchaouen'
        },
        imageNeeded: 'Chefchaouen',
        projects: []
      },
      {
        id: 'merzouga',
        kind: 'travelled',
        name: 'Merzouga, Morocco',
        short: 'Merzouga',
        coords: [-4.01, 31.1],
        labelPos: 'bottom',
        period: null,
        institutions: [],
        roles: [],
        context: 'The dunes of Erg Chebbi on the Saharan edge of the country.',
        media: {
          kind: 'photo',
          src: '/assets/fieldwork/heroes/merzouga-dunes-camels-hero-16x9.webp',
          alt: 'Camels crossing the dunes at Merzouga, Morocco',
          caption: 'Merzouga · Erg Chebbi'
        },
        imageNeeded: 'Merzouga',
        projects: []
      },
      {
        id: 'fez',
        kind: 'travelled',
        name: 'Fez, Morocco',
        short: 'Fez',
        coords: [-5.0, 34.04],
        labelPos: 'top',
        offset: [26, -34],
        period: '2023–2024',
        institutions: [],
        roles: ['Travel'],
        context: 'A visit to Fez during the Fulbright year, documented in the Fez and Ifrane weekend dispatch.',
        media: null,
        imageNeeded: 'Fez',
        source: { label: 'Read the Fez and Ifrane dispatch', href: 'https://reesewhollister.substack.com/p/fes-and-ifrane-weekend' },
        projects: []
      }
    ]
  }
];

/** Flat list including cluster children, in map/prev-next order. */
export const ALL_PLACES: Place[] = PLACES.flatMap((p) => [p, ...(p.children ?? [])]);
