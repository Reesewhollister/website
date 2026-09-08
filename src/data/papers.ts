/**
 * Published papers — the scholarship layer of the map and the source for /writing.
 *
 * Every entry is verified against the Google Scholar profile
 * (https://scholar.google.com/citations?user=Cmv_-MMAAAAJ). Links go to the
 * open-access journal, never to a re-hosted PDF. Two of these journals publish
 * per-issue rather than per-article, so those cite page numbers against the
 * issue page.
 *
 * Every `summary` paraphrases a thesis sentence from the author's own
 * manuscript. Nothing here is invented.
 */

export interface Paper {
  id: string;
  title: string;
  venue: string;
  year: string;
  volume?: string;
  pages?: string;
  /** Open-access journal page or issue. */
  url: string;
  /** Wording for the outbound link, e.g. "Read in the Gettysburg Historical Journal". */
  linkLabel: string;
  /** Region hatched on the plate. null for a paper with no single setting. */
  region: string | null;
  /** Representative point for the paper marker, [lon, lat]. */
  coords?: [number, number];
  labelPos?: 'left' | 'right' | 'top' | 'bottom';
  /** Short place name shown on the marker. */
  place?: string;
  summary: string;
  /** Shown only where Scholar reports one. */
  citations?: number;
  /** Renders a visible flag in dev; resolve before it matters. */
  verify?: string;
}

/**
 * How a research region is drawn. `iso` merges country geometries out of the
 * same world-atlas topology the plate already uses; `bbox` draws a rectangle
 * for a region that is not a whole country.
 */
export interface ResearchRegion {
  id: string;
  label: string;
  iso?: string[];
  bbox?: [[number, number], [number, number]];
}

export const RESEARCH_REGIONS: ResearchRegion[] = [
  { id: 'vietnam', label: 'Vietnam', iso: ['704'] },
  { id: 'japan', label: 'Japan', iso: ['392'] },
  { id: 'south-africa', label: 'South Africa', iso: ['710'] },
  // The American West is a region, not a country: the Rockies and the Great Basin,
  // roughly the ground the Hayden Survey covered.
  { id: 'us-west', label: 'The American West', bbox: [[-124.5, 31.5], [-102, 49]] },
  // Already drawn by the plate for the airline and Western Sahara work.
  { id: 'africa', label: 'Africa' },
  { id: 'western-sahara', label: 'Western Sahara' },
  { id: 'morocco', label: 'Morocco' }
];

export const PAPERS: Paper[] = [
  {
    id: 'jackson',
    title: 'Photography, Identity, Power: William Henry Jackson and the American Colonial Gaze',
    venue: 'History Matters: An Undergraduate Journal of Historical Research',
    year: '2023',
    volume: 'Vol. 20',
    pages: 'pp. 39–96',
    url: 'https://journals.library.appstate.edu/index.php/historymatters/issue/view/HM23',
    linkLabel: 'Read in History Matters',
    region: 'us-west',
    coords: [-114, 38],
    labelPos: 'bottom',
    place: 'American West',
    summary:
      'Photographs spanning William Henry Jackson’s long career tell the story of settler colonialism — the racial ideologies that drove the dispossession of American Indian nations, and the closing of the frontier.',
    verify: 'Scholar lists this as vol. 19; App State’s archive lists vol. 20 as the 2023 issue.'
  },
  {
    id: 'vietnam',
    title: 'Postcolonial Museums and National Identity in Vietnam',
    venue: 'The Gettysburg Historical Journal',
    year: '2023',
    volume: 'Vol. 22, No. 1',
    pages: 'pp. 105–123',
    url: 'https://cupola.gettysburg.edu/ghj/vol22/iss1/8/',
    linkLabel: 'Read in the Gettysburg Historical Journal',
    region: 'vietnam',
    coords: [106.5, 16],
    labelPos: 'right',
    place: 'Vietnam',
    summary:
      'After North and South merged, the unified Vietnamese state used museums and monuments to reimagine its identity — an official history built on anti-colonialism, shared trauma, and socialist solidarity.',
    citations: 2
  },
  {
    id: 'japan',
    title: 'Japanese Peace and Soft Power: Osaka Expo ’70 in the Cold War’s Space Race',
    venue: 'Colorado Journal of Asian Studies',
    year: '2023',
    volume: 'Vol. 10, No. 1',
    pages: 'pp. 129–141',
    url: 'https://www.colorado.edu/cas/media/261',
    linkLabel: 'Read in the Colorado Journal of Asian Studies',
    region: 'japan',
    coords: [138.5, 37],
    labelPos: 'right',
    place: 'Japan',
    summary:
      'Barred from offensive force by Article 9, Japan used Osaka Expo ’70 and its new space programme to show power by non-military means — a World’s Fair as a rebranding of the nation as a peaceful internationalist.'
  },
  {
    id: 'sharpeville',
    title:
      'The Sharpeville Massacre, Violence, and the Struggles of the African National Congress, 1960–1990',
    venue: 'Armstrong Undergraduate Journal of History',
    year: '2023',
    volume: 'Vol. 13, No. 1',
    pages: 'pp. 62–75',
    url: 'https://digitalcommons.georgiasouthern.edu/aujh/vol13/iss1/5/',
    linkLabel: 'Read in the Armstrong Undergraduate Journal of History',
    region: 'south-africa',
    coords: [25, -29],
    labelPos: 'left',
    place: 'South Africa',
    summary:
      'The ANC’s own internal writings show the Sharpeville Massacre of 21 March 1960 as the turning point at which the Congress changed its attitude towards violence as a means of resistance.',
    citations: 8
  },
  {
    id: 'medieval-queer',
    title: 'Lenses, Focus, and Fluidity: Lessons from Medieval Queer History',
    venue: 'The Gettysburg Historical Journal',
    year: '2022',
    volume: 'Vol. 21, No. 1',
    pages: 'pp. 6–19',
    url: 'https://cupola.gettysburg.edu/ghj/vol21/iss1/6/',
    linkLabel: 'Read in the Gettysburg Historical Journal',
    // Historiographical rather than geographic — it gets no mark on the plate.
    region: null,
    summary: 'On method: what the study of medieval queer history teaches about reading past lives.',
    citations: 1
  }
];

/** Papers that carry a place, and therefore a mark on the map. */
export const MAPPED_PAPERS = PAPERS.filter((paper) => paper.region && paper.coords);
