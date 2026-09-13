export const siteMeta = {
  title: 'Reese Hollister | Program, Research & Education Portfolio',
  description: 'Portfolio of Reese Hollister, a Fulbright researcher and educator with experience in program support, writing consultation, public history, digital research, and cross-cultural communication.',
  position: 'Program support · Research · Education · Public engagement'
};

export const heroThesis = 'Complex work, made clear and useful.';
export const brandThesis = 'Make difficult ideas clear without making them shallow.';
/** Coaching is now one topic in the single site-wide inquiry form. */
export const coachingInquiryUrl = '/contact?topic=essay';
export const resumeRequestUrl = 'mailto:reesewhollister@gmail.com?subject=Current%20resume%20request';

export const navLinks = [
  { href: '/research', label: 'Research' },
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
  { href: '/experience', label: 'Experience' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'CV / Resume' },
  { href: '/contact', label: 'Contact' }
];

export const footerLinks = [
  { href: '/resume', label: 'Resume' },
  { href: '/writing', label: 'Writing & publications' },
  { href: '/teaching', label: 'Teaching' },
  { href: '/works', label: 'Papers & presentations' },
  { href: '/youtube', label: 'Videos & context' },
  { href: '/african-airlines/', label: 'African Airlines' },
  { href: '/coaching', label: 'Writing coaching' }
];

export const homeIntro = 'I’m a Fulbright researcher and educator with experience supporting university courses, advising writers, developing educational programs, conducting international research, and producing public-facing projects. My work brings people, information, and deliverables together—from classrooms and public presentations to datasets, maps, and digital media.';

export const proofStrip = [
  { label: 'Fulbright Morocco', detail: 'International research and teaching · 2023–24' },
  { label: 'M.I.S. · NC State', detail: 'Master of International Studies · 2026' },
  { label: 'CRLA Level III', detail: 'Certified writing consultation' },
  { label: 'VenturePack award', detail: '$4,000 for Huruf La’b · 2026' }
];

export const capabilities = [
  { title: 'Program and Student Support', summary: 'Course support and grading in PS 331, individual writing consultations, and university-access writing with BrainLyne students in Rabat.', href: '/projects/teaching-writing-support', cta: 'See student support work' },
  { title: 'Research and Communication', summary: 'Reconstructing airline records, checking incomplete sources, and turning findings into a searchable encyclopedia, maps, papers, and presentations.', href: '/projects/from-colonies-to-carriers', cta: 'Explore the research process' },
  { title: 'Education and Public Engagement', summary: 'History teaching in Morocco, public presentations, and educational videos that make specialized material understandable to new audiences.', href: '/projects/public-history-engagement', cta: 'See public-facing work' },
  { title: 'Project Development and Ownership', summary: 'Taking Huruf La’b from a classroom learning problem to a tactile prototype, educator outreach, product demonstrations, and a venture competition pitch.', href: '/projects/huruf-lab', cta: 'Follow the product development' }
];

export const coachingCta = {
  eyebrow: 'For students and families · Paid coaching',
  title: 'College essays, in your own voice.',
  body: 'One-on-one writing support for college essays, research papers, and personal statements. Start a conversation and choose the coaching topic.',
  cta: 'Start a conversation', href: coachingInquiryUrl
};
export const contactCta = {
  eyebrow: 'For employers and collaborators',
  title: 'People, programs, and useful work.',
  body: 'Get in touch about program support, education, research, communication, or a project that needs careful organization and follow-through.',
  cta: 'Start a conversation', href: '/contact'
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
    href: 'https://www.youtube.com/channel/UCCRhHuIxYd3wyzYuaCNH3AA/',
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

/**
 * Set as typographic wordmarks in the site's own type, not institutional logo files.
 * `wordmark` is the display name; `wordmarkSub` the qualifying line beneath it.
 */
export const partnerInstitutions = [
  {
    name: 'Fulbright Program',
    shortName: 'Fulbright',
    wordmark: 'Fulbright',
    wordmarkSub: 'U.S. Exchange Program',
    role: 'Fulbright Scholar · Morocco',
    period: '2023–2024',
    href: 'https://us.fulbrightonline.org/'
  },
  {
    name: 'NC State University',
    shortName: 'NC State',
    wordmark: 'NC State',
    wordmarkSub: 'University',
    role: 'M.I.S. · GTA · Writing Consultant',
    period: '2024–2026',
    href: 'https://www.ncsu.edu/'
  },
  {
    name: 'Al Akhawayn University in Ifrane',
    shortName: 'AUI',
    wordmark: 'Al Akhawayn',
    wordmarkSub: 'University in Ifrane, Morocco',
    role: 'Research & Fieldwork Base',
    period: '2023–2024',
    href: 'https://www.aui.ma/'
  },
  {
    name: 'American Language Center, Rabat',
    shortName: 'ALC Rabat',
    wordmark: 'American Language Center',
    wordmarkSub: 'Rabat, Morocco',
    role: 'History Teacher · BrainLyne',
    period: '2023–2024',
    href: 'https://alcrabat.org/'
  },
  {
    name: 'H-Net: Humanities & Social Sciences',
    shortName: 'H-Net',
    wordmark: 'H-Net',
    wordmarkSub: 'Humanities & Social Sciences',
    role: 'Conference Presenter · H-Grad',
    period: '2023',
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

/**
 * Authored oldest-first. The homepage chronology reverses it so the most recent
 * chapter reads first; keep this order for any prose use.
 */
export const aboutTimelineFull = [
  {
    id: 'manhattan',
    place: 'bronx',
    short: 'Manhattan College',
    year: '2019',
    period: 'Manhattan College',
    date: '2019–2023',
    summary:
      'B.A. in History and Political Science. Published in peer-reviewed history journals; won institutional research awards; developed the core interest in postcolonial Africa and French institutional history that drives the current work.',
    href: '/writing',
    cta: 'Publications'
  },
  {
    id: 'oman',
    place: 'manah',
    short: 'Oman',
    year: '2023',
    period: 'Arabic study — Oman',
    date: 'Summer 2023',
    summary: 'Immersive Arabic study in Manah, with language learning carried into everyday encounters and field trips across Oman.',
    href: '/projects/oman-arabic',
    cta: 'Arabic study in Oman'
  },
  {
    id: 'fulbright',
    place: 'morocco',
    short: 'Fulbright',
    year: '2023',
    period: 'Fulbright Scholar — Morocco',
    date: '2023–2024',
    summary:
      "Field-based research in Ifrane, Rabat, Fez, and across Morocco. Archival work at Mohammed VI Library, AUI. Arabic and Darija study; teaching history at the American Language Center, Rabat. The year grounded the North Africa focus and produced the fieldwork that runs through everything since.",
    href: '/projects/fulbright-morocco',
    cta: 'The Fulbright year'
  },
  {
    id: 'ncstate',
    place: 'raleigh',
    short: 'NC State',
    year: '2024',
    period: 'NC State — M.I.S.',
    date: '2024–2026',
    summary:
      "Master of International Studies with a focus on North Africa, postcolonial institutions, and digital history. Graduate Teaching Assistant in Political Science; writing consultant at the Academic Success Center; Huruf La'b co-founder and VenturePack winner ($4,000, April 2026).",
    href: '/projects/teaching-writing-support',
    cta: 'Teaching & writing support'
  },
  {
    id: 'huruf',
    place: 'raleigh',
    short: "Huruf La'b",
    year: '2025',
    period: "Huruf La'b",
    date: '2025–present',
    summary:
      "Co-founder of a tactile Arabic learning startup. Designed and tested a puzzle-based system for early Arabic script literacy; conducted educator outreach and gathered early interest; pitched successfully in NC State's campus-wide venture competition.",
    href: '/projects/huruf-lab',
    cta: "Inside Huruf La'b"
  },
  {
    id: 'now',
    place: 'raleigh',
    short: 'Now',
    year: '2026',
    period: 'Current — Research, Teaching, Writing',
    date: '2026',
    summary:
      'Working on postcolonial African airline history, Western Sahara infrastructure research, and writing coaching. Writing publicly on Substack and through the Historical Method Man channel.',
    href: '/research',
    cta: 'Current research'
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
    href: 'https://www.youtube.com/channel/UCCRhHuIxYd3wyzYuaCNH3AA/',
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
    href: 'https://www.youtube.com/channel/UCCRhHuIxYd3wyzYuaCNH3AA/',
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

// Publications moved to src/data/papers.ts — one source for the map and /writing.

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

// Functional experience, grounded in the existing teaching roles and project record.
// Exact university employment dates remain in TODO_CONTENT.md pending confirmation.
export const experienceGroups = [
  {
    title: 'University course and student support',
    org: 'NC State University · PS 331: U.S. Foreign Policy',
    context: 'Graduate Teaching Assistant · Multiple semesters',
    summary: 'Supported instruction, grading, and student advising in an 80-student lecture course.',
    bullets: ['Helped students work through course material and expectations.', 'Supported assessment and instruction across repeated course offerings.'],
    href: '/projects/teaching-writing-support', cta: 'University support case study'
  },
  {
    title: 'Individual writing consultation',
    org: 'NC State Academic Success Center',
    context: 'Graduate Writing Consultant · CRLA Level III',
    summary: 'Worked one-on-one with writers across disciplines on research papers, graduate applications, and academic assignments.',
    bullets: ['Helped writers interpret prompts, organize evidence, and develop arguments.', 'Adapted feedback to the assignment and writer, with independent revision as the goal.'],
    href: '/teaching', cta: 'Teaching and consultation'
  },
  {
    title: 'Teaching and educational programs',
    org: 'American Language Center, Rabat',
    context: 'History Teacher and BrainLyne Convenor · 2023–24',
    summary: 'Taught history and facilitated student research and university-access writing during my Fulbright year in Morocco.',
    bullets: ['Connected classroom history with a public lecture event and student research.', 'Supported students preparing writing for university access in a cross-cultural setting.'],
    href: '/projects/public-history-engagement', cta: 'Public engagement case study'
  },
  {
    title: 'International research and communication',
    org: 'Fulbright Morocco · Al Akhawayn University research base',
    context: 'Fulbright researcher · 2023–24',
    summary: 'Combined archival research, Arabic and Darija study, and teaching across Moroccan institutional settings.',
    bullets: ['Worked with historical material at the Mohammed VI Library in Ifrane.', 'Communicated fieldwork through written dispatches, photography, and presentations.'],
    href: '/projects/fulbright-morocco', cta: 'Fulbright fieldwork'
  },
  {
    title: 'Educational product development',
    org: 'Huruf La’b',
    context: 'Co-founder · Instructional design and educator outreach',
    summary: 'Developed a tactile approach to Arabic script learning with co-founder and designer Bella Templeton.',
    bullets: ['Connected a classroom learning problem to prototype development, demonstrations, and educator conversations.', 'Presented the product in NC State’s VenturePack Challenge; the team received a $4,000 award in 2026.'],
    href: '/projects/huruf-lab', cta: 'Educational product case study'
  },
  {
    title: 'Research projects and public scholarship',
    org: 'From Colonies to Carriers · Historical Method Man · Published writing',
    context: 'Independent research and public-facing projects',
    summary: 'Organize complex historical evidence into formats readers and viewers can explore and use.',
    bullets: ['Built an encyclopedia with 723 airline records and supporting maps; published a separate 59-row, 16-field CSV extract.', 'Produced research papers, presentation decks, newsletter essays, and educational videos.'],
    href: '/projects/from-colonies-to-carriers', cta: 'Research project case study'
  }
];
