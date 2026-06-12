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
  aboutTimelineFull,
  brandThesis,
  coachingServices,
  contactMethods,
  homeIntro,
  methodMachineSteps,
  navLinks,
  proofStrip,
  proofItems,
  publications,
  researchAreas,
  researchClusters,
  resumeResources,
  roleFit,
  secondaryWork,
  serviceCards,
  siteMeta,
  teachingRoles,
  whatIDo
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

function slugify(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
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
    <!-- GA4: replace G-XXXXXXXXXX with your Measurement ID to enable analytics -->
  </head>
  <body>
    <a class="skip-link" href="#content">Skip to content</a>
    ${header(route)}
    <main id="content">
      ${body}
    </main>
    ${footer()}
    <script>
      (function() {
        // Minimal analytics hook — wire to GA4 by adding gtag script above
        window.siteTrack = function(eventName, params) {
          if (typeof gtag === 'function') gtag('event', eventName, params || {});
        };
        document.addEventListener('click', function(e) {
          var tracked = e.target.closest('[data-track]');
          if (!tracked) return;
          window.siteTrack(tracked.dataset.track, { event_label: (tracked.dataset.trackLabel || tracked.textContent).trim().slice(0, 80) });
        });
      })();
    </script>
    <script>
      (function() {
        if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        var targets = Array.from(document.querySelectorAll('main > section:not(.cinematic-hero), .project-body > h2, .project-body > p, .project-body > ul, .project-body > figure'));
        targets.forEach(function(t) { t.classList.add('reveal'); });
        document.documentElement.classList.add('reveal-ready');
        var observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
        }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
        targets.forEach(function(t) { observer.observe(t); });
      })();
    </script>
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
  return `<article class="project-card" data-tags="${escapeHtml((project.tags || project.categories).join('|'))}">
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

function expandableProjectCard(project) {
  const expandId = `expand-${project.slug}`;
  const overviewPara = (project.sections[0] && project.sections[0].paragraphs && project.sections[0].paragraphs[0]) || project.summary;
  const visibleLinks = project.links.filter((l) => l.available !== false && l.href !== '#');
  const tagList = (project.tags || project.categories);
  return `<article class="project-card project-card--expandable" data-tags="${escapeHtml(tagList.join('|'))}">
    <a class="project-card__media" href="${routeHref(`/projects/${project.slug}`)}" tabindex="-1" aria-hidden="true">
      <img src="${assetHref(project.heroAsset.src)}" alt="${escapeHtml(project.heroAsset.alt)}" loading="lazy">
    </a>
    <div class="project-card__body">
      <div class="project-card__tag-list">
        ${tagList.map((t) => `<span class="project-tag">${escapeHtml(t)}</span>`).join('')}
      </div>
      <h3><a href="${routeHref(`/projects/${project.slug}`)}">${escapeHtml(project.title)}</a></h3>
      <p>${escapeHtml(project.summary)}</p>
      <div class="project-card__actions">
        <button class="project-card__toggle" type="button" aria-expanded="false" aria-controls="${escapeHtml(expandId)}" data-track="project_expand" data-track-label="${escapeHtml(project.title)}">
          Show details
        </button>
        <a class="resource-link" href="${routeHref(`/projects/${project.slug}`)}">Full case study</a>
      </div>
      <div class="project-card__expand" id="${escapeHtml(expandId)}" hidden>
        <h4>Thesis</h4>
        <p>${escapeHtml(overviewPara)}</p>
        <h4>Methods &amp; skills</h4>
        <ul class="expand-skills">
          ${project.skills.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}
        </ul>
        ${visibleLinks.length > 0 ? `<h4>Outputs &amp; artifacts</h4><ul class="expand-links">
          ${visibleLinks.map((l) => `<li><a ${linkAttrs(l.href.startsWith('/') ? routeHref(l.href) : withBase(l.href))} data-track="dataset_click">${escapeHtml(l.label)}</a>${l.note ? ` <span class="action-note">${escapeHtml(l.note)}</span>` : ''}</li>`).join('')}
        </ul>` : ''}
      </div>
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

// ── Choose-your-path module ───────────────────────────────────────────────────

function choosePathHtml() {
  const paths = [
    {
      icon: '⊞',
      label: 'Research Projects',
      detail: 'Historical analysis of North Africa, postcolonial institutions, and digital history',
      href: routeHref('/research'),
      track: 'choose_path_click'
    },
    {
      icon: '◎',
      label: 'Digital Maps &amp; Datasets',
      detail: 'Interactive encyclopedia of 723 African airlines and Western Sahara infrastructure data',
      href: routeHref('/african-airlines'),
      track: 'choose_path_click'
    },
    {
      icon: '&#10000;',
      label: 'Writing Coaching',
      detail: 'College essays, research papers, personal statements, and academic revision support',
      href: routeHref('/coaching'),
      track: 'choose_path_click'
    },
    {
      icon: '&#9672;',
      label: 'Teaching Work',
      detail: 'Arabic instruction, writing consultation, and student-centered pedagogy',
      href: routeHref('/teaching'),
      track: 'choose_path_click'
    },
    {
      icon: '&#9654;',
      label: 'Videos / Public Scholarship',
      detail: 'Historical Method Man — historical thinking for audiences beyond the seminar room',
      href: 'https://www.youtube.com/channel/UCCRhHuIxYd3wyzYuaCNH3AA/',
      external: true,
      track: 'youtube_click'
    },
    {
      icon: '&#8853;',
      label: 'CV',
      detail: 'Academic record, publications, teaching experience, and professional background',
      href: routeHref('/resume'),
      track: 'cv_click'
    }
  ];
  return `<section class="site-shell choose-path-section">
    <div class="section-heading">
      <p class="section-kicker">Start here</p>
      <h2>What are you here to see?</h2>
    </div>
    <div class="choose-path__grid">
      ${paths.map((p) => `<a class="choose-path__btn" href="${p.href}"${p.external ? ' target="_blank" rel="noreferrer"' : ''} data-track="${p.track}">
        <span class="choose-path__icon" aria-hidden="true">${p.icon}</span>
        <span class="choose-path__label">${p.label}</span>
        <span class="choose-path__detail">${p.detail}</span>
      </a>`).join('')}
    </div>
  </section>`;
}

// ── Featured research object (From Colonies to Carriers) ─────────────────────

function featuredObjectHtml(project) {
  const stats = [
    { value: '723', label: 'Airlines documented' },
    { value: '54', label: 'Countries covered' },
    { value: '1919–98', label: 'Years surveyed' },
    { value: '6', label: 'Colonial powers tracked' }
  ];
  return `<div class="featured-object">
    <div class="featured-object__inner">
      <p class="section-kicker">Featured Research Project</p>
      <h3>${escapeHtml(project.title)}</h3>
      <p>${escapeHtml(project.summary)}</p>
      <div class="featured-object__stats" aria-label="Project statistics">
        ${stats.map((s) => `<div class="featured-object__stat">
          <span class="stat-value">${escapeHtml(s.value)}</span>
          <span class="stat-label">${escapeHtml(s.label)}</span>
        </div>`).join('')}
      </div>
      <div class="featured-object__actions">
        <a class="featured-object__cta--primary" href="${routeHref('/african-airlines')}" data-track="dataset_click">Explore the encyclopedia</a>
        <a class="featured-object__cta--secondary" href="${routeHref('/projects/from-colonies-to-carriers')}">Read the case study</a>
      </div>
    </div>
    <div class="featured-object__media">
      <img src="${assetHref(project.heroAsset.src)}" alt="${escapeHtml(project.heroAsset.alt)}" loading="lazy">
    </div>
  </div>`;
}

// ── Project filter bar ────────────────────────────────────────────────────────

function filterBarHtml(projectList) {
  const allTags = new Set();
  projectList.forEach((p) => (p.tags || p.categories).forEach((t) => allTags.add(t)));
  const tags = Array.from(allTags).sort();
  return `<div class="filter-bar" role="group" aria-label="Filter projects by tag">
    <button class="filter-chip is-active" type="button" data-filter="all" aria-pressed="true">All</button>
    ${tags.map((t) => `<button class="filter-chip" type="button" data-filter="${escapeHtml(t)}" aria-pressed="false">${escapeHtml(t)}</button>`).join('')}
  </div>
  <p class="filter-count" id="filter-count" aria-live="polite">${projectList.length} projects</p>`;
}

// ── Research Method Machine ───────────────────────────────────────────────────

function methodMachineHtml(steps) {
  return `<div class="method-machine" id="method-machine">
    <div class="method-machine__track" role="list">
      ${steps.map((step, i) => `<button class="method-step" type="button" role="listitem" data-step="${i}" aria-expanded="false" aria-controls="method-detail-${i}" aria-pressed="false">
        <span class="method-step__num" aria-hidden="true">${i + 1}</span>
        <span class="method-step__label">${escapeHtml(step.step)}</span>
        <span class="method-step__arrow" aria-hidden="true">&#8595;</span>
      </button>`).join('')}
    </div>
    <div class="method-machine__panels">
      ${steps.map((step, i) => `<div class="method-machine__panel" id="method-detail-${i}" hidden>
        <h4>${escapeHtml(step.step)}</h4>
        <p>${escapeHtml(step.description)}</p>
        <p class="method-step__example"><strong>In Reese&#39;s projects:</strong> ${escapeHtml(step.example)}</p>
      </div>`).join('')}
    </div>
  </div>
  <script>
    (function() {
      var buttons = document.querySelectorAll('.method-step');
      var panels = document.querySelectorAll('.method-machine__panel');
      buttons.forEach(function(btn) {
        btn.addEventListener('click', function() {
          var isOpen = btn.getAttribute('aria-expanded') === 'true';
          buttons.forEach(function(b) {
            b.setAttribute('aria-expanded', 'false');
            b.setAttribute('aria-pressed', 'false');
            b.classList.remove('is-active');
          });
          panels.forEach(function(p) { p.hidden = true; });
          if (!isOpen) {
            btn.setAttribute('aria-expanded', 'true');
            btn.setAttribute('aria-pressed', 'true');
            btn.classList.add('is-active');
            var panel = document.getElementById(btn.getAttribute('aria-controls'));
            if (panel) panel.hidden = false;
          }
        });
        btn.addEventListener('keydown', function(e) {
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            var next = btn.nextElementSibling;
            if (next && next.classList.contains('method-step')) next.focus();
          }
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            var prev = btn.previousElementSibling;
            if (prev && prev.classList.contains('method-step')) prev.focus();
          }
        });
      });
    })();
  </script>`;
}

// ── Coaching quiz ─────────────────────────────────────────────────────────────

function coachingQuizHtml() {
  const quizRecs = {
    'college-essay|blank-page': ['College Essay: Discovery Session', 'We dig into your experiences together and find the story worth telling. Bring anything — lists, memories, drafts, nothing at all.'],
    'college-essay|argument': ['College Essay: Draft Workshop', 'You have the material. We will build the arc that makes the admissions reader stop.'],
    'college-essay|structure': ['College Essay: Structure and Flow', 'We will reorder, cut, and tighten until the shape is right and the essay earns its ending.'],
    'college-essay|voice': ['College Essay: Voice and Revision', 'We will find the version that sounds unmistakably like you — not like a generic applicant.'],
    'college-essay|revision': ['College Essay: Final Read', 'A close editorial pass before you submit. Line by line, word by word.'],
    'research-paper|blank-page': ['Research Paper: Getting Started', 'We will find your research question and map a path through the sources.'],
    'research-paper|argument': ['Research Paper: Argument Development', 'You have sources. We will build the claim they support and the structure that carries it.'],
    'research-paper|structure': ['Research Paper: Structure Workshop', 'We will diagnose the structural problem — buried thesis, weak transitions, paragraph drift — and rebuild.'],
    'research-paper|voice': ['Research Paper: Academic Voice', 'Clear, precise, and genuinely yours. We will work on sentence-level clarity without flattening the argument.'],
    'research-paper|revision': ['Research Paper: Editorial Review', 'A second eye before submission. I will read as a reader, not as a co-author.'],
    'graduate|blank-page': ['Graduate Application: Concept Session', 'We will find your intellectual narrative before you write a single sentence.'],
    'graduate|argument': ['Graduate Application: Positioning', 'We will make your intellectual case clear, specific, and distinctive for the readers who matter.'],
    'graduate|structure': ['Graduate Application: Statement Workshop', 'Opening, intellectual trajectory, program fit, close — we will get the architecture right.'],
    'graduate|voice': ['Graduate Application: Voice and Precision', 'Formal but human. We will find that register and hold it across every paragraph.'],
    'graduate|revision': ['Graduate Application: Final Polish', 'A close read before you send it out. Nothing vague, nothing wasted.'],
    'other|blank-page': ['Open Session: Getting Started', 'Bring your project and we will find the entry point together.'],
    'other|argument': ['Open Session: Argument and Evidence', 'We will work through your claim and figure out how to support it.'],
    'other|structure': ['Open Session: Structure and Clarity', 'We will diagnose the structural problem and begin rebuilding.'],
    'other|voice': ['Open Session: Voice and Revision', 'Clear writing that sounds like you. We will get there.'],
    'other|revision': ['Open Session: Review and Feedback', 'A second read on whatever you are working on before it goes out.']
  };

  return `<div class="coaching-quiz" id="coaching-quiz">
    <div class="quiz-step" id="quiz-step-1">
      <p class="quiz-step__question">What are you working on?</p>
      <div class="quiz-options" role="group" aria-label="Project type">
        <button class="quiz-option" type="button" data-project="college-essay">College essay</button>
        <button class="quiz-option" type="button" data-project="research-paper">Research paper</button>
        <button class="quiz-option" type="button" data-project="graduate">Graduate or personal statement</button>
        <button class="quiz-option" type="button" data-project="other">Something else</button>
      </div>
    </div>
    <div class="quiz-step quiz-step--hidden" id="quiz-step-2" aria-hidden="true">
      <p class="quiz-step__question">Where are you stuck?</p>
      <div class="quiz-options" role="group" aria-label="Stuck point">
        <button class="quiz-option" type="button" data-stuck="blank-page">Blank page — I do not know where to start</button>
        <button class="quiz-option" type="button" data-stuck="argument">I have material but no argument</button>
        <button class="quiz-option" type="button" data-stuck="structure">The structure is wrong</button>
        <button class="quiz-option" type="button" data-stuck="voice">It does not sound like me</button>
        <button class="quiz-option" type="button" data-stuck="revision">I need a second read before I submit</button>
      </div>
    </div>
    <div class="quiz-result" id="quiz-result" hidden aria-live="polite">
      <p class="section-kicker">Recommended session type</p>
      <h3 class="quiz-result__type" id="quiz-result-type"></h3>
      <p class="quiz-result__description" id="quiz-result-desc"></p>
      <a class="quiz-result__cta" href="mailto:reesewhollister@gmail.com" data-track="coaching_book_click">Get in touch to book this session</a>
      <button class="quiz-reset" type="button" id="quiz-reset">Start over</button>
    </div>
  </div>
  <script>
    (function() {
      var QUIZ = ${JSON.stringify(quizRecs)};
      var projectType = null;
      var step2 = document.getElementById('quiz-step-2');
      var resultEl = document.getElementById('quiz-result');
      var resultType = document.getElementById('quiz-result-type');
      var resultDesc = document.getElementById('quiz-result-desc');
      var resetBtn = document.getElementById('quiz-reset');

      document.querySelectorAll('[data-project]').forEach(function(btn) {
        btn.addEventListener('click', function() {
          document.querySelectorAll('[data-project]').forEach(function(b) { b.classList.remove('is-selected'); b.setAttribute('aria-pressed', 'false'); });
          btn.classList.add('is-selected');
          btn.setAttribute('aria-pressed', 'true');
          projectType = btn.dataset.project;
          step2.classList.remove('quiz-step--hidden');
          step2.removeAttribute('aria-hidden');
          resultEl.hidden = true;
          document.querySelectorAll('[data-stuck]').forEach(function(b) { b.classList.remove('is-selected'); b.setAttribute('aria-pressed', 'false'); });
          step2.querySelector('.quiz-option').focus();
        });
      });

      document.querySelectorAll('[data-stuck]').forEach(function(btn) {
        btn.addEventListener('click', function() {
          document.querySelectorAll('[data-stuck]').forEach(function(b) { b.classList.remove('is-selected'); b.setAttribute('aria-pressed', 'false'); });
          btn.classList.add('is-selected');
          btn.setAttribute('aria-pressed', 'true');
          var key = projectType + '|' + btn.dataset.stuck;
          var rec = QUIZ[key] || ['Open Session', 'We will figure out the right approach together.'];
          resultType.textContent = rec[0];
          resultDesc.textContent = rec[1];
          resultEl.hidden = false;
          resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          window.siteTrack && window.siteTrack('coaching_quiz_complete', { result: rec[0] });
        });
      });

      if (resetBtn) {
        resetBtn.addEventListener('click', function() {
          projectType = null;
          document.querySelectorAll('.quiz-option').forEach(function(b) { b.classList.remove('is-selected'); b.setAttribute('aria-pressed', 'false'); });
          step2.classList.add('quiz-step--hidden');
          step2.setAttribute('aria-hidden', 'true');
          resultEl.hidden = true;
          document.querySelector('[data-project]').focus();
        });
      }
    })();
  </script>`;
}

// ── Session flow ──────────────────────────────────────────────────────────────

function sessionFlowHtml() {
  const stages = [
    {
      kicker: 'Before',
      title: 'You send context',
      body: 'A short email describing your project, your deadline, and where you are stuck. No polished draft required — rough notes are fine.'
    },
    {
      kicker: 'During',
      title: 'We work together',
      body: 'Sessions are 45 to 60 minutes. We will read, diagnose, outline, draft, or revise — whatever gets you unstuck. I ask questions. You write. The session moves at the speed the writing needs.'
    },
    {
      kicker: 'After',
      title: 'You leave with something',
      body: 'A better draft, a clearer argument, a revised structure, or a working outline. Not just feedback — forward motion. Most people leave able to work on their own again.'
    }
  ];
  return `<div class="session-flow">
    ${stages.map((s) => `<div class="session-stage">
      <p class="section-kicker">${escapeHtml(s.kicker)}</p>
      <h3>${escapeHtml(s.title)}</h3>
      <p>${escapeHtml(s.body)}</p>
    </div>`).join('')}
  </div>`;
}

// ── Project page sticky subnav ────────────────────────────────────────────────

function projectSubnavHtml(project) {
  const visibleLinks = project.links.filter((l) => l.available !== false && l.href !== '#');
  if (project.sections.length < 2 && !visibleLinks.length) return '';
  return `<nav class="project-subnav" aria-label="Project sections">
    <ul class="project-subnav__list site-shell">
      ${project.sections.map((s) => `<li><a class="project-subnav__link" href="#section-${slugify(s.heading)}">${escapeHtml(s.heading)}</a></li>`).join('')}
      ${visibleLinks.length > 0 ? `<li><a class="project-subnav__link" href="#project-materials">Materials</a></li>` : ''}
    </ul>
  </nav>`;
}

// ── Page functions ────────────────────────────────────────────────────────────

function homePage() {
  const coloniesProject = sortedProjects.find((p) => p.slug === 'from-colonies-to-carriers');
  const otherFeatured = featuredProjects.filter((p) => p.slug !== 'from-colonies-to-carriers');

  return layout({
    route: '/',
    body: `<section class="cinematic-hero">
      <div class="cinematic-hero__media">
        <img src="${assetHref('/assets/ui/chefchaouen-01.jpg')}" alt="Chefchaouen, the blue-washed city of northern Morocco, where Reese conducted Fulbright fieldwork." fetchpriority="high">
      </div>
      <div class="cinematic-hero__inner site-shell">
        <p class="cinematic-hero__kicker">Research you can see</p>
        <h1 class="cinematic-hero__title">Historian of North Africa</h1>
        <p class="cinematic-hero__tagline">${escapeHtml(siteMeta.position)}</p>
        <p class="cinematic-hero__lead">I study how states, infrastructures, languages, and archives shape life after empire — from Moroccan mountain towns to African airlines.</p>
        <ul class="cinematic-hero__actions">
          <li><a href="${routeHref('/research')}" data-track="choose_path_click">View Research</a></li>
          <li><a href="${routeHref('/african-airlines')}" data-track="dataset_click">Explore the Database</a></li>
          <li><a href="${routeHref('/coaching')}" data-track="coaching_book_click">Work With Me</a></li>
          <li><a href="${routeHref('/resume')}" data-track="cv_click">Download CV</a></li>
        </ul>
      </div>
      <span class="cinematic-hero__credit">Chefchaouen, Morocco</span>
    </section>
    <section class="site-shell proof-strip-section">
      <ul class="proof-strip">
        ${proofStrip.map((item) => `<li class="proof-strip__item"><span class="proof-strip__label">${escapeHtml(item.label)}</span><span class="proof-strip__detail">${escapeHtml(item.detail)}</span></li>`).join('')}
      </ul>
    </section>
    ${choosePathHtml()}
    <section class="site-shell">
      <p class="brand-thesis">${escapeHtml(brandThesis)}</p>
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
      ${sectionHeading('What I do', 'From complex material to clear communication')}
      <div class="prose-shell">
        ${whatIDo.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
      </div>
    </section>
    <section class="site-shell">
      ${sectionHeading('Work with me', 'Three ways I help')}
      <div class="pillars-grid">
        ${serviceCards.map((card) => `<article class="pillar-card service-card"><h3>${escapeHtml(card.title)}</h3><p>${escapeHtml(card.summary)}</p><a class="service-card__cta" ${linkAttrs(isExternal(card.href) ? card.href : routeHref(card.href))}>${escapeHtml(card.cta)} &#8594;</a></article>`).join('')}
      </div>
    </section>
    <section class="site-shell">
      ${sectionHeading('Featured Research', 'Research you can interact with', 'The largest digital history project on the site — a searchable database of 723 African airlines built from archival sources.')}
      ${coloniesProject ? featuredObjectHtml(coloniesProject) : ''}
      ${otherFeatured.length > 0 ? `<div class="project-grid home-project-grid">${otherFeatured.map(projectCard).join('')}</div>` : ''}
    </section>
    <section class="site-shell">
      ${sectionHeading('Elsewhere', 'Public work and older pages', 'Some of this work also lives on older public pages and platforms.')}
      ${proofGrid(proofItems)}
    </section>`
  });
}

function aboutPage() {
  const timelineItems = (aboutTimelineFull || aboutTimeline || []);
  return layout({
    route: '/about',
    title: 'About',
    description: 'About Reese Hollister: historian of North Africa, educator, writing consultant, and digital research builder.',
    body: `<section class="page-hero site-shell">
      <div class="about-hero__layout">
        <div class="about-hero__copy">
          <p class="section-kicker">About</p>
          <h1>About Reese Hollister</h1>
          <p class="page-lead">I work across historical research, international studies, teaching, writing support, language learning, and public-facing scholarship.</p>
          <p>What ties these areas together is a steady interest in explanation: how people understand difficult material, how a research question becomes legible, and how public-facing work can stay serious without becoming inaccessible.</p>
          <p>I am a recent Master of International Studies graduate from NC State University (2026), a Fulbright alumnus, a Level III CRLA-certified writing consultant, and the co-founder of a tactile Arabic learning system called Huruf La'b.</p>
        </div>
        <div class="about-hero__media">
          <figure class="about-inline-figure"><img class="about-portrait" src="${assetHref('/assets/ui/2026-03-31__reese-portfolio__asset__v01__reese-public-profile.jpg')}" alt="Public profile portrait of Reese Hollister."><figcaption class="about-portrait__caption">Profile image previously used on Reese's public-facing profiles.</figcaption></figure>
          <figure class="about-inline-figure about-inline-figure--secondary"><img class="about-publication" src="${assetHref('/assets/ui/2026-03-31__reese-portfolio__asset__v01__history-matters-publication-thumb.jpg')}" alt="History Matters publication cover from Reese Hollister's public materials."><figcaption class="about-portrait__caption">A publication cover from Reese's public-facing work.</figcaption></figure>
        </div>
      </div>
    </section>
    <section class="site-shell">
      ${sectionHeading('Focus', 'Three things I do', 'Research, teaching, and building are not separate tracks. They are the same practice applied to different problems.')}
      <div class="about-focus-grid">
        <article class="about-focus-card">
          <h3>Research</h3>
          <p>Historical and political analysis grounded in North Africa, postcolonial institutions, and digital history methodology. I reconstruct evidence from fragmentary sources, build structured datasets, and translate that work into public-facing arguments.</p>
          <a class="resource-link" href="${routeHref('/research')}">See research work</a>
        </article>
        <article class="about-focus-card">
          <h3>Teaching</h3>
          <p>One-on-one writing consultation, Arabic instruction, and classroom teaching in political science and history. My focus is on the moment understanding actually forms — what gets a student from confused to capable.</p>
          <a class="resource-link" href="${routeHref('/teaching')}">See teaching work</a>
        </article>
        <article class="about-focus-card">
          <h3>Building</h3>
          <p>Interactive databases, visual case studies, learning tools, and public scholarship projects. Products and explanatory artifacts built from the same habits of mind as the research: serious material shaped for people who need to use it.</p>
          <a class="resource-link" href="${routeHref('/projects')}">See projects</a>
        </article>
      </div>
    </section>
    <section class="site-shell">
      ${sectionHeading('Path', 'How I got here', 'The path makes more sense through the work than through labels.')}
      <ol class="timeline-list timeline-list--full">
        ${timelineItems.map((item) => `<li>
          <div class="timeline-item__head">
            <span class="timeline-label">${escapeHtml(item.period)}</span>
            ${item.date ? `<span class="timeline-date">${escapeHtml(item.date)}</span>` : ''}
          </div>
          <p>${escapeHtml(item.summary)}</p>
        </li>`).join('')}
      </ol>
    </section>
    <section class="site-shell">
      ${sectionHeading('Fit', 'Kinds of work that fit best', 'The best fit is work that needs intellectual precision and audience awareness at the same time.')}
      <ul class="roles-list">${roleFit.map((item) => `<li><p>${escapeHtml(item)}</p></li>`).join('')}</ul>
    </section>`
  });
}

function researchPage() {
  const clusters = researchClusters || [];
  const steps = methodMachineSteps || [];
  return layout({
    route: '/research',
    title: 'Research',
    description: 'Historical and political research by Reese Hollister — North Africa, postcolonial African institutions, French institutional history, and digital history methodology.',
    body: `<section class="page-hero site-shell">
      <p class="section-kicker">Research</p>
      <h1>Research</h1>
      <p class="page-lead">Historical and political analysis at the intersection of North Africa, postcolonial state-building, and the long afterlives of imperial infrastructure.</p>
      <p>I am drawn to moments when political decisions get built into physical or institutional form — when a highway, an airline, or a hospital becomes a site where the question of sovereignty is settled, or unsettled, over time. My research reconstructs those moments from fragmentary evidence and makes the argument visible.</p>
    </section>
    <section class="site-shell research-clusters-section">
      ${sectionHeading('Clusters', 'Research agenda', 'Three connected bodies of work organized around a common question: how do institutions, infrastructures, and archives shape political life after empire?')}
      <div class="research-clusters">
        ${clusters.map((cluster) => `<article class="research-cluster" id="cluster-${escapeHtml(cluster.id)}">
          <div class="research-cluster__layout">
            <div class="research-cluster__head">
              <p class="section-kicker">${escapeHtml(cluster.kicker)}</p>
              <h3>${escapeHtml(cluster.label)}</h3>
              <p class="research-cluster__question">${escapeHtml(cluster.keyQuestion)}</p>
            </div>
            <div class="research-cluster__body">
              <p>${escapeHtml(cluster.description)}</p>
              <ul class="research-cluster__methods">
                ${cluster.methods.map((m) => `<li>${escapeHtml(m)}</li>`).join('')}
              </ul>
              ${cluster.projectSlug
                ? `<a class="resource-link" href="${routeHref('/projects/' + cluster.projectSlug)}" data-track="project_expand">See the project: ${escapeHtml(cluster.projectLabel)} &#8594;</a>`
                : `<p class="action-note cluster-in-progress">${escapeHtml(cluster.projectLabel)} — active research area, no public project page yet</p>`}
            </div>
          </div>
        </article>`).join('')}
      </div>
    </section>
    <section class="site-shell">
      ${sectionHeading('Method', 'The Research Method Machine', 'How a research question becomes public output — step by step. Click any step to see how it works in Reese\'s actual projects.')}
      ${steps.length > 0 ? methodMachineHtml(steps) : ''}
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
    description: 'Projects and selected work by Reese Hollister across research, digital history, teaching, and public scholarship.',
    body: `<section class="page-hero site-shell">
      <p class="section-kicker">Projects</p>
      <h1>Projects</h1>
      <p class="page-lead">Research, digital history, teaching, and product work — filterable by type. Click any card to see thesis, methods, and outputs.</p>
    </section>
    <section class="site-shell">
      ${filterBarHtml(sortedProjects)}
      <div class="project-grid project-grid--filterable" id="project-grid">
        ${sortedProjects.map(expandableProjectCard).join('')}
      </div>
    </section>
    <section class="site-shell">
      ${sectionHeading('Elsewhere', 'Public work and supporting links', 'Other parts of the public record that support the projects here.')}
      ${proofGrid(secondaryWork)}
    </section>
    <script>
      (function() {
        var chips = document.querySelectorAll('.filter-chip');
        var cards = document.querySelectorAll('#project-grid .project-card');
        var countEl = document.getElementById('filter-count');

        chips.forEach(function(chip) {
          chip.addEventListener('click', function() {
            chips.forEach(function(c) { c.classList.remove('is-active'); c.setAttribute('aria-pressed', 'false'); });
            chip.classList.add('is-active');
            chip.setAttribute('aria-pressed', 'true');
            var filter = chip.dataset.filter;
            var visible = 0;
            cards.forEach(function(card) {
              var tags = (card.dataset.tags || '').split('|');
              var show = filter === 'all' || tags.indexOf(filter) !== -1;
              card.hidden = !show;
              if (show) visible++;
            });
            if (countEl) countEl.textContent = visible === 1 ? '1 project' : visible + ' projects';
            window.siteTrack && window.siteTrack('project_filter_click', { filter: filter });
          });
        });

        document.querySelectorAll('.project-card__toggle').forEach(function(btn) {
          btn.addEventListener('click', function() {
            var expanded = btn.getAttribute('aria-expanded') === 'true';
            var panelId = btn.getAttribute('aria-controls');
            var panel = document.getElementById(panelId);
            btn.setAttribute('aria-expanded', String(!expanded));
            btn.textContent = expanded ? 'Show details' : 'Hide details';
            if (panel) panel.hidden = expanded;
          });
        });
      })();
    </script>`
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
      ${projectSubnavHtml(project)}
      <section class="project-body site-shell prose-shell">
        ${project.sections.map((section) => `<h2 id="section-${slugify(section.heading)}">${escapeHtml(section.heading)}</h2>
          ${(section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
          ${section.bullets ? `<ul>${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>` : ''}
          ${(section.artifacts || []).map(artifactFigure).join('')}`).join('')}
        ${visibleLinks.length > 0 ? `<h2 id="project-materials">Materials</h2>
          <ul class="action-list action-list--stacked">
            ${visibleLinks.map((l) => `<li>
              <a class="resource-link" ${linkAttrs(l.href.startsWith('/') ? routeHref(l.href) : withBase(l.href))} data-track="${l.href.startsWith('/assets/') ? 'deck_download' : 'dataset_click'}">${escapeHtml(l.label)}</a>
              ${l.note ? `<span class="action-note">${escapeHtml(l.note)}</span>` : ''}
            </li>`).join('')}
          </ul>` : ''}
      </section>
    </article>
    <script>
      (function() {
        var subnav = document.querySelector('.project-subnav');
        if (!subnav) return;
        var links = subnav.querySelectorAll('.project-subnav__link');
        var sections = Array.from(links).map(function(a) {
          var id = a.getAttribute('href').replace('#', '');
          return document.getElementById(id);
        }).filter(Boolean);
        if (!sections.length) return;
        var observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            var id = entry.target.id;
            links.forEach(function(a) {
              a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
            });
          });
        }, { rootMargin: '-20% 0px -70% 0px' });
        sections.forEach(function(s) { observer.observe(s); });
      })();
    </script>`
  });
}

function writingPage() {
  return layout({
    route: '/writing',
    title: 'Writing',
    description: 'Published writing and public scholarship by Reese Hollister — historical essays, peer-reviewed articles, presentations, and public-facing history work.',
    body: `<section class="page-hero site-shell">
      <p class="section-kicker">Writing</p>
      <h1>Writing</h1>
      <p class="page-lead">Published work spanning historical method, colonial institutions, postcolonial Africa, and public-facing scholarship.</p>
      <p>My writing moves between academic venues and public formats. Peer-reviewed work tends toward close argumentation and archival grounding. Public writing — including the Historical Method Man channel — aims to make historical thinking legible to an audience that did not choose to study it.</p>
    </section>
    <section class="site-shell">
      <div class="writing-categories">
        <article class="writing-category">
          <div class="writing-category__head">
            <p class="section-kicker">Academic</p>
            <h3>Peer-reviewed articles</h3>
            <p>Published in refereed history journals across topics including colonial photography, medieval queer history, and anti-apartheid political violence.</p>
          </div>
          <div class="writing-category__body">
            ${publicationList()}
          </div>
        </article>
        <article class="writing-category">
          <div class="writing-category__head">
            <p class="section-kicker">Conference &amp; workshop</p>
            <h3>Presentations</h3>
            <p>Research presentations spanning historical method, colonialism, Arabic pedagogy, tutoring research, and postcolonial African digital history.</p>
          </div>
          <div class="writing-category__body">
            <ul class="action-list action-list--stacked">
              <li><a class="resource-link" href="https://sites.google.com/ncsu.edu/reese/history-research" target="_blank" rel="noreferrer" data-track="youtube_click">View public presentations archive</a>
                <span class="action-note">Archived on the original NCSU public site, including digital-history and tutoring-research presentation work.</span></li>
            </ul>
          </div>
        </article>
        <article class="writing-category">
          <div class="writing-category__head">
            <p class="section-kicker">Video &amp; digital</p>
            <h3>Public scholarship</h3>
            <p>The Historical Method Man channel translates historical method for audiences beyond the seminar room — 218,000+ views, 1,700+ subscribers.</p>
          </div>
          <div class="writing-category__body">
            <ul class="action-list action-list--stacked">
              <li><a class="resource-link" href="https://www.youtube.com/channel/UCCRhHuIxYd3wyzYuaCNH3AA/" target="_blank" rel="noreferrer" data-track="youtube_click">Watch the channel</a>
                <span class="action-note">Historical Method Man — YouTube channel on how historians work.</span></li>
            </ul>
          </div>
        </article>
        <article class="writing-category">
          <div class="writing-category__head">
            <p class="section-kicker">Morocco, 2023–24</p>
            <h3>Fieldwork dispatches</h3>
            <p>Documentation, teaching materials, and research notes from the Fulbright year — archived on the original NCSU public site.</p>
          </div>
          <div class="writing-category__body">
            <ul class="action-list action-list--stacked">
              <li><a class="resource-link" href="https://sites.google.com/ncsu.edu/reese/welcome?pli=1" target="_blank" rel="noreferrer">View Morocco archive</a>
                <span class="action-note">Fieldwork documentation, lesson plans, and research materials from 2023–2024.</span></li>
            </ul>
          </div>
        </article>
      </div>
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
    </section>
    <section class="site-shell teaching-thesis-section">
      <blockquote class="teaching-thesis">
        <p>The most important outcome of a teaching session is not a better draft. It is a student who understands why the draft got better — and who can make that happen again without me.</p>
        <cite>On teaching and learning support</cite>
      </blockquote>
    </section>
    <section class="site-shell">
      <p>My teaching work spans one-on-one writing consultation, language instruction in Arabic, and teaching support in political science and international studies. What ties them together is a preoccupation with explanation — with what it takes for a student to stop pretending they understand something and actually get there.</p>
      <p>I treat every teaching interaction as a diagnostic problem. What is the student trying to do? Where exactly does the work break down? What would it look like for them to be able to do it on their own? The goal is not to fix the paper — it is to close the gap between where the student is and where the writing needs to be.</p>
    </section>
    <section class="site-shell">
      ${sectionHeading('Roles', 'Teaching and consultation roles', 'Experience across writing support, language instruction, and political science pedagogy.')}
      <div class="resume-highlight-grid">${teachingRoles.map((role) => `<article class="resume-card">
        <h3>${escapeHtml(role.title)}</h3>
        <p class="project-card__meta">${escapeHtml(role.org)} &#8212; ${escapeHtml(role.period)}</p>
        <p>${escapeHtml(role.summary)}</p>
        <ul>${role.skills.map((skill) => `<li>${escapeHtml(skill)}</li>`).join('')}</ul>
      </article>`).join('')}</div>
    </section>
    <section class="site-shell">
      ${sectionHeading('Arabic', 'Arabic instruction', 'Language teaching grounded in script literacy, morphology, and classroom routine.')}
      <p>Arabic instruction has been part of my work since my Fulbright year in Morocco. My approach treats early Arabic literacy as a design problem: learners struggle not because the language is impossible, but because the learning materials rarely make the system visible.</p>
      <p>Huruf La'b emerged from this diagnosis — a tactile learning system that turns abstract script structure into something a learner can handle, rearrange, and test physically.</p>
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
      <ul class="home-hero__links">
        <li><a href="mailto:reesewhollister@gmail.com" data-track="email_click">Get in touch</a></li>
        <li><a href="${routeHref('/teaching')}">Full teaching background</a></li>
      </ul>
    </section>
    <section class="site-shell">
      ${sectionHeading('Diagnosis', 'What kind of help do you need?', 'Answer two questions to find the right session type.')}
      ${coachingQuizHtml()}
    </section>
    <section class="site-shell">
      ${sectionHeading('Services', 'What I help with', 'Each area draws on the same core skill: finding what a piece of writing is really trying to do, and helping you get it there.')}
      <div class="pillars-grid">${coachingServices.map((service) => `<article class="pillar-card"><h3>${escapeHtml(service.title)}</h3><p>${escapeHtml(service.description)}</p></article>`).join('')}</div>
    </section>
    <section class="site-shell">
      ${sectionHeading('How it works', 'How sessions work', 'Sessions are designed around the specific problem, not a generic formula.')}
      ${sessionFlowHtml()}
    </section>
    <section class="site-shell">
      ${sectionHeading('Contact', 'Book a session', 'Reach out to discuss your project and check availability.')}
      <div class="contact-grid contact-grid--linear"><article class="contact-card"><h3>Get in touch</h3><p>Send an email with a short description of what you are working on, your timeline, and whether you are looking for a one-time session or ongoing support.</p><ul class="action-list"><li><a class="action-link" href="mailto:reesewhollister@gmail.com" data-track="coaching_book_click">reesewhollister@gmail.com</a><span class="action-note">Primary contact. I respond within one to two business days.</span></li></ul></article></div>
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
      <div class="contact-grid contact-grid--linear">${contactMethods.filter((method) => method.available).map((method) => `<article class="contact-card"><p class="section-kicker">${escapeHtml(method.label)}</p><h3><a ${linkAttrs(withBase(method.href))} data-track="email_click">${escapeHtml(method.value)}</a></h3><p>${escapeHtml(method.note)}</p><div class="action-list"><a class="resource-link" ${linkAttrs(withBase(method.href))} data-track="email_click">${method.href.startsWith('mailto:') ? 'Send email' : 'Open profile'}</a></div></article>`).join('')}</div>
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
    '/assets/ui/chefchaouen-01.jpg',
    '/assets/ui/chefchaouen-02.jpg',
    '/assets/ui/chefchaouen-03.jpg',
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

function writeSupportFiles(renderedPages) {
  const sitemapUrls = renderedPages
    .map(([route]) => route)
    .filter((route) => route !== '/404')
    .map((route) => `  <url><loc>${escapeHtml(canonicalFor(route))}</loc></url>`)
    .join('\n');

  fs.writeFileSync(
    path.join(distDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`
  );

  fs.writeFileSync(
    path.join(distDir, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', siteUrl).toString()}\n`
  );
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
  writeSupportFiles(renderedPages);
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
    '.txt': 'text/plain; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.xml': 'application/xml; charset=utf-8',
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
