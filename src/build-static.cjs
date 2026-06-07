const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const root = process.cwd();
const distDir = path.join(root, 'dist');
const publicDir = path.join(root, 'public');
const siteUrl = process.env.SITE_URL || 'https://reesehollister.com';
const basePath = normalizeBase(process.env.SITE_BASE_PATH || '/');
const args = new Set(process.argv.slice(2));
const debugBuild = process.env.DEBUG_STATIC_BUILD === '1';

function debug(message) {
  if (debugBuild) console.log(`[static-build] ${message}`);
}

function normalizeBase(value) {
  if (!value || value === '/') return '/';
  return `/${String(value).replace(/^\/+|\/+$/g, '')}/`;
}

function loadTsModule(relativePath) {
  const filePath = path.join(root, relativePath);
  const source = fs.readFileSync(filePath, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020
    },
    fileName: filePath
  }).outputText;

  const module = { exports: {} };
  const context = {
    exports: module.exports,
    module,
    require,
    __dirname: path.dirname(filePath),
    __filename: filePath,
    console
  };
  vm.runInNewContext(compiled, context, { filename: filePath });
  return module.exports;
}

const siteData = loadTsModule('src/data/site.ts');
const projectData = loadTsModule('src/data/projects.ts');
const {
  aboutTimeline,
  coachingServices,
  contactMethods,
  homeIntro,
  homePillars,
  navLinks,
  proofItems,
  publications,
  researchAreas,
  resumeResources,
  roleFit,
  secondaryWork,
  siteMeta,
  teachingRoles
} = siteData;
const { featuredProjects, sortedProjects } = projectData;

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isExternal(value) {
  return /^(https?:|mailto:)/.test(value);
}

function withBase(value) {
  if (!value || value === '#' || isExternal(value)) return value;
  const clean = String(value).replace(/^\/+/, '');
  return `${basePath}${clean}`;
}

function routeHref(value) {
  if (!value || value === '#' || isExternal(value) || value.startsWith('/assets/')) return withBase(value);
  const clean = String(value).replace(/^\/+|\/+$/g, '');
  return clean ? `${basePath}${clean}/` : basePath;
}

function assetHref(value) {
  return withBase(value);
}

function linkAttrs(href) {
  const target = isExternal(href) && !href.startsWith('mailto:') ? ' target="_blank" rel="noreferrer"' : '';
  return `href="${escapeHtml(href)}"${target}`;
}

function canonicalFor(route) {
  const cleanRoute = route === '/' ? '/' : `${route.replace(/^\/+|\/+$/g, '')}/`;
  return new URL(cleanRoute, siteUrl).toString();
}

function pageTitle(title) {
  return title === siteMeta.title ? title : `${title} | ${siteMeta.title}`;
}

function layout({ route, title = siteMeta.title, description = siteMeta.description, image = '/assets/ui/2026-03-31__reese-portfolio__asset__v02__google-site-welcome-photo.jpg', body }) {
  const fullTitle = pageTitle(title);
  const canonical = canonicalFor(route);
  const ogImage = new URL(assetHref(image), siteUrl).toString();
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(fullTitle)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="canonical" href="${escapeHtml(canonical)}">
    <link rel="icon" type="image/svg+xml" href="${assetHref('/assets/ui/favicon.svg')}">
    <link rel="stylesheet" href="${assetHref('/assets/site.css')}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${escapeHtml(fullTitle)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${escapeHtml(canonical)}">
    <meta property="og:image" content="${escapeHtml(ogImage)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(fullTitle)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${escapeHtml(ogImage)}">
  </head>
  <body>
    <a class="skip-link" href="#content">Skip to content</a>
    ${header(route)}
    <main id="content">
      ${body}
    </main>
    ${footer()}
  </body>
</html>`;
}

function header(route) {
  return `<header class="site-header">
  <div class="site-shell header-inner">
    <a class="brand-mark" href="${routeHref('/')}">
      <span class="brand-mark__name">Reese Hollister</span>
      <span class="brand-mark__tag">Research, Teaching, Building</span>
    </a>
    <nav aria-label="Primary">
      <ul class="site-nav">
        ${navLinks.map((link) => {
          const active = route === link.href || (link.href !== '/' && route.startsWith(link.href));
          return `<li><a class="site-nav__link${active ? ' is-active' : ''}" href="${routeHref(link.href)}">${escapeHtml(link.label)}</a></li>`;
        }).join('')}
      </ul>
    </nav>
  </div>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="site-shell footer-grid">
    <p class="section-kicker">Contact</p>
    <ul class="footer-contact-list">
      ${contactMethods.filter((item) => item.available).map((item) => `
        <li>
          <span class="footer-contact-label">${escapeHtml(item.label)}</span>
          <a ${linkAttrs(withBase(item.href))}>${escapeHtml(item.value)}</a>
        </li>`).join('')}
    </ul>
    <p class="footer-note">${escapeHtml(siteMeta.position)}</p>
  </div>
</footer>`;
}

function sectionHeading(eyebrow, title, intro = '') {
  return `<div class="section-heading">
    <p class="section-kicker">${escapeHtml(eyebrow)}</p>
    <h2>${escapeHtml(title)}</h2>
    ${intro ? `<p class="section-intro">${escapeHtml(intro)}</p>` : ''}
  </div>`;
}

function projectCard(project) {
  return `<article class="project-card" data-categories="${escapeHtml(project.categories.join('|'))}">
    <a class="project-card__media" href="${routeHref(`/projects/${project.slug}`)}">
      <img src="${assetHref(project.heroAsset.src)}" alt="${escapeHtml(project.heroAsset.alt)}" loading="lazy">
    </a>
    <div class="project-card__body">
      <h3><a href="${routeHref(`/projects/${project.slug}`)}">${escapeHtml(project.title)}</a></h3>
      <p class="project-card__meta">${escapeHtml(project.categories.join(' / '))}</p>
      <p>${escapeHtml(project.summary)}</p>
      <p class="project-card__role">Role: ${escapeHtml(project.role)}</p>
    </div>
  </article>`;
}

function actionList(items, className = 'action-list action-list--stacked') {
  const visibleItems = items.filter((item) => item && item.href && item.href !== '#' && item.available !== false);
  if (!visibleItems.length) return '';
  return `<ul class="${className}">
    ${visibleItems.map((item) => `<li>
      <a class="resource-link" ${linkAttrs(item.href.startsWith('/') ? routeHref(item.href) : withBase(item.href))}>${escapeHtml(item.label || item.cta || item.title)}</a>
      ${item.note || item.description ? `<span class="action-note">${escapeHtml(item.note || item.description)}</span>` : ''}
    </li>`).join('')}
  </ul>`;
}

function publicationList() {
  return `<ul class="action-list action-list--stacked">
    ${publications.map((pub) => `<li>
      <a class="resource-link" ${linkAttrs(pub.href)}>${escapeHtml(pub.venue)}${pub.year ? ` — ${escapeHtml(pub.year)}` : ''}</a>
      <span class="action-note">${escapeHtml(pub.title)}</span>
    </li>`).join('')}
  </ul>`;
}

function proofGrid(items) {
  return `<div class="proof-grid">
    ${items.map((item) => `<article class="proof-card">
      <p class="section-kicker">${escapeHtml(item.type || item.category)}</p>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description || item.summary)}</p>
      <div class="action-list">
        <a class="resource-link" ${linkAttrs(isExternal(item.href) ? item.href : routeHref(item.href))}>${escapeHtml(item.cta)}</a>
      </div>
    </article>`).join('')}
  </div>`;
}

function artifactFigure(artifact) {
  return `<figure class="artifact-figure">
    ${artifact.eyebrow ? `<span class="artifact-figure__eyebrow">${escapeHtml(artifact.eyebrow)}</span>` : ''}
    <img src="${assetHref(artifact.src)}" alt="${escapeHtml(artifact.alt)}" loading="lazy">
    ${artifact.caption ? `<figcaption>${escapeHtml(artifact.caption)}</figcaption>` : ''}
  </figure>`;
}

function homePage() {
  return layout({
    route: '/',
    body: `<section class="cinematic-hero">
      <div class="cinematic-hero__media">
        <img src="${assetHref('/assets/ui/chefchaouen-01.jpg')}" alt="Chefchaouen, the blue-washed city of northern Morocco, where Reese conducted Fulbright fieldwork." fetchpriority="high">
      </div>
      <div class="cinematic-hero__inner site-shell">
        <p class="cinematic-hero__kicker">Reese W. Hollister</p>
        <h1 class="cinematic-hero__title">Historian of North Africa</h1>
        <p class="cinematic-hero__tagline">${escapeHtml(siteMeta.position)}</p>
        <p class="cinematic-hero__lead">I study how states, infrastructures, languages, and archives shape life after empire — from Moroccan mountain towns to African airlines.</p>
        <ul class="cinematic-hero__actions">
          <li><a href="${routeHref('/research')}">View Research</a></li>
          <li><a href="${routeHref('/writing')}">Read Writing</a></li>
          <li><a href="${routeHref('/coaching')}">Work With Me</a></li>
          <li><a href="${routeHref('/resume')}">Download CV</a></li>
        </ul>
      </div>
      <span class="cinematic-hero__credit">Chefchaouen, Morocco</span>
    </section>
    <section class="home-hero site-shell">
      <div class="home-hero__layout">
        <div class="home-hero__copy">
          <p class="section-kicker">Welcome</p>
          <p class="home-hero__intro">Marhaba! Bienvenue! Welcome!</p>
          <p class="home-hero__intro">${escapeHtml(homeIntro)}</p>
          <p class="home-hero__intro">I lived in Morocco on a Fulbright research grant from August 2023 through June 2024, conducting field research, teaching history, and studying Arabic — work that now shapes everything I do.</p>
        </div>
        <div class="home-hero__media">
          <figure class="home-intro-figure home-intro-figure--primary">
            <img src="${assetHref('/assets/ui/chefchaouen-02.jpg')}" alt="Rooftops and blue-washed walls of Chefchaouen below the Rif mountains.">
            <figcaption>Chefchaouen, northern Morocco — Fulbright fieldwork, 2023–24.</figcaption>
          </figure>
          <div class="home-hero__media-stack">
            <figure class="home-intro-figure home-intro-figure--publication">
              <img src="${assetHref('/assets/ui/chefchaouen-03.jpg')}" alt="Panoramic view across the medina of Chefchaouen toward the surrounding hills.">
              <figcaption>The medina and the Rif.</figcaption>
            </figure>
            <figure class="home-intro-figure home-intro-figure--publication">
              <img src="${assetHref('/assets/ui/2026-03-31__reese-portfolio__asset__v01__history-matters-publication-thumb.jpg')}" alt="History Matters publication cover from Reese Hollister's public materials.">
              <figcaption>History Matters, 2023.</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
    <section class="site-shell">
      ${sectionHeading('What I Do', 'Research, teaching, and building', 'These are the main threads that run through the site.')}
      <div class="pillars-grid">
        ${homePillars.map((pillar) => `<article class="pillar-card"><h3>${escapeHtml(pillar.title)}</h3><p>${escapeHtml(pillar.summary)}</p><ul>${pillar.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join('')}</ul></article>`).join('')}
      </div>
    </section>
    <section class="site-shell">
      ${sectionHeading('Selected Work', 'Projects and longer pieces of work', 'A few of the larger projects that bring these interests together.')}
      <div class="project-grid">${featuredProjects.map(projectCard).join('')}</div>
    </section>
    <section class="site-shell">
      ${sectionHeading('Elsewhere', 'Public work and older pages', 'Some of this work also lives on older public pages and platforms.')}
      ${proofGrid(proofItems)}
    </section>`
  });
}

function aboutPage() {
  return layout({
    route: '/about',
    title: 'About',
    description: 'About Reese Hollister: a scholar-builder working across historical research, international studies, pedagogy, and learning design.',
    body: `<section class="page-hero site-shell">
      <div class="about-hero__layout">
        <div class="about-hero__copy">
          <p class="section-kicker">About</p>
          <h1>About Reese Hollister</h1>
          <p class="page-lead">I work across historical research, international studies, teaching, writing support, language learning, and public-facing projects.</p>
          <p>What ties these areas together is a steady interest in explanation: how people understand difficult material, how a research question becomes legible, and how public-facing work can stay serious without becoming inaccessible.</p>
        </div>
        <div class="about-hero__media">
          <figure class="about-inline-figure"><img class="about-portrait" src="${assetHref('/assets/ui/2026-03-31__reese-portfolio__asset__v01__reese-public-profile.jpg')}" alt="Public profile portrait of Reese Hollister."><figcaption class="about-portrait__caption">Profile image previously used on Reese's public-facing profiles.</figcaption></figure>
          <figure class="about-inline-figure about-inline-figure--secondary"><img class="about-publication" src="${assetHref('/assets/ui/2026-03-31__reese-portfolio__asset__v01__history-matters-publication-thumb.jpg')}" alt="History Matters publication cover from Reese Hollister's public materials."><figcaption class="about-portrait__caption">A publication cover from Reese's public-facing work.</figcaption></figure>
        </div>
      </div>
    </section>
    <section class="site-shell">
      ${sectionHeading('Path', 'Path', 'The path makes more sense through the work than through labels.')}
      <ol class="timeline-list">${aboutTimeline.map((item) => `<li><span class="timeline-label">${escapeHtml(item.period)}</span><p>${escapeHtml(item.summary)}</p></li>`).join('')}</ol>
    </section>
    <section class="site-shell">
      ${sectionHeading('Fit', 'Kinds of work that fit best', 'The best fit is work that needs intellectual precision and audience awareness at the same time.')}
      <ul class="roles-list">${roleFit.map((item) => `<li><p>${escapeHtml(item)}</p></li>`).join('')}</ul>
    </section>`
  });
}

function researchPage() {
  return layout({
    route: '/research',
    title: 'Research',
    description: 'Historical and political research by Reese Hollister — North Africa, postcolonial African institutions, French institutional history, and digital history methodology.',
    body: `<section class="page-hero site-shell">
      <p class="section-kicker">Research</p>
      <h1>Research</h1>
      <p class="page-lead">Historical and political analysis grounded in North Africa, postcolonial state-building, and the longer afterlives of imperial infrastructure.</p>
      <p>My research sits at the intersection of area studies and institutional history. I am drawn to moments when political decisions get built into physical or institutional form — when a highway, an airline, or a hospital becomes a site where the question of sovereignty is settled, or unsettled, over time.</p>
    </section>
    <section class="site-shell">
      ${sectionHeading('Areas', 'Research areas', 'The main areas where my work has concentrated.')}
      <div class="pillars-grid">${researchAreas.map((area) => `<article class="pillar-card"><h3>${escapeHtml(area.area)}</h3><p>${escapeHtml(area.description)}</p></article>`).join('')}</div>
    </section>
    <section class="site-shell">
      ${sectionHeading('Projects', 'Active and recent research projects', 'Longer research work currently active or recently completed.')}
      <div class="proof-grid">${sortedProjects.filter((project) => project.pillars.includes('Research')).slice(0, 3).map((project) => `<article class="proof-card"><p class="section-kicker">${escapeHtml(project.categories[0])}</p><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.summary)}</p><a class="resource-link" href="${routeHref(`/projects/${project.slug}`)}">View project</a></article>`).join('')}</div>
    </section>
    <section class="site-shell">
      ${sectionHeading('Publications', 'Published writing and research', 'Peer-reviewed articles and published research. Full publication trail on Academia.edu.')}
      ${publicationList()}
    </section>`
  });
}

function projectsPage() {
  return layout({
    route: '/projects',
    title: 'Projects',
    description: 'Projects and selected work by Reese Hollister across research, teaching, product work, and public scholarship.',
    body: `<section class="page-hero site-shell">
      <p class="section-kicker">Projects</p>
      <h1>Projects</h1>
      <p class="page-lead">This page gathers a few of the larger projects on the site. Some are research projects, some are teaching-facing, and some sit between pedagogy and design.</p>
    </section>
    <section class="site-shell">
      ${sectionHeading('Selected Work', 'Main projects', 'A simple index of the larger projects featured on the site.')}
      <div class="project-grid">${sortedProjects.map(projectCard).join('')}</div>
    </section>
    <section class="site-shell">
      ${sectionHeading('Elsewhere', 'Public work and supporting links', 'Other parts of the public record that support the projects here.')}
      ${proofGrid(secondaryWork)}
    </section>`
  });
}

function projectPage(project) {
  const visibleLinks = project.links.filter((link) => link.available !== false && link.href !== '#');
  return layout({
    route: `/projects/${project.slug}`,
    title: project.seo.title || project.title,
    description: project.seo.description || project.summary,
    image: project.heroAsset.src,
    body: `<article class="project-page">
      <section class="project-hero site-shell">
        <p class="section-kicker">Project</p>
        <h1>${escapeHtml(project.title)}</h1>
        <p class="project-hero__summary">${escapeHtml(project.summary)}</p>
        <figure class="project-hero__media">
          <img src="${assetHref(project.heroAsset.src)}" alt="${escapeHtml(project.heroAsset.alt)}">
          ${project.heroAsset.caption ? `<figcaption>${escapeHtml(project.heroAsset.caption)}</figcaption>` : ''}
        </figure>
        <ul class="project-hero__meta">
          <li><span class="project-meta-label">Role</span><p>${escapeHtml(project.role)}</p></li>
          <li><span class="project-meta-label">Areas</span><p>${escapeHtml(project.categories.join(' / '))}</p></li>
          <li><span class="project-meta-label">Skills</span><p>${escapeHtml(project.skills.join(', '))}</p></li>
        </ul>
        ${actionList(visibleLinks, 'action-list')}
      </section>
      <section class="project-body site-shell prose-shell">
        ${project.sections.map((section) => `<h2>${escapeHtml(section.heading)}</h2>
          ${(section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
          ${section.bullets ? `<ul>${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>` : ''}
          ${(section.artifacts || []).map(artifactFigure).join('')}`).join('')}
      </section>
    </article>`
  });
}

function writingPage() {
  return layout({
    route: '/writing',
    title: 'Writing',
    description: 'Published writing and public scholarship by Reese Hollister — historical essays, peer-reviewed articles, and public-facing history writing.',
    body: `<section class="page-hero site-shell">
      <p class="section-kicker">Writing</p>
      <h1>Writing</h1>
      <p class="page-lead">Published work spanning historical method, colonial institutions, postcolonial Africa, and public-facing scholarship.</p>
      <p>My writing moves between academic venues and public formats. Peer-reviewed work tends toward close argumentation and archival grounding. Public writing — including the Historical Method Man channel — aims to make historical thinking legible to an audience that did not choose to study it.</p>
    </section>
    <section class="site-shell">
      ${sectionHeading('Publications', 'Peer-reviewed and published work', 'Articles published in academic history journals. Full archive on Academia.edu.')}
      ${publicationList()}
    </section>
    <section class="site-shell">
      ${sectionHeading('Public Scholarship', 'Public-facing writing and media', 'Writing and video work designed to reach audiences beyond the seminar room.')}
      ${proofGrid(secondaryWork)}
    </section>`
  });
}

function teachingPage() {
  return layout({
    route: '/teaching',
    title: 'Teaching',
    description: 'Teaching portfolio for Reese Hollister — Arabic instruction, writing consultation, political science TA work, and student-centered pedagogy.',
    body: `<section class="page-hero site-shell">
      <p class="section-kicker">Teaching</p>
      <h1>Teaching</h1>
      <p class="page-lead">Student-centered pedagogy shaped by writing support, Arabic instruction, large-class teaching, and close attention to how understanding actually forms.</p>
      <p>My teaching work spans one-on-one writing consultation, language instruction in Arabic, and teaching support in political science and international studies. What ties them together is a preoccupation with explanation — with what it takes for a student to stop pretending they understand something and actually get there.</p>
    </section>
    <section class="site-shell">
      ${sectionHeading('Roles', 'Teaching and consultation roles', 'Experience across writing support, language instruction, and political science pedagogy.')}
      <div class="resume-highlight-grid">${teachingRoles.map((role) => `<article class="resume-card"><h3>${escapeHtml(role.title)}</h3><p class="project-card__meta">${escapeHtml(role.org)} — ${escapeHtml(role.period)}</p><p>${escapeHtml(role.summary)}</p><ul>${role.skills.map((skill) => `<li>${escapeHtml(skill)}</li>`).join('')}</ul></article>`).join('')}</div>
    </section>
    <section class="site-shell">
      ${sectionHeading('Teaching Arabic', 'Arabic instruction', 'Language teaching grounded in script literacy, morphology, and classroom routine.')}
      <p>Arabic instruction has been part of my work since my Fulbright year in Morocco. My approach treats early Arabic literacy as a design problem: learners struggle not because the language is impossible, but because the learning materials rarely make the system visible.</p>
      ${actionList([{ label: "Huruf La'b project", href: '/projects/huruf-lab', note: 'Tactile Arabic learning system built from this pedagogical framework.', available: true }, { label: 'Teaching Arabic archive', href: 'https://sites.google.com/ncsu.edu/reese/teaching-arabic', note: 'Lesson plans, microteaching materials, and video samples from the original NCSU site.', available: true }], 'action-list')}
    </section>`
  });
}

function coachingPage() {
  return layout({
    route: '/coaching',
    title: 'Writing Coaching',
    description: 'One-on-one writing coaching with Reese Hollister — college essays, research papers, personal statements, and academic writing support for high school and college students.',
    body: `<section class="page-hero site-shell">
      <p class="section-kicker">Writing Coaching</p>
      <h1>Writing Coaching</h1>
      <p class="page-lead">One-on-one support for essays, research papers, personal statements, and academic writing — at every level, from high school to graduate school.</p>
      <p>I am a Level III CRLA-certified writing consultant with years of experience at NC State's Academic Success Center. I have helped students at every level find their argument, fix their structure, and write in a voice that sounds like them.</p>
      <ul class="home-hero__links"><li><a href="${routeHref('/contact')}">Get in touch</a></li><li><a href="${routeHref('/teaching')}">Full teaching background</a></li></ul>
    </section>
    <section class="site-shell">
      ${sectionHeading('Services', 'What I help with', 'Each area draws on the same core skill: finding what a piece of writing is really trying to do, and helping you get it there.')}
      <div class="pillars-grid">${coachingServices.map((service) => `<article class="pillar-card"><h3>${escapeHtml(service.title)}</h3><p>${escapeHtml(service.description)}</p></article>`).join('')}</div>
    </section>
    <section class="site-shell">
      ${sectionHeading('Contact', 'Book a session', 'Reach out to discuss your project and check availability.')}
      <div class="contact-grid contact-grid--linear"><article class="contact-card"><h3>Get in touch</h3><p>Send an email with a short description of what you are working on, your timeline, and whether you are looking for a one-time session or ongoing support.</p><ul class="action-list"><li><a class="action-link" href="mailto:reesewhollister@gmail.com">reesewhollister@gmail.com</a><span class="action-note">Primary contact. I respond within one to two business days.</span></li></ul></article></div>
    </section>`
  });
}

function resumePage() {
  return layout({
    route: '/resume',
    title: 'Resume / CV',
    description: 'Selected highlights and live public-profile links for Reese Hollister.',
    body: `<section class="page-hero site-shell">
      <p class="section-kicker">Resume / CV</p>
      <h1>Resume / CV</h1>
      <p class="page-lead">This page offers a short summary of the record, along with links to public materials. Current resume and CV PDFs are available by email request.</p>
    </section>
    <section class="site-shell">
      ${sectionHeading('Documents', 'Downloads and public links')}
      ${actionList(resumeResources, 'action-list action-list--stacked')}
    </section>
    <section class="site-shell">
      ${sectionHeading('Selected Highlights', 'Selected highlights', 'A few of the main throughlines in the work.')}
      <div class="resume-highlight-grid">
        <article class="resume-card"><h3>Research</h3><ul><li>Master of International Studies graduate from NC State (2026) with a specialization in North African studies.</li><li>Capstone work on Western Sahara tracing how infrastructure reshaped the politics of sovereignty and recognition.</li><li>Published historical writing in venues including History Matters, Gettysburg Historical Journal, and the Armstrong Undergraduate Journal of History.</li></ul></article>
        <article class="resume-card"><h3>Teaching</h3><ul><li>Graduate Writing Consultant at NC State's Academic Success Center with Level III CRLA certification in writing support.</li><li>Graduate Teaching Assistant for PS 331: U.S. Foreign Policy, supporting an 80-student lecture course across multiple semesters.</li><li>History teacher and BrainLyne convenor at the American Language Center in Rabat.</li></ul></article>
        <article class="resume-card"><h3>Building</h3><ul><li>Co-founder and instructional design lead for Huruf La'b, a tactile Arabic learning system.</li><li>Historical Method Man, a public scholarship channel with 1,700+ subscribers and 218,000+ views.</li><li>Case-study, slide, and visual-explanation work that turns complex research into durable public-facing artifacts.</li></ul></article>
      </div>
    </section>`
  });
}

function contactPage() {
  return layout({
    route: '/contact',
    title: 'Contact',
    description: 'Contact Reese Hollister for roles and projects involving research, teaching, and designed clarity.',
    body: `<section class="page-hero site-shell">
      <p class="section-kicker">Contact</p>
      <h1>Contact</h1>
      <p class="page-lead">These are the main public contact routes currently attached to the site and to the wider body of public work linked here.</p>
    </section>
    <section class="site-shell">
      ${sectionHeading('Contact Methods', 'Contact methods', 'Email, public profiles, and other active links.')}
      <div class="contact-grid contact-grid--linear">${contactMethods.filter((method) => method.available).map((method) => `<article class="contact-card"><p class="section-kicker">${escapeHtml(method.label)}</p><h3><a ${linkAttrs(withBase(method.href))}>${escapeHtml(method.value)}</a></h3><p>${escapeHtml(method.note)}</p><div class="action-list"><a class="resource-link" ${linkAttrs(withBase(method.href))}>${method.href.startsWith('mailto:') ? 'Send email' : 'Open profile'}</a></div></article>`).join('')}</div>
    </section>`
  });
}

function notFoundPage() {
  return layout({
    route: '/404',
    title: 'Page Not Found',
    description: "The requested page was not found on Reese Hollister's portfolio site.",
    body: `<section class="page-hero site-shell">
      <p class="section-kicker">404</p>
      <h1>This page slipped out of the archive.</h1>
      <p class="page-lead">The page you are looking for is not available. Use the navigation above or return to the homepage.</p>
      <ul class="home-hero__links">
        <li><a href="${routeHref('/')}">Home</a></li>
        <li><a href="${routeHref('/projects')}">Projects</a></li>
        <li><a href="${routeHref('/contact')}">Contact</a></li>
      </ul>
    </section>`
  });
}

function pages() {
  const result = [
    ['/', homePage()],
    ['/about', aboutPage()],
    ['/research', researchPage()],
    ['/projects', projectsPage()],
    ['/writing', writingPage()],
    ['/teaching', teachingPage()],
    ['/coaching', coachingPage()],
    ['/resume', resumePage()],
    ['/contact', contactPage()],
    ['/404', notFoundPage()]
  ];
  for (const project of sortedProjects) {
    result.push([`/projects/${project.slug}`, projectPage(project)]);
  }
  return result;
}

function outputPathFor(route) {
  if (route === '/404') return path.join(distDir, '404.html');
  const clean = route === '/' ? '' : route.replace(/^\/+|\/+$/g, '');
  return path.join(distDir, clean, 'index.html');
}

function cleanDist() {
  if (path.basename(distDir) !== 'dist' || !distDir.startsWith(root)) {
    throw new Error(`Refusing to clean unexpected build directory: ${distDir}`);
  }
  fs.rmSync(distDir, { recursive: true, force: true });
}

function collectLocalAssets() {
  const assets = new Set([
    '/assets/ui/favicon.svg',
    '/assets/ui/2026-03-31__reese-portfolio__asset__v02__google-site-welcome-photo.jpg',
    '/assets/ui/2026-03-31__reese-portfolio__asset__v01__reese-public-profile.jpg',
    '/assets/ui/2026-03-31__reese-portfolio__asset__v01__history-matters-publication-thumb.jpg'
  ]);
  for (const project of sortedProjects) {
    assets.add(project.heroAsset.src);
    for (const section of project.sections) {
      for (const artifact of section.artifacts || []) assets.add(artifact.src);
    }
    for (const link of project.links) {
      if (link.available !== false && link.href?.startsWith('/assets/')) assets.add(link.href);
    }
  }
  return [...assets];
}

function validateAssets() {
  const missing = collectLocalAssets()
    .filter((asset) => asset.startsWith('/assets/'))
    .filter((asset) => !fs.existsSync(path.join(publicDir, asset.replace(/^\/+/, ''))));
  if (missing.length) {
    throw new Error(`Missing public assets:\n${missing.join('\n')}`);
  }
}

function buildCss() {
  debug('buildCss:start');
  let css = fs.readFileSync(path.join(root, 'src/styles/global.css'), 'utf8');
  const fontDir = path.join(distDir, 'assets', 'fonts');
  fs.mkdirSync(fontDir, { recursive: true });
  css = css.replace(/@import '(@fontsource\/([^/]+)\/[^']+\.css)';/g, (_full, importPath, pkgName) => {
    debug(`buildCss:font-import:${importPath}`);
    const cssPath = path.join(root, 'node_modules', importPath);
    if (!fs.existsSync(cssPath)) return '';
    return fs.readFileSync(cssPath, 'utf8').replace(/url\(([^)]+)\)/g, (match, rawUrl) => {
      const cleanUrl = rawUrl.replace(/['"]/g, '');
      if (!cleanUrl.startsWith('../files/') && !cleanUrl.startsWith('./files/')) return match;
      const fontSourcePath = path.join(root, 'node_modules', '@fontsource', pkgName, cleanUrl.replace(/^(\.\.\/|\.\/)/, ''));
      const fontFileName = `${pkgName}-${path.basename(cleanUrl)}`;
      try {
        // node_modules may be iCloud-evicted; a dataless font triggers a slow/failing download.
        fs.copyFileSync(fontSourcePath, path.join(fontDir, fontFileName));
        return `url('${assetHref(`/assets/fonts/${fontFileName}`)}')`;
      } catch (error) {
        debug(`buildCss:font-copy-skip:${fontFileName}:${error.code || error.message}`);
        return match;
      }
    });
  });
  fs.mkdirSync(path.join(distDir, 'assets'), { recursive: true });
  fs.writeFileSync(path.join(distDir, 'assets', 'site.css'), css);
  debug('buildCss:done');
}

function copyPublicAssets() {
  debug('copyPublicAssets:start');
  if (fs.existsSync(publicDir)) {
    fs.cpSync(publicDir, distDir, { recursive: true });
  }
  debug('copyPublicAssets:done');
}

function assertNoPublicPlaceholders(renderedPages) {
  const badPattern = /\bTODO\b|example\.com|currently completing|Statemennt|Arabiic|teching|href="#"/i;
  const offenders = renderedPages.filter(([, html]) => badPattern.test(html));
  if (offenders.length) {
    throw new Error(`Public placeholder or typo text found in generated pages: ${offenders.map(([route]) => route).join(', ')}`);
  }
}

function build({ checkOnly = false } = {}) {
  debug('build:start');
  validateAssets();
  debug('build:assets-ok');
  const renderedPages = pages();
  debug(`build:pages:${renderedPages.length}`);
  assertNoPublicPlaceholders(renderedPages);
  debug('build:placeholders-ok');

  if (checkOnly) {
    console.log(`Static site check passed: ${renderedPages.length} pages and ${collectLocalAssets().length} local assets validated.`);
    return renderedPages.length;
  }

  cleanDist();
  debug('build:dist-clean');
  fs.mkdirSync(distDir, { recursive: true });
  copyPublicAssets();
  buildCss();
  for (const [route, html] of renderedPages) {
    debug(`build:write:${route}`);
    const filePath = outputPathFor(route);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, html);
  }
  console.log(`Static site built: ${renderedPages.length} pages written to dist/.`);
  return renderedPages.length;
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.pdf': 'application/pdf',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.woff2': 'font/woff2'
  }[ext] || 'application/octet-stream';
}

function serve() {
  const port = Number(process.env.PORT || 4321);
  const host = process.env.HOST || '127.0.0.1';
  const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url, `http://${request.headers.host}`);
    const decodedPath = decodeURIComponent(requestUrl.pathname);
    const safePath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, '');
    let filePath = path.join(distDir, safePath);
    if (!path.extname(filePath)) filePath = path.join(filePath, 'index.html');
    if (!filePath.startsWith(distDir) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(distDir, 'index.html');
    }
    response.setHeader('Content-Type', contentType(filePath));
    fs.createReadStream(filePath).pipe(response);
  });
  server.listen(port, host, () => {
    console.log(`Preview server running at http://${host}:${port}/`);
  });

  if (args.has('--watch')) {
    const rebuild = debounce(() => {
      try {
        build();
        console.log('Rebuilt after source change.');
      } catch (error) {
        console.error(error.message);
      }
    }, 200);
    fs.watch(path.join(root, 'src'), { recursive: true }, rebuild);
    fs.watch(path.join(root, 'public'), { recursive: true }, rebuild);
  }
}

function debounce(fn, wait) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, wait);
  };
}

try {
  if (args.has('--check')) {
    build({ checkOnly: true });
  } else {
    build();
    if (args.has('--serve')) serve();
  }
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
