export interface ProjectLink {
  label: string;
  shortLabel?: string;
  href: string;
  kind?: 'link' | 'download';
  note?: string;
  available?: boolean;
}

export type ProjectAccent = 'map' | 'rust' | 'gold' | 'olive';

export interface ProjectCardMeta {
  title: string;
  summary: string;
  accent: ProjectAccent;
  materials: string[];
  secondaryAction?: {
    label: string;
    href: string;
  };
}

export interface ProjectArtifact {
  src: string;
  alt: string;
  eyebrow?: string;
  caption?: string;
}

export interface ProjectDeck {
  title: string;
  pdf: string;
  slidePrefix: string;
  slideExt?: string;
  slideCount: number;
}

export interface ProjectVideo {
  src: string;
  poster: string;
  caption: string;
  mode?: 'loop' | 'play';
}

export interface ProjectYtVideo {
  ytId: string;
  title: string;
  caption?: string;
  aspect?: 'portrait' | 'landscape';
}

export interface ProjectSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  artifacts?: ProjectArtifact[];
}

export interface ProjectPaper {
  title: string;
  pdfPath: string;
  description?: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  categories: string[];
  /** Filter tags — drives the chip filter on /projects. Separate from display categories. */
  tags?: string[];
  pillars: string[];
  role: string;
  skills: string[];
  featured: boolean;
  sortOrder: number;
  heroAsset: {
    src: string;
    alt: string;
    caption?: string;
  };
  links: ProjectLink[];
  seo: {
    title?: string;
    description?: string;
  };
  card?: ProjectCardMeta;
  deck?: ProjectDeck;
  /** Embeds a written paper PDF on the project page — distinct from the slide deck. */
  paper?: ProjectPaper;
  videos?: ProjectVideo[];
  ytVideos?: ProjectYtVideo[];
  heroVideo?: string;
  caseStudy?: {
    objective: string;
    actions: string[];
    deliverables: string[];
    result: string;
  };
  routeMap?: boolean;
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    slug: 'huruf-lab',
    title: "Huruf La’b: Building an Educational Product",
    summary: 'A tactile Arabic learning system designed to turn early Arabic literacy into a classroom routine instead of a wall.',
    categories: ['Teaching & Learning', 'Product / Design'],
    tags: ['Teaching', 'Arabic', 'Product / Design', 'Video'],
    pillars: ['Teaching', 'Building'],
    role: 'Co-founder, instructional design lead, user-research lead, and product framer',
    skills: ['Pedagogy', 'Product development', 'User research', 'Entrepreneurship', 'Language learning'],
    featured: true,
    sortOrder: 2,
    card: {
      title: "Huruf La’b: Building an Educational Product",
      summary: 'A learning problem taken through prototype development, educator outreach, demonstrations, and a successful venture pitch.',
      accent: 'gold',
      materials: ['Award', 'Product', 'Arabic', 'Teaching'],
      secondaryAction: {
        label: 'Watch demos',
        href: 'https://www.youtube.com/channel/UCCRhHuIxYd3wyzYuaCNH3AA/'
      }
    },
    heroAsset: {
      src: '/assets/projects/huruf-lab/huruf-tiles-hero.webp',
      alt: "Huruf La'b Arabic letter tiles — close view of the hand-crafted wooden tiles that form the core of the tactile learning system.",
      caption: "The Huruf La'b tile system — every tile is a character form a learner can touch, move, and combine."
    },
    ytVideos: [
      {
        ytId: 'LAC1ZccTSk0',
        title: "Huruf La'b in motion",
        caption: 'Short-form demo: the tiles assembled and in use.',
        aspect: 'portrait'
      },
      {
        ytId: 'JJDS0yMyJgU',
        title: "Arabic script — hands-on",
        caption: 'Building Arabic letter forms from the tactile pieces.',
        aspect: 'portrait'
      },
      {
        ytId: 'rL2kn87Bz2M',
        title: "Letter by letter",
        caption: "How the puzzle system turns script literacy into a physical routine.",
        aspect: 'portrait'
      }
    ],
    videos: [
      {
        src: '/assets/projects/huruf-lab/video/blue-tiles-zoom-out.mp4',
        poster: '/assets/projects/huruf-lab/video/blue-tiles-zoom-out-poster.jpg',
        caption: "The Huruf La'b tiles in motion — the tactile system the whole project is built around.",
        mode: 'loop'
      },
      {
        src: '/assets/projects/huruf-lab/video/stop-motion-baa.mp4',
        poster: '/assets/projects/huruf-lab/video/stop-motion-baa-poster.jpg',
        caption: "Stop-motion teaching clip: the letter ba' assembling itself — the short-form video format the Huruf La'b channel is built on.",
        mode: 'play'
      }
    ],
    links: [
      {
        label: 'NC State news: "Puzzle project aims to make learning Arabic fun and hands-on"',
        shortLabel: 'NC State',
        href: 'https://chass.ncsu.edu/news/2026/05/05/puzzle-project-aims-to-make-learning-arabic-a-fun-hands-on-experience/',
        available: true,
        note: 'Press coverage of Huruf La\'b from NC State College of Humanities and Social Sciences.'
      },
      {
        label: "Huruf La'b on YouTube",
        shortLabel: 'YouTube',
        href: 'https://www.youtube.com/channel/UCCRhHuIxYd3wyzYuaCNH3AA/',
        available: true,
        note: 'Demonstrations and lessons built around the tactile Arabic puzzle system.'
      }
    ],
    seo: {
      title: "Huruf La’b: Building an Educational Product",
      description: "Project profile for Huruf La'b, a tactile Arabic learning system by Reese Hollister."
    },
    caseStudy: {
      "objective": "Help beginning Arabic learners understand how letter forms connect by making the script something they can handle and assemble.",
      "actions": [
            "Developed a classroom lesson and tactile learning concept, then worked with co-founder and designer Bella Templeton to refine the prototype.",
            "Connected instructional design with educator outreach, early feedback, product demonstrations, and a venture pitch."
      ],
      "deliverables": [
            "Tactile Arabic letter puzzles and classroom demonstrations.",
            "Product photographs, teaching clips, and educator outreach."
      ],
      "result": "The team received a $4,000 award in NC State’s 2026 VenturePack Challenge. The product remains in development."
},
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Beginning Arabic learners are often asked to internalize a great deal at once: a new script, positional letter forms, sound distinctions, and the logic of roots and patterns. Much of that instruction remains abstract.',
          "Huruf La'b starts from a different premise. If the structure is hard to see, it should become something a learner can handle, rearrange, and test physically."
        ]
      },
      {
        heading: 'What to notice',
        paragraphs: [
          'The design move was diagnostic: identify where early Arabic instruction stays opaque, then make that structure physical.',
          "Teacher outreach produced an early email list of more than 100 interested people, including at least two dozen Arabic teachers across the United States, the United Kingdom, and the Arab world. In April 2026, Huruf Lab won a $4,000 prize in NC State's VenturePack Challenge."
        ],
        artifacts: [
          {
            src: '/assets/projects/huruf-lab/venturepack-check.jpg',
            alt: 'Reese Hollister and his co-founder holding an oversized $4,000 check made out to Huruf Lab, winners of the NC State VenturePack Challenge.',
            eyebrow: 'Award',
            caption: "Huruf Lab won $4,000 in NC State's VenturePack Challenge (April 2026) — the university's campus-wide venture competition."
          },
          {
            src: '/assets/projects/huruf-lab/huruf-tiles-in-play.jpg',
            alt: "Hands reaching across a table covered in scattered Huruf La'b wooden letter tiles during a game.",
            eyebrow: 'Product in use',
            caption: "Huruf La'b in play at a launch event — learners building Arabic letters and words from the tactile tiles."
          },
          {
            src: '/assets/projects/huruf-lab/huruf-puzzle-detail.jpg',
            alt: "Close detail of a Huruf La'b laser-cut wooden puzzle spelling an Arabic word on its stand against a dark background.",
            eyebrow: 'Visual / artifact',
            caption: "A finished puzzle — the interlocking laser-cut tiles that make early Arabic literacy something a learner can handle and test."
          }
        ]
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          "The project shows a product-development habit that carries across Reese's work: when understanding stalls, redesign the conditions of understanding."
        ]
      }
    ]
  },
  {
    slug: 'western-sahara-capstone',
    title: "How Highways Decided Morocco's Victory in the Western Sahara Conflict",
    summary: 'A capstone argument tracing how infrastructure build-out helped make later sovereignty claims and diplomatic normalization more plausible.',
    categories: ['Research', 'Public Scholarship'],
    tags: ['Research', 'North Africa', 'Digital History', 'Public Scholarship'],
    pillars: ['Research', 'Building'],
    role: 'Historical researcher, source synthesist, and data / visual workflow builder',
    skills: ['Historical research', 'Process tracing', 'Visual evidence design', 'Data analysis', 'International studies'],
    featured: false,
    sortOrder: 5,
    card: {
      title: 'Western Sahara Highways',
      summary: 'Research on how highways, logistics corridors, and territorial administration helped Morocco convert claims over Western Sahara into durable control.',
      accent: 'rust',
      materials: ['Deck', 'Map', 'Timeline', 'Roads']
    },
    heroAsset: {
      src: '/assets/projects/western-sahara/ws-mural-hero.jpg',
      alt: 'A mural in Sidi Ifni depicting the 1975 Green March — a procession of trucks and marchers beneath the Arabic oath of the march.',
      caption: 'A street mural in Sidi Ifni memorializing the Green March of 1975 — the founding event of Morocco\'s claim to the Western Sahara.'
    },
    links: [
      {
        label: 'Roads-over-time one-pager',
        shortLabel: 'Roads PDF',
        href: '/assets/projects/western-sahara/2026-03-31__reese-portfolio__artifact__v01__roads-timeseries-one-pager.pdf',
        kind: 'download',
        available: true,
        note: 'OSM and ohsome workflow summary for Western Sahara road stock.'
      },
      {
        label: 'Dual timeline graphic',
        shortLabel: 'Timeline',
        href: '/assets/projects/western-sahara/2026-03-31__reese-portfolio__artifact__v01__dual-timeline.png',
        kind: 'download',
        available: true,
        note: 'Slide-ready graphic pairing infrastructure and diplomatic sequences.'
      }
    ],
    seo: {
      title: 'Western Sahara Capstone',
      description: "Project profile for Reese Hollister's Western Sahara capstone on roads, sovereignty, and process tracing."
    },
    paper: {
      title: "How Highways Decided Morocco's Victory in the Western Sahara Conflict",
      pdfPath: '/assets/projects/western-sahara/2026__western-sahara__paper__v01__highways-sovereignty.pdf',
      description: 'The full capstone paper on transport-infrastructure build-out and the normalisation of Moroccan sovereignty claims.'
    },
    deck: {
      title: 'Capstone presentation — NC State Graduate History Conference, April 2026',
      pdf: '/assets/projects/western-sahara/capstone-deck.pdf',
      slidePrefix: '/assets/projects/western-sahara/slides/slide',
      slideExt: 'jpg',
      slideCount: 22
    },
    caseStudy: {
      "objective": "Explain how highways and logistics corridors shaped Moroccan control and sovereignty claims in Western Sahara.",
      "actions": [
            "Connected infrastructure evidence to a historical and political argument.",
            "Organized road development, territorial administration, and recognition into timelines and maps."
      ],
      "deliverables": [
            "Graduate capstone paper and presentation deck.",
            "Highway route map, dual timeline, and roads-over-time evidence."
      ],
      "result": "Completed a graduate capstone with a reusable visual evidence set for explaining the relationship between infrastructure and sovereignty."
},
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Most accounts of Western Sahara keep diplomatic recognition and physical infrastructure in separate stories. This project asked how those stories should be read together.',
          "The capstone's central question was how physical integration, especially transport infrastructure, helped create the conditions under which Morocco's sovereignty claims became easier to normalize."
        ]
      },
      {
        heading: 'What to notice',
        paragraphs: [
          'The deck and figures pair diplomacy with infrastructure instead of treating them as separate stories.',
          'A roads-over-time workflow using OSM relation R2559126 and the ohsome history API supports year-end snapshots from 2008 through 2025.'
        ],
        artifacts: [
          {
            src: '/assets/projects/western-sahara/dual-track-timeline.png',
            alt: 'Dual-track timeline pairing a diplomatic recognition track with an infrastructure-building track from 1975 to 2025.',
            eyebrow: 'Signature figure',
            caption: 'The core analytical graphic: diplomatic milestones (top) read against infrastructure milestones (bottom), with the mechanisms — logistical leverage, administrative normalization, spatial fait accompli — that connect them.'
          },
          {
            src: '/assets/projects/western-sahara/where-is-western-sahara.png',
            alt: 'Four maps of Morocco and Western Sahara showing how the territory is variously rendered: separate, disputed, SADR-controlled, or part of Morocco.',
            eyebrow: 'Visual / artifact',
            caption: 'Four cartographic framings of the same territory — a reminder that the map itself is a contested claim.'
          },
        ]
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'The capstone produced more than a claim. It yielded a reusable evidence set, visual narrative, roads-over-time workflow, and a clearer mechanism for explaining why sovereignty politics cannot be separated from circulation.'
        ]
      }
    ]
  },
  {
    slug: 'from-colonies-to-carriers',
    title: 'From Colonies to Carriers',
    summary: 'A digital history project tracing how newly independent African states used civil aviation to project sovereignty, establish national identity, and build postcolonial institutions — with a case study on Royal Air Maroc.',
    categories: ['Digital History', 'Research'],
    tags: ['Research', 'Digital History', 'North Africa', 'Public Scholarship'],
    pillars: ['Research'],
    role: 'Researcher and digital project developer',
    skills: ['Archival research', 'Digital history', 'Database design', 'Data archaeology', 'Postcolonial history'],
    featured: true,
    sortOrder: 3,
    card: {
      title: 'From Colonies to Carriers',
      summary: 'Managing incomplete historical sources to build a 723-record airline encyclopedia, maps, a paper, and a presentation.',
      accent: 'map',
      materials: ['Deck', 'Paper', 'Dataset', 'Map']
    },
    heroAsset: {
      src: '/assets/projects/from-colonies-to-carriers/2026-06-13__reese-portfolio__asset__v01__african-airlines-routes-from-europe.png',
      alt: 'Historic route map showing European airline connections across Africa.',
      caption: 'Historical route map showing European airline connections across Africa.'
    },
    links: [
      {
        label: 'Working paper excerpt',
        shortLabel: 'Paper',
        href: '/assets/projects/from-colonies-to-carriers/2026__from-colonies-to-carriers__paper__v02__full-research-paper.pdf',
        kind: 'download',
        available: true,
        note: 'Intro and conclusion from the African airlines research paper.'
      },
      {
        label: 'Guttery airline dataset',
        shortLabel: 'Dataset',
        href: '/assets/projects/from-colonies-to-carriers/2026-06-09__from-colonies-to-carriers__dataset__v01__guttery-16-field.csv',
        kind: 'download',
        available: true,
        note: 'Downloadable extract: 59 airline records in 16 fields, rebuilt from Ben Guttery entries. The encyclopedia contains 723 records.'
      },
      {
        label: 'Newsletter: Promoting a Project',
        shortLabel: 'Newsletter',
        href: 'https://reesewhollister.substack.com/p/promoting-a-project',
        available: true,
        note: 'Substack post introducing the From Colonies to Carriers research project and the airline dataset.'
      },
      {
        label: 'Academia profile',
        shortLabel: 'Academia',
        href: 'https://ncsu.academia.edu/ReeseHollister',
        available: true,
        note: 'Research profile and publication trail.'
      },
      {
        label: 'Explore the interactive encyclopedia',
        shortLabel: 'Encyclopedia',
        href: '/african-airlines/',
        kind: 'link',
        available: true,
        note: 'Searchable database of 723 airlines with maps, timelines, and source provenance.'
      }
    ],
    seo: {
      title: 'From Colonies to Carriers',
      description: 'Digital history project on postcolonial African airline development by Reese Hollister.'
    },
    paper: {
      title: 'From Colonies to Carriers — full research paper',
      pdfPath: '/assets/projects/from-colonies-to-carriers/2026__from-colonies-to-carriers__paper__v02__full-research-paper.pdf',
      description: 'The complete research paper on postcolonial African civil aviation and Royal Air Maroc.'
    },
    deck: {
      title: 'African Airlines presentation',
      pdf: '/assets/projects/from-colonies-to-carriers/2026-06-09__from-colonies-to-carriers__deck__v01__african-airlines.pdf',
      slidePrefix: '/assets/projects/from-colonies-to-carriers/slides/slide',
      slideExt: 'jpg',
      slideCount: 27
    },
    caseStudy: {
      "objective": "Reconstruct fragmented airline records and explain how African states used civil aviation to build institutions and communicate national identity.",
      "actions": [
            "Organized historical airline entries into structured records, with attention to incomplete sources and provenance.",
            "Connected the broader dataset to a Royal Air Maroc case study through maps, ridership visuals, a written argument, and a presentation."
      ],
      "deliverables": [
            "A searchable encyclopedia with 723 airline records.",
            "A separate downloadable 59-row, 16-field CSV extract, a presentation deck, a working-paper excerpt, and maps."
      ],
      "result": "The project makes a dispersed body of evidence browseable through country, time, and institutional views. The downloadable CSV is an extract, not the full encyclopedia; incomplete historical records remain a limitation."
},
    routeMap: true,
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'When African states achieved independence in the late 1950s and 1960s, establishing a national airline was rarely a matter of economic logic alone. An airline was a flag, a symbol of sovereignty, and a daily assertion that the new state existed and belonged in the world.',
          'This project uses Royal Air Maroc as the close case while placing Morocco inside a wider African pattern of national carriers, joint ventures, state backing, foreign capital, and uneven institutional survival.'
        ]
      },
      {
        heading: 'What the deck shows',
        paragraphs: [
          'The deck carries the argument through the 1957 Air Atlas and Air Maroc merger, ownership changes over time, RAM growth metrics, national-prestige imagery, labor training, and a broader dataset of twentieth-century African airlines.',
          'The artifact set below pairs the deck with the working atlas, a RAM ridership visual, and a primary-source route map so the page shows the research machinery rather than only describing it.'
        ],
        artifacts: [
          {
            src: '/assets/projects/from-colonies-to-carriers/2026-06-09__from-colonies-to-carriers__artifact__v01__atlas-panel.jpg',
            alt: 'Interactive atlas panel showing African countries shaded by airline count.',
            eyebrow: 'Digital atlas',
            caption: 'Atlas panel from the interactive map workflow: a continent-level view of airline density by country.'
          },
          {
            src: '/assets/projects/from-colonies-to-carriers/2026-06-09__from-colonies-to-carriers__artifact__v01__ram-ridership.png',
            alt: 'Royal Air Maroc ridership data visualization showing growth over time.',
            eyebrow: 'Data visual',
            caption: 'Royal Air Maroc ridership visual from the research/video asset set, used to make institutional growth legible.'
          },
          {
            src: '/assets/projects/from-colonies-to-carriers/2026-06-09__from-colonies-to-carriers__artifact__v01__protected-routes-map.jpg',
            alt: 'Primary-source map of protected Royal Air Maroc routes in Africa.',
            eyebrow: 'Source visual',
            caption: 'Primary-source route map used to connect postcolonial airline policy to the geography of protected routes.'
          },
          {
            src: '/assets/projects/from-colonies-to-carriers/2026-06-13__reese-portfolio__asset__v01__african-airlines-admin-divisions-1960.jpg',
            alt: 'Map of African administrative divisions around 1960.',
            eyebrow: 'Historical geography',
            caption: 'Continental political geography gives the airline data a clearer independence-era frame.'
          },
          {
            src: '/assets/projects/from-colonies-to-carriers/2026-06-13__reese-portfolio__asset__v01__african-airlines-air-afrique-advertisement.png',
            alt: 'Air Afrique advertisement source image.',
            eyebrow: 'Visual source',
            caption: 'Airline advertising helps show how carriers projected identity, modernity, and regional ambition.'
          }
        ]
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'African airlines were built at a moment when the infrastructure of sovereignty was being assembled from scratch. Reading them as institutions, symbols, and data problems at once helps explain why flag carriers mattered even when pure market logic was weak.'
        ]
      }
    ]
  },
  {
    slug: 'tazmamart',
    title: 'Truth After Tazmamart',
    summary: "A deck-first research project on Morocco's Equity and Reconciliation Commission, the Years of Lead, and the political logic of transitional justice without punishment.",
    categories: ['Research', 'Public Scholarship'],
    tags: ['Research', 'North Africa', 'Public Scholarship'],
    pillars: ['Research', 'Building'],
    role: 'Historical researcher, legal analyst, and documentary storyteller',
    skills: ['Human rights history', 'International law', 'Transitional justice', 'Morocco', 'Public scholarship'],
    featured: false,
    sortOrder: 6,
    card: {
      title: 'Truth After Tazmamart',
      summary: "Research on Tazmamart, Morocco's Equity and Reconciliation Commission, and the political limits of truth-seeking when accountability remains constrained.",
      accent: 'rust',
      materials: ['Deck', 'Paper', 'Justice']
    },
    heroAsset: {
      src: '/assets/projects/tazmamart/slides/slide-01.jpg',
      alt: 'Title slide for Truth After Tazmamart: Lawfulness in Morocco\'s Equality and Reconciliation Commission.',
      caption: 'Title slide from the Truth After Tazmamart presentation on Morocco\'s Equity and Reconciliation Commission.'
    },
    links: [
      {
        label: 'Truth After Tazmamart paper',
        shortLabel: 'Paper',
        href: '/assets/projects/tazmamart/2026-06-09__tazmamart__paper__v01__truth-after-tazmamart.pdf',
        kind: 'download',
        available: true,
        note: "Research paper on lawfulness and Morocco's Equity and Reconciliation Commission."
      }
    ],
    seo: {
      title: 'Truth After Tazmamart',
      description: "Project profile for Reese Hollister's research on Tazmamart, Moroccan transitional justice, and public memory."
    },
    paper: {
      title: 'Truth After Tazmamart — research paper',
      pdfPath: '/assets/projects/tazmamart/2026-06-09__tazmamart__paper__v01__truth-after-tazmamart.pdf',
      description: "Research paper on Morocco's Equity and Reconciliation Commission and the political logic of transitional justice without punishment."
    },
    deck: {
      title: 'Truth After Tazmamart presentation',
      pdf: '/assets/projects/tazmamart/2026-06-09__tazmamart__deck__v01__truth-after-tazmamart.pdf',
      slidePrefix: '/assets/projects/tazmamart/slides/slide',
      slideExt: 'jpg',
      slideCount: 20
    },
    caseStudy: {
      "objective": "Examine what truth-seeking can achieve when a transitional justice process limits punishment and accountability.",
      "actions": [
            "Synthesized historical and legal research on Tazmamart and Morocco’s Equity and Reconciliation Commission.",
            "Built a written analysis and slide narrative explaining the political limits of reconciliation."
      ],
      "deliverables": [
            "Truth After Tazmamart research paper.",
            "Presentation deck and rendered slides."
      ],
      "result": "Produced a paper and presentation that make the argument and supporting material available for readers."
},
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          "Truth After Tazmamart asks why Morocco's Equity and Reconciliation Commission did not name or punish perpetrators after the Years of Lead, even as international human-rights norms moved toward individual accountability.",
          'The project treats that decision as a legal and political problem: not simply a failure to punish, but a choice about how far a monarchy-led truth process could go while preserving state legitimacy.'
        ]
      },
      {
        heading: 'What the deck shows',
        paragraphs: [
          'The deck introduces the Years of Lead, Tazmamart as a symbol of secret detention and state violence, the rise of international accountability norms, and the ERC mandate in 2004-2005.',
          'It then frames the central argument: the ERC reduced pressure on the monarchy partly because it pursued public truth, compensation, and institutional repair without directly prosecuting perpetrators.'
        ]
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'The project sits at the intersection of Moroccan history, international law, and public memory. It shows how transitional justice can produce real testimony and recognition while also protecting the political structures that shaped the violence.'
        ]
      }
    ]
  },
  {
    slug: 'fulbright-morocco',
    title: 'Fulbright Morocco / International Research & Teaching',
    summary: 'Field-based research, language study, teaching, and public-facing academic work carried out in Morocco during 2023-2024.',
    categories: ['Research', 'Teaching & Learning', 'Public Scholarship'],
    tags: ['Research', 'North Africa', 'Arabic', 'Public Scholarship'],
    pillars: ['Research', 'Teaching'],
    role: 'Fulbright researcher, language learner, teacher, and public-facing interpreter',
    skills: ['Fulbright', 'Morocco', 'Arabic', 'French', 'Intercultural work', 'Public-facing scholarship'],
    featured: false,
    sortOrder: 7,
    card: {
      title: 'Fulbright Morocco',
      summary: 'Fieldwork and language-study archive from a Fulbright year in Morocco — connecting archival research practice, Arabic and Darija study, and public historical interpretation.',
      accent: 'olive',
      materials: ['Fieldwork', 'Arabic', 'Teaching'],
      secondaryAction: {
        label: 'Fieldwork archive',
        href: 'https://sites.google.com/ncsu.edu/reese/welcome?pli=1'
      }
    },
    heroAsset: {
      src: '/assets/fieldwork/heroes/merzouga-dunes-camels-hero-16x9.webp',
      alt: 'The Sahara dunes near Merzouga, Morocco — sweeping sand ridges with camels at the base, a landscape tied to mobility and fieldwork.',
      caption: 'Merzouga, Morocco — the Sahara edge. Fieldwork during the 2023–24 Fulbright year trained a reading of mobility at multiple scales: roads, routes, archives, airlines, and everyday movement.'
    },
    heroVideo: '/assets/projects/fulbright-morocco/video/hassan-ii-bg.mp4',
    links: [
      {
        label: 'Original Morocco fieldwork page',
        shortLabel: 'Fieldwork',
        href: 'https://sites.google.com/ncsu.edu/reese/welcome?pli=1',
        available: true,
        note: 'Earlier public-facing record of the Fulbright year, language study, and Morocco-based research.'
      },
      {
        label: 'Teaching Arabic portfolio',
        shortLabel: 'Arabic teaching',
        href: 'https://sites.google.com/ncsu.edu/reese/teaching-arabic',
        available: true,
        note: "Public teaching page tied to Reese's Arabic pedagogy and Morocco experience."
      },
      {
        label: 'Fieldwork dispatches on Substack',
        shortLabel: 'Dispatches',
        href: 'https://reesewhollister.substack.com',
        available: true,
        note: 'Newsletter archive of Morocco and Oman fieldwork — settling in, teaching, travel, and language study.'
      }
    ],
    seo: {
      title: 'Fulbright Morocco / International Research & Teaching',
      description: "Project profile for Reese Hollister's Morocco-based research, teaching, and language-learning work."
    },
    ytVideos: [
      {
        ytId: 'dcMU990QZew',
        title: 'Morocco — field footage',
        caption: 'Documentary footage from the Fulbright year in Morocco.',
        aspect: 'landscape'
      },
      {
        ytId: 'wiq-s7y4Jss',
        title: 'Morocco & U.S. History: Through the Decades',
        caption: 'Event presentation on the arc of U.S.–Morocco relations and historical contact.',
        aspect: 'landscape'
      },
      {
        ytId: 'yM_sz5yexpo',
        title: 'Fulbright fieldwork',
        caption: 'Field video from the 2023–24 Fulbright year — Morocco, research, and movement.',
        aspect: 'landscape'
      }
    ],
    videos: [
      {
        src: '/assets/projects/fulbright-morocco/video/azrou-barley-field.mp4',
        poster: '/assets/projects/fulbright-morocco/video/azrou-barley-field-poster.jpg',
        caption: 'A barley field near Azrou in the Middle Atlas — wind moving through the green. Fieldwork travel during the Fulbright year.',
        mode: 'loop'
      },
      {
        src: '/assets/projects/fulbright-morocco/video/morocco-1700.mp4',
        poster: '/assets/projects/fulbright-morocco/video/morocco-1700-poster.jpg',
        caption: 'The Kasbah of the Udayas above the Bou Regreg, Rabat — the walled quarter where the river meets the Atlantic.',
        mode: 'play'
      }
    ],
    caseStudy: {
      "objective": "Investigate Moroccan history while developing language skills and working across research and teaching settings.",
      "actions": [
            "Conducted archival research at the Mohammed VI Library in Ifrane.",
            "Combined Arabic and Darija study with history teaching and outward-facing research communication."
      ],
      "deliverables": [
            "Fieldwork dispatches, photography, and historical presentations.",
            "Teaching work and research materials grounded in Moroccan archives and places."
      ],
      "result": "Completed the 2023–24 Fulbright year with a body of fieldwork, teaching, and public communication that informs later North Africa projects."
},
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'This project frame treats Morocco as a site of language learning, teaching, intercultural work, and research practice.',
          "It matters because it sharpened Reese's ability to work across linguistic, disciplinary, and institutional boundaries during 2023-2024."
        ]
      },
      {
        heading: 'What to notice',
        paragraphs: [
          'The Fulbright year combined Arabic study, historical research, classroom teaching, and outward-facing academic communication.',
          'Modern Standard Arabic, Moroccan Darija, French, and Moroccan institutional settings all shaped the work.'
        ],
        artifacts: [
          {
            src: '/assets/projects/fulbright-morocco/atlantic-harbor-essaouira.jpg',
            alt: 'Blue fishing boats moored in the Atlantic harbor at Essaouira, Morocco.',
            eyebrow: 'Fieldwork / place',
            caption: 'Essaouira harbor — Atlantic Morocco as a site of movement, trade, and historical circulation.'
          },
          {
            src: '/assets/projects/fulbright-morocco/merzouga-sahara-map.jpg',
            alt: 'Illustrated map of the Moroccan Sahara showing the Erfoud, Rissani, Merzouga, and Taouz region, with painted camels, Tuareg figures, and the Hamada de Guir desert plateau labeled in French.',
            eyebrow: 'Fieldwork / artifact',
            caption: 'Painted map of the Sahara border region — Erfoud, Rissani, and Merzouga — documenting research terrain in southeastern Morocco.'
          },
          {
            src: '/assets/projects/fulbright-morocco/essaouira-atlantic-wall.jpg',
            alt: 'An orange cat resting on the sun-warmed rampart wall of Essaouira, with the grey Atlantic Ocean and a rocky breakwater visible behind it.',
            eyebrow: 'Atlantic coast / Morocco',
            caption: "Essaouira's Atlantic ramparts — the walled city and port that anchors Morocco's connection to the ocean."
          },
          {
            src: '/assets/projects/fulbright-morocco/aui-archive-display-web.jpg',
            alt: 'Display case at Mohammed VI Library, Al-Akhawayn University in Ifrane, Morocco, showing archival materials including postcards, letters, advertisements, vacation photos, and maps from the colonial and postcolonial period.',
            eyebrow: 'Archive / Mohammed VI Library',
            caption: 'Archival materials at Mohammed VI Library, Al-Akhawayn University, Ifrane — postcards, letters, advertisements, vacation photos, maps, and other ephemera from the colonial period. The library holds hundreds of pieces of visual culture from Ifrane\'s history as a French hill station.'
          },
          {
            src: '/assets/projects/fulbright-morocco/aui-campus-reese-web.jpg',
            alt: 'Reese Hollister standing on the campus of Al-Akhawayn University (AUI) in Ifrane, Morocco — a 1930s French colonial hill station, now an English-language university.',
            eyebrow: 'Research site / AUI campus',
            caption: 'Al-Akhawayn University in Ifrane — established in the 1930s as a French colonial hill station, today home to the Mohammed VI Library and the archival collections at the center of this research.'
          }
        ]
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          "The Morocco year strengthened Reese's cross-cultural judgment, sharpened his focus on North Africa, and reinforced a public-facing approach to scholarship that takes explanation seriously."
        ]
      }
    ]
  },
  {
    slug: 'oman-arabic',
    title: 'Oman / Arabic Language Study',
    summary:
      "An immersive Arabic study program based in Manah, Oman, in the summer of 2023 — daily language work paired with the landscape, craft, and everyday life of the country's interior.",
    categories: ['Teaching & Learning', 'Public Scholarship'],
    tags: ['Arabic', 'Oman', 'Language immersion'],
    pillars: ['Teaching', 'Research'],
    role: 'Arabic language student and intercultural learner',
    skills: ['Arabic', 'Oman', 'Language immersion', 'Intercultural work'],
    featured: false,
    sortOrder: 8,
    card: {
      title: 'Oman / Arabic Study',
      summary:
        'An immersive Arabic program in Manah, Oman — language study carried into the mountains and markets of the interior.',
      accent: 'map',
      materials: ['Arabic', 'Immersion', 'Fieldwork']
    },
    heroAsset: {
      src: '/assets/projects/oman-arabic/jebel-shams.jpg',
      alt: 'A small group stands on the overhanging rim of Jebel Shams at dusk — the highest peak in Oman — above the haze of the Wadi Ghul canyon.',
      caption: 'Jebel Shams, Oman — the rim of the Wadi Ghul canyon at dusk, during a 2023 Arabic study program based in Manah.'
    },
    links: [
      {
        label: 'Fieldwork dispatches on Substack',
        shortLabel: 'Dispatches',
        href: 'https://reesewhollister.substack.com',
        available: true,
        note: 'Newsletter archive of Morocco and Oman fieldwork — settling in, teaching, travel, and language study.'
      }
    ],
    seo: {
      title: 'Oman / Arabic Language Study',
      description:
        "Reese Hollister's 2023 Arabic language study program in Manah, Oman — immersion paired with the landscape and daily life of the country's interior."
    },
    videos: [
      {
        src: '/assets/projects/oman-arabic/video/jebel-shams-goat.mp4',
        poster: '/assets/projects/oman-arabic/video/jebel-shams-goat-poster.jpg',
        caption: "One of the long-haired goats of Jebel Shams — the mountain interior where the program's field trips ran.",
        mode: 'loop'
      }
    ],
    caseStudy: {
      "objective": "Deepen Arabic through an immersive language-study program in Oman.",
      "actions": [
            "Studied Arabic in Manah and used the language in everyday interactions.",
            "Documented learning and field trips through writing and photography."
      ],
      "deliverables": [
            "Written dispatches and field photographs from Oman."
      ],
      "result": "Extended Arabic learning into a Gulf setting, adding a further cross-cultural context to the later Morocco research and teaching."
},
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          "In the summer of 2023, Reese studied Arabic through an immersive program based in Manah, a town in Oman's Ad Dakhiliyah interior — pairing daily formal language work with travel across the country.",
          'The title of that summer’s photo album — منح... وسط لا مكان, "Manah… in the middle of nowhere" — captures the setting: a small interior town as the base for full immersion in Gulf Arabic and everyday Omani life.'
        ]
      },
      {
        heading: 'What to notice',
        paragraphs: [
          "Language study here was not confined to a classroom. It ran through markets, mountain villages, and the country's dramatic interior — from the Wadi Ghul canyon at Jebel Shams to the date-palm towns of the Dakhiliyah.",
          "Oman extended a long arc of Arabic study, adding a Gulf dialect region alongside the Modern Standard Arabic, Moroccan Darija, and French behind the rest of Reese's work."
        ],
        artifacts: [
          {
            src: '/assets/projects/oman-arabic/goat-jebel-shams.jpg',
            alt: 'A long-haired goat with curved horns stands among the pale rocks of Jebel Shams, Oman.',
            eyebrow: 'Place / Jebel Shams',
            caption: "The long-haired goats of Jebel Shams — a small detail of the mountain interior where the program's field trips ran."
          }
        ]
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'The Oman program deepened Reese’s Arabic across a second dialect region and reinforced a habit of learning a language by living inside it — the same approach behind his teaching and Huruf Lab.'
        ]
      }
    ]
  },
  {
    slug: 'teaching-writing-support',
    title: 'University Teaching and Student Support',
    summary: 'Writing consultation, large-lecture teaching support, and student-centered pedagogy grounded in real learning bottlenecks.',
    categories: ['Teaching & Learning', 'Public Scholarship'],
    tags: ['Teaching', 'Writing', 'Public Scholarship'],
    pillars: ['Teaching', 'Research'],
    role: 'Graduate Writing Consultant and Graduate Teaching Assistant',
    skills: ['Writing pedagogy', 'Tutoring', 'Student support', 'Instructional design'],
    featured: true,
    sortOrder: 1,
    card: {
      title: 'University Teaching and Student Support',
      summary: 'Course support, grading, student advising, and individualized writing consultation at NC State.',
      accent: 'gold',
      materials: ['Teaching', 'Writing', 'Pedagogy'],
      secondaryAction: {
        label: 'College essay coaching',
        href: '/coaching'
      }
    },
    heroAsset: {
      src: '/assets/projects/teaching-writing-support/teaching-presentation.jpg',
      alt: 'Reese teaching at the front of a classroom, presenting to seated students.',
      caption: 'Teaching in the classroom — student-centered instruction and writing support.'
    },
    links: [
      {
        label: 'Teaching artifacts',
        href: '#',
        available: false,
        note: 'Workshop handouts, slide excerpts, or anonymized support materials can be added once they are cleared for public use.'
      },
      {
        label: 'Pedagogy statement',
        href: '#',
        available: false,
        note: 'Internal resource.'
      }
    ],
    seo: {
      title: 'University Teaching and Student Support',
      description: "Project profile for Reese Hollister's teaching and writing support work."
    },
    caseStudy: {
      "objective": "Help students navigate course material and writing assignments with clear expectations, useful feedback, and individualized support.",
      "actions": [
            "Supported instruction, grading, and student advising in NC State’s 80-student PS 331 course across multiple semesters.",
            "Provided one-on-one writing consultations through the Academic Success Center, helping students interpret prompts, structure arguments, and organize evidence.",
            "Adapted feedback to each writer’s assignment and stage of revision."
      ],
      "deliverables": [
            "Course assessment and instructional support.",
            "Individual writing consultations and assignment-specific revision guidance."
      ],
      "result": "Provided recurring support in both a lecture course and a writing center, backed by CRLA Level III certification."
},
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Students rarely arrive with a generic writing problem. They arrive with mismatched assumptions, unclear assignments, uneven confidence, and real constraints on time and attention.',
          'This body of work treats teaching support as situated problem-solving rather than the delivery of canned study skills.'
        ]
      },
      {
        heading: 'What to notice',
        paragraphs: [
          'The work centers on diagnosis: prompts, arguments, structure, evidence, and the moment a writer loses momentum.',
          'At NC State, that meant graduate writing consultations and repeated teaching support in an 80-student U.S. Foreign Policy course.'
        ]
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'The most important outcome is a repeatable practice of helping people move from uncertainty to agency in classrooms, writing centers, and any setting where explanation has to meet a real person at the point of need.'
        ]
      }
    ]
  },
  {
    "slug": "public-history-engagement",
    "title": "Public History and Audience Engagement",
    "summary": "History teaching, public presentations, and educational media that connect specialized research with students and wider audiences.",
    "categories": [
        "Public Scholarship",
        "Teaching & Learning"
    ],
    "tags": [
        "Public Scholarship",
        "Teaching",
        "Video"
    ],
    "pillars": [
        "Teaching",
        "Research"
    ],
    "role": "History teacher, BrainLyne convenor, presenter, and educational media creator",
    "skills": [
        "Audience-aware communication",
        "History teaching",
        "Public speaking",
        "Educational media",
        "Cross-cultural communication"
    ],
    "featured": true,
    "sortOrder": 4,
    "card": {
        "title": "Public History and Audience Engagement",
        "summary": "Translating historical material into classroom teaching, a public lecture event, written dispatches, and educational videos.",
        "accent": "rust",
        "materials": [
            "Teaching",
            "Talks",
            "Video"
        ],
        "secondaryAction": {
            "label": "Watch Historical Method Man",
            "href": "https://www.youtube.com/channel/UCCRhHuIxYd3wyzYuaCNH3AA/"
        }
    },
    "heroAsset": {
        "src": "/assets/projects/fulbright-morocco/aui-archive-display-web.jpg",
        "alt": "Historical Ifrane tourism brochure and map displayed at the Mohammed VI Library, Al Akhawayn University, Morocco.",
        "caption": "Archival material at the Mohammed VI Library — part of the research context behind my public historical work."
    },
    "links": [
        {
            "label": "Historical Method Man",
            "href": "https://www.youtube.com/channel/UCCRhHuIxYd3wyzYuaCNH3AA/"
        },
        {
            "label": "Teaching Modern United States History — event reflection",
            "href": "https://reesewhollister.substack.com/p/teaching-modern-united-states-history"
        },
        {
            "label": "Writing and publications",
            "href": "/writing"
        }
    ],
    "seo": {
        "title": "Public History and Audience Engagement",
        "description": "Reese Hollister’s history teaching, public presentations, educational videos, and communication for audiences beyond specialist research."
    },
    "ytVideos": [
        {
            "ytId": "wiq-s7y4Jss",
            "title": "Morocco & U.S. History: Through the Decades",
            "caption": "Public presentation connecting U.S. and Moroccan history.",
            "aspect": "landscape"
        }
    ],
    "caseStudy": {
        "objective": "Make historical questions meaningful to students and public audiences without losing the evidence and context behind them.",
        "actions": [
            "Taught history and facilitated BrainLyne student research and university-access writing at the American Language Center in Rabat.",
            "Connected classroom material to a public lecture event and reflected on that process in a published teaching dispatch.",
            "Produced educational videos and written public scholarship through Historical Method Man and Substack."
        ],
        "deliverables": [
            "History instruction, student research support, and a public history presentation.",
            "Educational videos, teaching reflections, and public essays."
        ],
        "result": "The work is available as a public presentation, written reflection, and educational media archive."
    },
    "sections": [
        {
            "heading": "Teaching history beyond the classroom",
            "paragraphs": [
                "At the American Language Center in Rabat, teaching modern U.S. history led into a live public history event. The accompanying written reflection connects course topics with the work of preparing material for a wider audience."
            ]
        },
        {
            "heading": "Public scholarship in several formats",
            "paragraphs": [
                "Historical Method Man, newsletter essays, and public presentations offer different ways into the same research. The task is to choose an explanation and a format that help an audience follow the argument."
            ]
        }
    ]
},
  {
    "slug": "applied-ai-workflows",
    "title": "Digital Research and Process Design",
    "summary": "Process designs for organizing sources, preparing educational materials, and documenting review and handoff steps.",
    "categories": [
        "Research",
        "Public Scholarship"
    ],
    "tags": [
        "Research",
        "Digital History"
    ],
    "pillars": [
        "Research",
        "Teaching"
    ],
    "role": "Process designer",
    "skills": [
        "Source review",
        "Process documentation",
        "Research organization",
        "Instructional planning"
    ],
    "featured": false,
    "sortOrder": 9,
    "heroAsset": {
        "src": "/assets/projects/from-colonies-to-carriers/2026-06-09__from-colonies-to-carriers__artifact__v01__atlas-panel.jpg",
        "alt": "African airlines atlas showing countries shaded by airline count.",
        "caption": "The airline atlas provides a research context for thinking through source organization and review."
    },
    "card": {
        "title": "Digital Research and Process Design",
        "summary": "Four process examples for preparing, checking, and handing off research and educational work.",
        "accent": "map",
        "materials": [
            "Documentation",
            "Research",
            "Process"
        ]
    },
    "links": [
        {
            "label": "Research and data project",
            "href": "/projects/from-colonies-to-carriers"
        },
        {
            "label": "Teaching and writing support",
            "href": "/projects/teaching-writing-support"
        }
    ],
    "seo": {
        "title": "Digital Research and Process Design",
        "description": "Reese Hollister’s process designs for writing support, educational materials, research communication, and source review."
    },
    "caseStudy": {
        "objective": "Make recurring knowledge work easier to explain, review, and hand off.",
        "actions": [
            "Outlined inputs, review responsibilities, and handoff steps for writing support, Arabic teaching, public history scripts, and historical data extraction.",
            "Separated preparation tasks from decisions that require a teacher, writer, or researcher."
        ],
        "deliverables": [
            "Four process descriptions covering preparation, review, and documentation."
        ],
        "result": "A set of process designs and review boundaries. These are examples of an approach, not evidence of deployed institutional systems or measured productivity gains."
    },
    "sections": [
        {
            "heading": "Writing support",
            "paragraphs": [
                "A proposed intake process would identify the revision problem, prepare questions, and organize reusable guidance. The tutor would make the judgment in conversation with the writer."
            ]
        },
        {
            "heading": "Arabic teaching materials",
            "paragraphs": [
                "A preparation process would organize practice sequences and lesson variations around the tactile tiles. Teachers would adapt and assess the materials for their learners."
            ]
        },
        {
            "heading": "Research to script",
            "paragraphs": [
                "Source notes would become an outline and draft, with checks for unclear claims and missing context before publication. Interpretation and final editorial decisions would stay with the researcher."
            ]
        },
        {
            "heading": "Historical data extraction",
            "paragraphs": [
                "An extraction plan would define fields, record source gaps, and flag ambiguous entries for review. Unknown information would remain unknown."
            ]
        },
        {
            "heading": "Tools and review",
            "paragraphs": [
                "AI-assisted drafting can sit alongside structured datasets, source notes, and manual checking. The process still needs clear inputs, review steps, and responsibility for the final work."
            ]
        }
    ]
}
];

export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((left, right) => left.sortOrder - right.sortOrder);

export const sortedProjects = [...projects].sort((left, right) => left.sortOrder - right.sortOrder);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
