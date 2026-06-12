export const siteMeta = {
  title: 'Reese Hollister',
  description:
    'Reese W. Hollister is a historian of North Africa who turns research into things you can see — decks, datasets, maps, and lessons — and coaches students to write with clarity.',
  position:
    'Historian · Educator · Research Builder'
};

// Core thesis — the prominent hero lead and the through-line for the whole site.
export const heroThesis = 'Research you can see.';

// Recurring brand thesis — secondary phrasing, still used on the About page.
export const brandThesis = 'Make difficult ideas clear without making them shallow.';

// External booking page for writing/academic coaching (Square scheduling site).
export const coachingBookingUrl = 'https://reesehollister.square.site';

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/research', label: 'Research' },
  { href: '/african-airlines/', label: 'African Airlines' },
  { href: '/coaching', label: 'Coaching' },
  { href: '/resume', label: 'CV' },
  { href: '/contact', label: 'Contact' }
];

export const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/writing', label: 'Writing' },
  { href: '/teaching', label: 'Teaching' }
];

export const homeIntro =
  'I am a historian, educator, and writing consultant, and a recent Master of International Studies graduate from NC State, based in Bucks County, Pennsylvania. My work connects research with people: students trying to write better papers, institutions trying to tell stronger stories, and audiences trying to understand the past.';

// Homepage "What I do" section — a single paragraph tying the four threads into one through-line.
export const whatIDo = [
  'I help people move from complicated material to clear communication. As a historian I study how infrastructure, empire, tourism, and mobility shaped modern North Africa; as a writing consultant I help students sharpen their arguments without losing their own voice; and as a digital educator I turn that research into videos, maps, and lessons. Research, writing, teaching, and media are one through-line — making hard ideas usable without making them shallow.'
];

// Proof strip shown directly below the hero.
export const proofStrip = [
  {
    label: 'Fulbright Morocco',
    detail: 'Field research, Arabic study, and teaching.'
  },
  {
    label: 'M.I.S. · NC State',
    detail: 'North African studies and international politics.'
  },
  {
    label: 'CRLA Level III',
    detail: 'Writing support from blank page to revision.'
  },
  {
    label: 'Published + Built',
    detail: 'Articles, decks, datasets, maps, and learning tools.'
  },
  {
    label: 'VenturePack Winner',
    detail: "$4,000 venture prize for Huruf Lab (NC State, 2026)."
  }
];

// Three audience/service cards for the homepage.
export const serviceCards = [
  {
    title: 'Writing Coaching',
    summary:
      'I help students understand assignments, build arguments, organize evidence, and revise with purpose. The goal is not to take over the paper — it is to help the student become a clearer, more confident writer.',
    cta: 'Book a consultation',
    href: '/coaching'
  },
  {
    title: 'Research & Public History',
    summary:
      'My historical work focuses on North Africa, colonial and postcolonial infrastructure, tourism, mobility, and state-building. I use archival research, digital mapping, and public-facing storytelling to connect evidence with broader audiences.',
    cta: 'Read my research',
    href: '/research'
  },
  {
    title: 'Video & Educational Media',
    summary:
      'I create educational videos and digital projects that make serious historical questions watchable. My work combines archival thinking, clear explanation, and narrative structure.',
    cta: 'Watch the channel',
    href: 'https://www.youtube.com/@HistoricalMethodMan/featured'
  }
];

// Parent/student-facing, problem-led coaching CTA for the homepage.
export const coachingCta = {
  eyebrow: 'For parents and students',
  title: 'Writing help when the draft needs structure.',
  body:
    'One-on-one support for college essays, research papers, personal statements, and academic revision.',
  cta: 'Book a consultation',
  href: '/coaching'
};

// Closing contact CTA for the homepage.
export const contactCta = {
  eyebrow: 'Get in touch',
  title: 'Have a project, a question, or a paper to work on?',
  body:
    'For research, collaboration, media, or writing support, send the context and what you need it to do.',
  cta: 'Start a conversation',
  href: '/contact'
};

export const homePillars = [
  {
    title: 'Research',
    summary:
      'Historical and political analysis grounded in North Africa, infrastructure, sovereignty, and the longer afterlives of institutional decisions.',
    details: ['Western Sahara capstone', 'Archival synthesis', 'Cross-source interpretation']
  },
  {
    title: 'Teaching',
    summary:
      'Student-centered pedagogy shaped by writing support, large-class teaching, language learning, and close attention to how understanding actually forms.',
    details: ['Writing consultation', 'PS 331 teaching support', 'Learning design']
  },
  {
    title: 'Building',
    summary:
      'Products, learning tools, and public scholarship projects that make hard ideas legible without flattening them.',
    details: ["Huruf La'b", 'Curriculum design', 'Public-facing scholarship']
  }
];

export const proofItems = [
  {
    title: 'Original NCSU Site',
    type: 'Public archive',
    description:
      'The earlier Google Site that documented Morocco fieldwork, teaching materials, and research pages.',
    href: 'https://sites.google.com/ncsu.edu/reese/welcome?pli=1',
    cta: 'Visit archive'
  },
  {
    title: 'Historical Method Man',
    type: 'YouTube / public scholarship',
    description:
      'A digital history channel built to make historical method more accessible to a wider audience.',
    href: 'https://www.youtube.com/@HistoricalMethodMan/featured',
    cta: 'Watch channel'
  },
  {
    title: 'Publications and Research Archive',
    type: 'Writing and scholarship',
    description:
      'Journal articles and research-facing writing across historical method, colonialism, museums, and African politics.',
    href: 'https://ncsu.academia.edu/ReeseHollister',
    cta: 'View publications'
  }
];

export const partnerInstitutions = [
  {
    name: 'Fulbright Program',
    shortName: 'Fulbright',
    role: 'Fulbright Scholar · Morocco',
    period: '2023–2024',
    logo: '/assets/ui/partners/fulbright.svg',
    href: 'https://us.fulbrightonline.org/'
  },
  {
    name: 'NC State University',
    shortName: 'NC State',
    role: 'M.I.S. · GTA · Writing Consultant',
    period: '2022–2026',
    logo: '/assets/ui/partners/ncstate.svg',
    href: 'https://www.ncsu.edu/'
  },
  {
    name: 'Al Akhawayn University in Ifrane',
    shortName: 'AUI',
    role: 'Research & Fieldwork Base',
    period: '2023–2024',
    logo: '/assets/ui/partners/aui.svg',
    href: 'https://www.aui.ma/'
  },
  {
    name: 'American Language Center, Rabat',
    shortName: 'ALC Rabat',
    role: 'History Teacher · BrainLyne',
    period: '2023–2024',
    logo: '/assets/ui/partners/alc.svg',
    href: 'https://www.alc.org.ma/'
  },
  {
    name: 'H-Net: Humanities & Social Sciences',
    shortName: 'H-Net',
    role: 'Conference Presenter · H-Grad',
    period: '2023',
    logo: '/assets/ui/partners/hnet.svg',
    href: 'https://www.h-net.org/'
  }
];

export const aboutTimeline = [
  {
    period: 'Research and writing support',
    summary:
      'History, international studies, tutoring, and writing consultation developed together.'
  },
  {
    period: 'Fulbright Morocco and language study',
    summary:
      'Arabic study, field research, and teaching in Morocco sharpened the North Africa focus.'
  },
  {
    period: 'NC State and public scholarship',
    summary:
      "Graduate work, public history, and Huruf La'b turned the research into decks, datasets, lessons, and tools."
  }
];

export const roleFit = [
  'Research, analyst, or strategy roles that require stitching together archival, policy, and visual evidence.',
  'Teaching, curriculum, or learning-design work where student understanding is part of the deliverable.',
  'Content, product, or public-scholarship roles where serious subject matter has to become intelligible to real audiences.'
];

export const secondaryWork = [
  {
    title: 'Historical Method Man',
    category: 'Public Scholarship',
    summary: 'Educational video work that translates historical method for a broader audience.',
    href: 'https://www.youtube.com/@HistoricalMethodMan/featured',
    cta: 'Watch channel'
  },
  {
    title: 'Selected presentations',
    category: 'Research',
    summary: 'Conference, workshop, and digital-history presentation work spanning Moroccan history, tutoring pedagogy, and postcolonial African airlines.',
    href: 'https://sites.google.com/ncsu.edu/reese/history-research',
    cta: 'View public page'
  },
  {
    title: 'Selected publications',
    category: 'Writing',
    summary: 'Journal articles and essays in venues including History Matters, Gettysburg Historical Journal, and the Armstrong Undergraduate Journal of History.',
    href: 'https://ncsu.academia.edu/ReeseHollister',
    cta: 'Read publications'
  }
];

export const resumeResources = [
  {
    label: 'Resume PDF available by request',
    href: '#',
    available: false,
    note: 'Email for the current resume PDF.'
  },
  {
    label: 'CV PDF available by request',
    href: '#',
    available: false,
    note: 'Email for the current academic CV PDF.'
  },
  {
    label: 'Public Site',
    href: 'https://sites.google.com/ncsu.edu/reese/welcome?pli=1',
    available: true,
    note: 'Current public-facing archive of Morocco, teaching, and research work.'
  },
  {
    label: 'Academia Profile',
    href: 'https://ncsu.academia.edu/ReeseHollister',
    available: true,
    note: 'Publication trail and research-facing profile.'
  }
];

export const contactMethods = [
  {
    label: 'Email',
    value: 'reesewhollister@gmail.com',
    href: 'mailto:reesewhollister@gmail.com',
    available: true,
    note: 'Primary contact for professional conversations.'
  },
  {
    label: 'LinkedIn',
    value: 'Reese H. on LinkedIn',
    href: 'https://www.linkedin.com/in/reese-h-13b09519a/',
    available: true,
    note: 'Professional snapshot and network-facing profile.'
  },
  {
    label: 'Newsletter',
    value: 'Substack',
    href: 'https://reesewhollister.substack.com',
    available: true,
    note: 'Fieldwork dispatches, project updates, and public scholarship writing.'
  },
  {
    label: 'Historical Method Man',
    value: 'YouTube channel',
    href: 'https://www.youtube.com/@HistoricalMethodMan/featured',
    available: true,
    note: 'Public-facing scholarship and educational video work.'
  },
  {
    label: 'Academia',
    value: 'Publication archive',
    href: 'https://ncsu.academia.edu/ReeseHollister',
    available: true,
    note: 'Research profile and publication trail.'
  }
];

export const substackPosts = [
  {
    title: 'Promoting a Project',
    subtitle: 'Postcolonial African Airlines: History from Colonies to Carriers',
    date: '2025-05-28',
    year: '2025',
    href: 'https://reesewhollister.substack.com/p/promoting-a-project',
    category: 'Research',
    note: 'Newsletter introducing the From Colonies to Carriers project — postcolonial African airline history, Royal Air Maroc, and the dataset.'
  },
  {
    title: 'Teaching Modern United States History',
    subtitle: 'Reflections Before Our Big Event',
    date: '2024-02-15',
    year: '2024',
    href: 'https://reesewhollister.substack.com/p/teaching-modern-united-states-history',
    category: 'Teaching',
    note: 'Reflections on teaching US History through the Civil Rights Movement, Watergate, and the radical movements of the 1960s — ahead of a live public history lecture event at the American Language Center.'
  },
  {
    title: 'Online Conference Presentation Tomorrow',
    subtitle: "Occidentalism & Selfhood: Nawal El Saadawi's Travels in Europe",
    date: '2023-12-07',
    year: '2023',
    href: 'https://reesewhollister.substack.com/p/online-conference-presentation-tomorrow',
    category: 'Research',
    note: 'Dispatch ahead of an H-Grad Lightning Talk on Arabic travel literature — Nawal El Saadawi\'s self-construction through European journeys. Includes the full conference essay as a PDF. Written from Morocco during the Fulbright year.'
  },
  {
    title: 'Projects Old and New',
    subtitle: 'Arabic Travel Literature and PhD Applications',
    date: '2023-11-06',
    year: '2023',
    href: 'https://reesewhollister.substack.com/p/projects-old-and-new',
    category: 'Research',
    note: 'Research dispatch introducing a new writing sample project on Arabic-language travel literature — sources from Nawal El Saadawi, Gamal Al-Ghitani, and others. Written from Morocco while applying to PhD programs.'
  },
  {
    title: 'Marrakech & Ben Guerir',
    subtitle: 'Busy but Good',
    date: '2023-12-16',
    year: '2023',
    href: 'https://reesewhollister.substack.com/p/marrakech-and-ben-guerir',
    category: 'Fieldwork',
    note: 'Fieldwork dispatch from Marrakech and the education city of Ben Guerir — both stops during the Fulbright year in Morocco.'
  },
  {
    title: 'Fes & Ifrane Weekend, Part Two',
    subtitle: 'Ifrane and the Mohammed VI Library Archive',
    date: '2023-10-05',
    year: '2023',
    href: 'https://reesewhollister.substack.com/p/fes-and-ifrane-weekend-part-two',
    category: 'Fieldwork',
    note: 'Research dispatch from Ifrane — a French colonial hill station turned American-style university. Describes first contact with the Mohammed VI Library archive: "Postcards, letters, advertisements, vacation photos, maps, and other ephemera are highly abundant."'
  },
  {
    title: 'Fes & Ifrane Weekend',
    subtitle: 'Part One: Fes',
    date: '2023-09-25',
    year: '2023',
    href: 'https://reesewhollister.substack.com/p/fes-and-ifrane-weekend',
    category: 'Fieldwork',
    note: 'First part of a weekend trip from Rabat — the medina of Fes, walking the old city, and a morning walk along the river before heading inland to Ifrane.'
  },
  {
    title: 'Settling In',
    subtitle: 'Morocco Week One',
    date: '2023-09-04',
    year: '2023',
    href: 'https://reesewhollister.substack.com/p/settling-in',
    category: 'Fieldwork',
    note: 'Arrival dispatch from the first week in Morocco — orienting, beginning Arabic study, and starting fieldwork in Rabat.'
  },
  {
    title: 'New Friends',
    subtitle: 'The Sultanate of Oman: Week II',
    date: '2023-07-21',
    year: '2023',
    href: 'https://reesewhollister.substack.com/p/new-friends',
    category: 'Fieldwork',
    note: 'Field observations and Arabic language study from the second week in the Sultanate of Oman — pre-Fulbright Arabic immersion placement.'
  },
  {
    title: 'Transition',
    subtitle: 'Pennsylvania to Oman',
    date: '2023-07-03',
    year: '2023',
    href: 'https://reesewhollister.substack.com/p/transition',
    category: 'Fieldwork',
    note: 'Departure dispatch from Pennsylvania and first impressions from the Oman language-study placement — the start of a year of Arabic study and fieldwork.'
  }
];

export const researchAreas = [
  {
    area: 'North Africa and Morocco',
    description:
      'Colonial and postcolonial history of the Maghreb — infrastructure politics, sovereignty disputes, and the longer dynamics of recognition in Morocco and the Western Sahara.'
  },
  {
    area: 'African institutions and aviation',
    description:
      'How newly independent African states built national carriers, highways, and institutions as instruments of sovereignty and state identity in the decades after decolonization.'
  },
  {
    area: 'French institutional history',
    description:
      'The history of French medical and carceral institutions — with particular attention to La Salpêtrière hospital — as sites of both institutional reform and historical contestation.'
  },
  {
    area: 'Digital history and data archaeology',
    description:
      'Reconstructing historical datasets from fragmented archival sources to support structured analysis of institutional change, with special attention to early postcolonial African civil aviation.'
  }
];

export const publications = [
  {
    title: 'Photography, Identity, Power: William Henry Jackson and the American Colonial Gaze',
    venue: 'History Matters',
    year: '2023',
    href: 'https://sites.google.com/ncsu.edu/reese/history-research',
    note: 'Citation and abstract are available on the public research archive.'
  },
  {
    title: 'Lenses, Focus, Fluidity: Lessons From Medieval Queer History',
    venue: 'Gettysburg Historical Journal',
    year: '2022',
    href: 'https://cupola.gettysburg.edu/ghj/vol21/iss1/6/',
    note: 'Open-access journal page.'
  },
  {
    title: 'The Sharpeville Massacre, Violence, and the Struggles of the African National Congress, 1960-1990',
    venue: 'Armstrong Undergraduate Journal of History',
    year: '2023',
    href: 'https://digitalcommons.georgiasouthern.edu/aujh/vol13/iss1/5/',
    note: 'Open-access journal page.'
  }
];

export const presentations = [
  {
    title: "Occidentalism & Selfhood: Nawal El Saadawi's Travels in Europe",
    venue: 'H-Grad Lightning Talks, H-Net',
    year: '2023',
    href: 'https://reesewhollister.substack.com/p/online-conference-presentation-tomorrow',
    internal: false,
    note: "Lightning talk on Arabic travel literature and occidentalism — Nawal El Saadawi's self-construction through her journeys to Europe. Part of the inaugural H-Net Graduate Student Lightning Talks series, presented from Morocco during the Fulbright year."
  },
  {
    title: "How Highways Decided Morocco's Victory in the Western Sahara Conflict",
    venue: 'NC State Graduate History Conference',
    year: '2026',
    href: '/projects/western-sahara-capstone',
    internal: true,
    note: 'Capstone presentation tracing how transport-infrastructure build-out helped normalize Moroccan sovereignty claims over the Western Sahara.'
  }
];

export const teachingRoles = [
  {
    title: 'Graduate Writing Consultant',
    org: 'NC State Academic Success Center',
    period: 'Graduate role',
    summary:
      'Level III CRLA-certified writing consultant providing one-on-one support across disciplines — research papers, graduate applications, argument structure, and academic writing at all levels.',
    skills: ['Writing consultation', 'CRLA Level III', 'Cross-disciplinary support']
  },
  {
    title: 'Graduate Teaching Assistant — PS 331: U.S. Foreign Policy',
    org: 'NC State University',
    period: 'Multiple semesters',
    summary:
      'Teaching assistant for an 80-student lecture course across multiple semesters, supporting instruction, grading, and student advising in international politics and U.S. foreign policy.',
    skills: ['Political science instruction', 'Large-course TA', 'International relations']
  },
  {
    title: 'History Teacher and BrainLyne Convenor',
    org: 'American Language Center, Rabat',
    period: '2023–2024',
    summary:
      'Taught history and facilitated the BrainLyne student research and university-access writing program during the Fulbright year in Morocco. Developed cross-cultural pedagogy in an Arabic-language environment.',
    skills: ['History instruction', 'University prep writing', 'Arabic-language context', 'Cross-cultural pedagogy']
  }
];

export const coachingServices = [
  {
    title: 'College Essay Coaching',
    description:
      'One-on-one support for the Common App personal statement and supplemental essays. We work on finding the real story, cutting what does not land, and writing in your actual voice.'
  },
  {
    title: 'Research Paper Support',
    description:
      'Argument development, source integration, structure, and revision. Suitable for high school and undergraduate research assignments across any discipline.'
  },
  {
    title: 'Personal Statement and Graduate Application Writing',
    description:
      'Statement of purpose, personal statement, and writing sample support for graduate school and competitive program applications. Deep focus on clarity, precision, and positioning.'
  },
  {
    title: 'Academic Writing and Revision',
    description:
      'Session-based writing consultation for essays, papers, and academic assignments. We diagnose the problem, work through the draft, and build toward independent revision habits.'
  }
];
