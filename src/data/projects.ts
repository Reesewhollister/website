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

export interface Project {
  slug: string;
  title: string;
  summary: string;
  categories: string[];
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
  videos?: ProjectVideo[];
  ytVideos?: ProjectYtVideo[];
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    slug: 'huruf-lab',
    title: "Huruf La'b",
    summary: 'A tactile Arabic learning system designed to turn early Arabic literacy into a classroom routine instead of a wall.',
    categories: ['Teaching & Learning', 'Product / Design'],
    pillars: ['Teaching', 'Building'],
    role: 'Co-founder, instructional design lead, user-research lead, and product framer',
    skills: ['Pedagogy', 'Product development', 'User research', 'Entrepreneurship', 'Language learning'],
    featured: true,
    sortOrder: 1,
    card: {
      title: "Huruf La'b",
      summary: 'Tactile Arabic puzzle system that turns early script learning into a hands-on classroom routine.',
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
      title: "Huruf La'b",
      description: "Project profile for Huruf La'b, a tactile Arabic learning system by Reese Hollister."
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
    pillars: ['Research', 'Building'],
    role: 'Historical researcher, source synthesist, and data / visual workflow builder',
    skills: ['Historical research', 'Process tracing', 'Visual evidence design', 'Data analysis', 'International studies'],
    featured: true,
    sortOrder: 2,
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
    deck: {
      title: 'Capstone presentation — NC State Graduate History Conference, April 2026',
      pdf: '/assets/projects/western-sahara/capstone-deck.pdf',
      slidePrefix: '/assets/projects/western-sahara/slides/slide',
      slideExt: 'jpg',
      slideCount: 22
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
    pillars: ['Research'],
    role: 'Researcher and data archaeologist',
    skills: ['Archival research', 'Digital history', 'Database design', 'Data archaeology', 'Postcolonial history'],
    featured: true,
    sortOrder: 3,
    card: {
      title: 'From Colonies to Carriers',
      summary: 'Dataset and digital history project tracing how newly independent African states used national airlines and route networks to make sovereignty operational — with Royal Air Maroc as the close case.',
      accent: 'map',
      materials: ['Deck', 'Paper', 'Dataset', 'Map']
    },
    heroAsset: {
      src: '/assets/projects/from-colonies-to-carriers/airlines-title.jpg',
      alt: 'Title artwork for "From Colonies to Carriers: Postcolonial African Airlines" — a stylized airliner tracing a contrail across the African continent.',
      caption: 'Title art from the From Colonies to Carriers project on postcolonial African aviation.'
    },
    links: [
      {
        label: 'Working paper excerpt',
        shortLabel: 'Paper',
        href: '/assets/projects/from-colonies-to-carriers/2026-06-09__from-colonies-to-carriers__paper__v01__intro-conclusion.pdf',
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
        note: 'Structured 16-field dataset rebuilt from Ben Guttery airline entries.'
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
      }
    ],
    seo: {
      title: 'From Colonies to Carriers',
      description: 'Digital history project on postcolonial African airline development by Reese Hollister.'
    },
    deck: {
      title: 'African Airlines presentation',
      pdf: '/assets/projects/from-colonies-to-carriers/2026-06-09__from-colonies-to-carriers__deck__v01__african-airlines.pdf',
      slidePrefix: '/assets/projects/from-colonies-to-carriers/slides/slide',
      slideExt: 'jpg',
      slideCount: 27
    },
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
    pillars: ['Research', 'Building'],
    role: 'Historical researcher, legal analyst, and documentary storyteller',
    skills: ['Human rights history', 'International law', 'Transitional justice', 'Morocco', 'Public scholarship'],
    featured: true,
    sortOrder: 4,
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
    deck: {
      title: 'Truth After Tazmamart presentation',
      pdf: '/assets/projects/tazmamart/2026-06-09__tazmamart__deck__v01__truth-after-tazmamart.pdf',
      slidePrefix: '/assets/projects/tazmamart/slides/slide',
      slideExt: 'jpg',
      slideCount: 20
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
    pillars: ['Research', 'Teaching'],
    role: 'Fulbright researcher, language learner, teacher, and public-facing interpreter',
    skills: ['Fulbright', 'Morocco', 'Arabic', 'French', 'Intercultural work', 'Public-facing scholarship'],
    featured: true,
    sortOrder: 5,
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
            src: '/assets/projects/fulbright-morocco/jebel-shams-oman.jpg',
            alt: 'A black-and-white goat standing on a rocky cliff above the Wadi Ghul canyon at Jebel Shams, Oman — dramatic layered rock strata and mountain ridges recede into a hazy horizon.',
            eyebrow: 'Comparative fieldwork / Oman',
            caption: 'Jebel Shams, Oman — comparative fieldwork and language study in the Arab world alongside the Morocco Fulbright year.'
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
    slug: 'teaching-writing-support',
    title: 'Teaching and Writing Support',
    summary: 'Writing consultation, large-lecture teaching support, and student-centered pedagogy grounded in real learning bottlenecks.',
    categories: ['Teaching & Learning', 'Public Scholarship'],
    pillars: ['Teaching', 'Research'],
    role: 'Graduate writing consultant, teaching assistant, learning diagnostician, and instructional designer',
    skills: ['Writing pedagogy', 'Tutoring', 'AI and learning', 'Student support', 'Instructional design'],
    featured: false,
    sortOrder: 6,
    card: {
      title: 'Teaching & Writing Support',
      summary: 'Writing consultation and teaching support grounded in real learning bottlenecks.',
      accent: 'gold',
      materials: ['Teaching', 'Writing', 'Pedagogy'],
      secondaryAction: {
        label: 'View coaching',
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
      title: 'Teaching and Writing Support',
      description: "Project profile for Reese Hollister's teaching and writing support work."
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
        ],
        artifacts: [
          {
            src: '/assets/projects/teaching-writing-support/teaching-support-board.svg',
            alt: 'Annotated teaching support board showing diagnosis, scaffolding, and revision pathways.',
            eyebrow: 'Visual / artifact',
            caption: 'Editorial diagram showing the consultation logic and scaffolding structure this page is meant to make visible.'
          }
        ]
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'The most important outcome is a repeatable practice of helping people move from uncertainty to agency in classrooms, writing centers, and any setting where explanation has to meet a real person at the point of need.'
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
