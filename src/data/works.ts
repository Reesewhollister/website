/**
 * works.ts — structured metadata for all PDFs and downloadable work samples.
 *
 * PDFs live in public/assets/projects/{slug}/ (not a separate /pdfs/ folder —
 * they're organized with their project assets). See public/assets/pdfs/README.md.
 *
 * To add a PDF:
 * 1. Drop the file in public/assets/projects/{slug}/
 * 2. Add an entry to the works array below.
 * 3. Set thumbnailPath to a project image if you have one; leave undefined otherwise.
 */

export type WorkType =
  | 'paper'
  | 'deck'
  | 'writing-sample'
  | 'teaching'
  | 'public-scholarship'
  | 'dataset';

export interface Work {
  id: string;
  title: string;
  type: WorkType;
  project: string;
  projectSlug?: string;
  year: string;
  description: string;
  pdfPath: string;
  thumbnailPath?: string;
  tags: string[];
  featured?: boolean;
}

export const works: Work[] = [
  // ── Research papers ────────────────────────────────────────────────────────

  {
    id: 'colonies-carriers-paper',
    title: 'From Colonies to Carriers — Working paper (intro & conclusion)',
    type: 'paper',
    project: 'From Colonies to Carriers',
    projectSlug: 'from-colonies-to-carriers',
    year: '2026',
    description:
      'Intro and conclusion from the African airlines research paper tracing how newly independent states used civil aviation to project sovereignty and build postcolonial institutions.',
    pdfPath:
      '/assets/projects/from-colonies-to-carriers/2026-06-09__from-colonies-to-carriers__paper__v01__intro-conclusion.pdf',
    thumbnailPath: '/assets/projects/from-colonies-to-carriers/airlines-title.jpg',
    tags: ['Research', 'North Africa', 'Digital History'],
    featured: true
  },

  {
    id: 'tazmamart-paper',
    title: 'Truth After Tazmamart — Research paper',
    type: 'paper',
    project: 'Truth After Tazmamart',
    projectSlug: 'tazmamart',
    year: '2026',
    description:
      "Research paper on Morocco's Equity and Reconciliation Commission, the Years of Lead, and the political logic of transitional justice without punishment.",
    pdfPath: '/assets/projects/tazmamart/2026-06-09__tazmamart__paper__v01__truth-after-tazmamart.pdf',
    thumbnailPath: '/assets/projects/tazmamart/slides/slide-01.jpg',
    tags: ['Research', 'North Africa', 'Public Scholarship'],
    featured: true
  },

  // ── Slide decks ────────────────────────────────────────────────────────────

  {
    id: 'colonies-carriers-deck',
    title: 'From Colonies to Carriers — Presentation deck',
    type: 'deck',
    project: 'From Colonies to Carriers',
    projectSlug: 'from-colonies-to-carriers',
    year: '2026',
    description:
      'Full 27-slide deck presented at NC State — the complete argument on postcolonial African civil aviation, Royal Air Maroc, and the dataset.',
    pdfPath:
      '/assets/projects/from-colonies-to-carriers/2026-06-09__from-colonies-to-carriers__deck__v01__african-airlines.pdf',
    thumbnailPath: '/assets/projects/from-colonies-to-carriers/slides/slide-01.jpg',
    tags: ['Research', 'North Africa', 'Digital History'],
    featured: true
  },

  {
    id: 'western-sahara-deck',
    title: 'Western Sahara Highways — Capstone presentation deck',
    type: 'deck',
    project: 'Western Sahara Highways',
    projectSlug: 'western-sahara-capstone',
    year: '2026',
    description:
      'Presentation deck (22 slides) for the NC State Graduate History Conference — arguing how highway infrastructure helped Morocco normalize sovereignty claims over Western Sahara.',
    pdfPath: '/assets/projects/western-sahara/capstone-deck.pdf',
    thumbnailPath: '/assets/projects/western-sahara/slides/slide-01.jpg',
    tags: ['Research', 'North Africa', 'Public Scholarship'],
    featured: false
  },

  {
    id: 'tazmamart-deck',
    title: 'Truth After Tazmamart — Presentation deck',
    type: 'deck',
    project: 'Truth After Tazmamart',
    projectSlug: 'tazmamart',
    year: '2026',
    description:
      "20-slide deck on Morocco's Equity and Reconciliation Commission, Tazmamart prison, and how truth commissions navigate accountability under constrained political conditions.",
    pdfPath: '/assets/projects/tazmamart/2026-06-09__tazmamart__deck__v01__truth-after-tazmamart.pdf',
    thumbnailPath: '/assets/projects/tazmamart/slides/slide-01.jpg',
    tags: ['Research', 'North Africa', 'Public Scholarship'],
    featured: false
  },

  // ── Public scholarship / research artifacts ─────────────────────────────

  {
    id: 'western-sahara-roads-onepager',
    title: 'Western Sahara Roads — Time-series one-pager',
    type: 'public-scholarship',
    project: 'Western Sahara Highways',
    projectSlug: 'western-sahara-capstone',
    year: '2026',
    description:
      'Methodology one-pager documenting the OSM and ohsome workflow for tracking Western Sahara road stock year-by-year from 2008 to 2025.',
    pdfPath:
      '/assets/projects/western-sahara/2026-03-31__reese-portfolio__artifact__v01__roads-timeseries-one-pager.pdf',
    thumbnailPath: '/assets/projects/western-sahara/n1-road-map.png',
    tags: ['Research', 'North Africa', 'Digital History'],
    featured: false
  },

  // ── Placeholders — add PDF files and remove TODO comments when ready ──────

  // TODO: Add Huruf La'b pitch deck PDF to:
  //   public/assets/projects/huruf-lab/huruf-lab-pitch-deck.pdf
  // {
  //   id: 'huruf-lab-deck',
  //   title: "Huruf La'b — Pitch deck",
  //   type: 'deck',
  //   project: "Huruf La'b",
  //   projectSlug: 'huruf-lab',
  //   year: '2026',
  //   description: "Venture pitch deck for the Huruf La'b tactile Arabic learning system, used for the NC State VenturePack Challenge.",
  //   pdfPath: '/assets/projects/huruf-lab/huruf-lab-pitch-deck.pdf',
  //   thumbnailPath: '/assets/projects/huruf-lab/huruf-tiles-hero.webp',
  //   tags: ['Teaching', 'Arabic', 'Product / Design'],
  //   featured: false
  // },

  // TODO: Add teaching philosophy PDF to:
  //   public/assets/projects/teaching-writing-support/teaching-philosophy.pdf
  // {
  //   id: 'teaching-philosophy',
  //   title: 'Teaching Philosophy Statement',
  //   type: 'teaching',
  //   project: 'Teaching & Writing Support',
  //   projectSlug: 'teaching-writing-support',
  //   year: '2026',
  //   description: 'Statement of teaching philosophy covering writing consultation, Arabic instruction, and student-centered pedagogy.',
  //   pdfPath: '/assets/projects/teaching-writing-support/teaching-philosophy.pdf',
  //   tags: ['Teaching', 'Writing'],
  //   featured: false
  // },

  // TODO: Add Fulbright project overview PDF to:
  //   public/assets/projects/fulbright-morocco/fulbright-project-overview.pdf
  // {
  //   id: 'fulbright-overview',
  //   title: 'Fulbright Morocco — Project overview',
  //   type: 'writing-sample',
  //   project: 'Fulbright Morocco',
  //   projectSlug: 'fulbright-morocco',
  //   year: '2023',
  //   description: 'Project overview and research statement for the Fulbright year in Morocco.',
  //   pdfPath: '/assets/projects/fulbright-morocco/fulbright-project-overview.pdf',
  //   thumbnailPath: '/assets/fieldwork/heroes/chefchaouen-blue-plaza-hero-16x9.webp',
  //   tags: ['Research', 'North Africa', 'Arabic'],
  //   featured: false
  // },
];

export const featuredWorks = works.filter((w) => w.featured);

export function getWorksByType(type: WorkType): Work[] {
  return works.filter((w) => w.type === type);
}

export function getWorksByProject(projectSlug: string): Work[] {
  return works.filter((w) => w.projectSlug === projectSlug);
}

export const workTypeLabels: Record<WorkType, string> = {
  paper: 'Research Papers',
  deck: 'Slide Decks',
  'writing-sample': 'Writing Samples',
  teaching: 'Teaching Materials',
  'public-scholarship': 'Public Scholarship',
  dataset: 'Datasets'
};
