export interface ProjectLink {
  label: string;
  href: string;
  kind?: 'link' | 'download';
  note?: string;
  available?: boolean;
}

export interface ProjectArtifact {
  src: string;
  alt: string;
  eyebrow?: string;
  caption?: string;
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
    heroAsset: {
      src: '/assets/projects/huruf-lab/huruf-logo.jpg',
      alt: "Huruf La'b brand mark: the Arabic word laʿb (play) rendered in gold tiles on Moroccan blue.",
      caption: "The Huruf La'b identity — laʿb (“play”) built from the brand's tactile tile system."
    },
    links: [
      {
        label: 'Prototype images',
        href: '#',
        available: false,
        note: 'Internal resource.'
      },
      {
        label: 'Pilot testing notes',
        href: '#',
        available: false,
        note: 'Internal resource.'
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
        heading: 'Role',
        paragraphs: [
          'Reese helped frame the concept, translate pedagogical friction into design requirements, and treat early prototyping as a research problem rather than a branding exercise.'
        ]
      },
      {
        heading: 'What I did',
        paragraphs: [
          'The first design move was diagnostic: identify which parts of early Arabic instruction remain stubbornly opaque. That meant focusing not only on the alphabet, but on the transition from isolated recognition to compositional understanding.',
          'Customer discovery sharpened the design. Teacher outreach produced an early email list of more than 100 interested people, including at least two dozen Arabic teachers across the United States, the United Kingdom, and the Arab world.'
        ],
        artifacts: [
          {
            src: '/assets/projects/huruf-lab/huruf-lab-board.svg',
            alt: "Concept board showing tactile modules, script logic, and morphology prompts for Huruf La'b.",
            eyebrow: 'Visual / artifact',
            caption: 'Editorial concept board marking the prototype logic, morphology pieces, and learner workflow this project is designed to document.'
          }
        ]
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'At this stage, the main outcome is a more credible instructional system concept: one that treats Arabic learning as a design problem with specific points of friction rather than as a generic ed-tech opportunity.',
          "The project demonstrates a habit of mind that carries across Reese's work: when understanding stalls, redesign the conditions of understanding."
        ]
      },
      {
        heading: 'Skills',
        bullets: [
          'Translating learning friction into product requirements',
          'Designing around embodiment and legibility',
          'Framing teacher interviews and user research in pedagogical terms',
          'Holding instructional rigor and public-facing accessibility together'
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
    heroAsset: {
      src: '/assets/projects/western-sahara/ws-mural-hero.jpg',
      alt: 'A mural in Sidi Ifni depicting the 1975 Green March — a procession of trucks and marchers beneath the Arabic oath of the march.',
      caption: 'A street mural in Sidi Ifni memorializing the Green March of 1975 — the founding event of Morocco\'s claim to the Western Sahara.'
    },
    links: [
      {
        label: 'Roads-over-time one-pager',
        href: '/assets/projects/western-sahara/2026-03-31__reese-portfolio__artifact__v01__roads-timeseries-one-pager.pdf',
        kind: 'download',
        available: true,
        note: 'OSM and ohsome workflow summary for Western Sahara road stock.'
      },
      {
        label: 'Dual timeline graphic',
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
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Most accounts of Western Sahara keep diplomatic recognition and physical infrastructure in separate stories. This project asked how those stories should be read together.',
          "The capstone's central question was how physical integration, especially transport infrastructure, helped create the conditions under which Morocco's sovereignty claims became easier to normalize."
        ]
      },
      {
        heading: 'What I did',
        paragraphs: [
          'Reese assembled and organized locally available primary and secondary materials into a usable source base, including diplomatic documents, infrastructure reports, archival maps, and legal or institutional facsimiles.',
          'He also built a reproducible roads-over-time workflow using OSM relation R2559126 and the ohsome history API for year-end snapshots from 2008 through 2025.'
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
          {
            src: '/assets/projects/western-sahara/2026-03-31__reese-portfolio__artifact__v01__atlantic-highway-route-map.jpg',
            alt: 'Map image showing the Atlantic highway corridor to Mauritania.',
            eyebrow: 'Visual / artifact',
            caption: 'A corridor visual used to make the north-south integration argument legible at a glance.'
          },
          {
            src: '/assets/projects/western-sahara/2026-03-31__reese-portfolio__artifact__v01__contract-programmes-diagram.png',
            alt: 'Institutional diagram showing contract-programmes in Morocco.',
            eyebrow: 'Visual / artifact',
            caption: 'An institutional diagram that helped connect physical infrastructure to longer state-planning logics.'
          },
          {
            src: '/assets/projects/western-sahara/2026-03-31__reese-portfolio__artifact__v01__dakhla-atlantic-port-photo.jpg',
            alt: "Photo associated with the Dakhla Atlantic Port development in Morocco's south-facing strategy.",
            eyebrow: 'Visual / artifact',
            caption: 'A contemporary infrastructure image that helped connect the historical corridor argument to present-day development strategy.'
          }
        ]
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'The capstone produced more than a claim. It yielded a reusable evidence set, visual narrative, roads-over-time workflow, and a clearer mechanism for explaining why sovereignty politics cannot be separated from circulation.'
        ]
      },
      {
        heading: 'Skills',
        bullets: [
          'Process tracing across diplomatic and infrastructural timelines',
          'Source synthesis across archival, statistical, and visual materials',
          'Designing explanatory figures that carry analytical weight',
          'Turning a research question into a public-facing case study'
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
    heroAsset: {
      src: '/assets/ui/atlas-grid.svg',
      alt: 'Grid map visualization representing airline route networks across postcolonial Africa.',
      caption: 'Map-grid visual representing airline route networks across postcolonial Africa.'
    },
    links: [
      {
        label: 'Working paper',
        href: '#',
        available: false,
        note: 'Internal resource.'
      },
      {
        label: 'Dataset',
        href: '#',
        available: false,
        note: 'Internal resource.'
      },
      {
        label: 'Academia profile',
        href: 'https://ncsu.academia.edu/ReeseHollister',
        available: true,
        note: 'Research profile and publication trail.'
      }
    ],
    seo: {
      title: 'From Colonies to Carriers',
      description: 'Digital history project on postcolonial African airline development by Reese Hollister.'
    },
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'When African states achieved independence in the late 1950s and 1960s, establishing a national airline was rarely a matter of economic logic alone. An airline was a flag, a symbol of sovereignty, and a daily assertion that the new state existed and belonged in the world.',
          'This project traces how those decisions were made, who made them, what they cost, and what they reveal about postcolonial state-building more broadly.'
        ]
      },
      {
        heading: 'Case Study: Royal Air Maroc',
        paragraphs: [
          "The project centers on Royal Air Maroc as a case study in postcolonial institution-building. Morocco nationalized its carrier in 1957, just one year after independence from France.",
          "RAM's trajectory mirrors patterns visible across the continent while also reflecting Morocco's particular political economy, its relationship with France, and the pressures of building a national institution from colonial infrastructure."
        ]
      },
      {
        heading: 'Data Archaeology',
        paragraphs: [
          'Civil aviation records from this period are scattered across national archives, ICAO documents, colonial administrative files, aviation trade press, and timetable ephemera.',
          'The project involves systematic reconstruction: identifying sources, cross-referencing discontinuous records, and building a structured dataset from fragmentary evidence.'
        ]
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'African airlines were built at a moment when the infrastructure of sovereignty was being assembled from scratch. Understanding those decisions still matters for current discussions about African aviation policy, continental integration, and postcolonial economic development.'
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
    sortOrder: 4,
    heroAsset: {
      src: '/assets/ui/2026-03-31__reese-portfolio__asset__v02__google-site-welcome-photo.jpg',
      alt: "Reese in Morocco in a public photo previously used on his original site.",
      caption: "Public photo previously used on Reese's original NCSU site."
    },
    links: [
      {
        label: 'Original Morocco fieldwork page',
        href: 'https://sites.google.com/ncsu.edu/reese/welcome?pli=1',
        available: true,
        note: 'Earlier public-facing record of the Fulbright year, language study, and Morocco-based research.'
      },
      {
        label: 'Teaching Arabic portfolio',
        href: 'https://sites.google.com/ncsu.edu/reese/teaching-arabic',
        available: true,
        note: "Public teaching page tied to Reese's Arabic pedagogy and Morocco experience."
      }
    ],
    seo: {
      title: 'Fulbright Morocco / International Research & Teaching',
      description: "Project profile for Reese Hollister's Morocco-based research, teaching, and language-learning work."
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
        heading: 'What I did',
        paragraphs: [
          'Under a Fulbright U.S. Student Program grant, Reese moved among Arabic study, historical research, classroom teaching, and outward-facing academic communication.',
          'He studied Modern Standard Arabic and Moroccan Darija intensively in Rabat while also working across French and Moroccan institutional settings.'
        ],
        artifacts: [
          {
            src: '/assets/projects/fulbright-morocco/fulbright-morocco-board.svg',
            alt: 'Editorial board for Fulbright Morocco fieldwork, teaching, and language study.',
            eyebrow: 'Visual / artifact',
            caption: 'Editorial stand-in marking the mix of fieldwork, language study, teaching, and public explanation carried through the Morocco year.'
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
    sortOrder: 5,
    heroAsset: {
      src: '/assets/projects/teaching-writing-support/teaching-support-poster.svg',
      alt: 'Editorial teaching support poster with notes, margins, and revision marks.',
      caption: 'Editorial artwork used until consultation materials, workshop slides, or assignment artifacts are ready for publication.'
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
        heading: 'What I did',
        paragraphs: [
          'Reese helped students revise, interpret prompts, structure arguments, and recover momentum when learning got stuck.',
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
