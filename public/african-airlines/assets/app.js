/* app.js — data load, hash routing, browse + detail rendering */
(function () {
  const view = document.getElementById("view");
  const state = {
    all: [],
    byEntry: new Map(),
    selected: {},      // facetKey -> Set(values)
    query: "",
    sort: "name",
    collapsed: new Set(["government", "decade"]), // facets collapsed by default
  };

  // ---------- utils ----------
  const esc = s => (s == null ? "" : String(s).replace(/[&<>"']/g,
    c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])));
  const ns = '<span class="notstated">Not stated</span>';
  const val = v => (v == null || v === "" ? ns : esc(v));
  const num = v => (v == null ? ns : esc(v));

  function yearsLabel(a) {
    const f = a.year_founded || "?";
    const c = a.year_ceased || (a.active ? "—" : "?");
    return `${f}–${c}`;
  }

  // ---------- data ----------
  fetch("data/airlines.json")
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(data => {
      state.all = data;
      window.DATA = data;           // shared with the Visualize tab (viz.js)
      data.forEach(a => state.byEntry.set(a.entry, a));
      Search.build(data);
      const fc = document.getElementById("footer-stats");
      if (fc) fc.textContent = ` ${data.length} airlines across ${new Set(data.map(a => a.country)).size} countries.`;
      route();
    })
    .catch(err => {
      view.innerHTML = `<div class="empty"><h2>Couldn't load the dataset</h2>
        <p>${esc(String(err))}</p>
        <p class="muted">Run <code>python3 build/build_data.py</code>, then serve the folder with
        <code>python3 -m http.server</code> (opening the file directly via file:// won't load JSON).</p></div>`;
    });

  // ---------- routing ----------
  window.addEventListener("hashchange", route);
  function route() {
    const h = location.hash.replace(/^#/, "") || "/";
    setNav(h);
    if (h.startsWith("/a/")) return renderDetail(parseInt(h.slice(3), 10));
    if (h.startsWith("/atlas")) return Atlas.render(view, h);
    if (h.startsWith("/countries")) return Atlas.render(view, h);
    if (h.startsWith("/networks")) return Atlas.render(view, h);
    if (h.startsWith("/sources")) return Atlas.render(view, h);
    if (h.startsWith("/viz")) return Viz.render(view, h);
    if (h.startsWith("/stats")) return Stats.render(view, state.all);
    if (h.startsWith("/about")) return renderAbout();
    return renderBrowse();
  }
  function setNav(h) {
    const map = {
      browse: h === "/" || h.startsWith("/a/"),
      atlas: h.startsWith("/atlas"),
      countries: h.startsWith("/countries"),
      networks: h.startsWith("/networks"),
      sources: h.startsWith("/sources"),
      viz: h.startsWith("/viz"),
      stats: h.startsWith("/stats"),
      about: h.startsWith("/about"),
    };
    document.querySelectorAll(".site-nav a").forEach(a =>
      a.classList.toggle("active", !!map[a.dataset.nav]));
  }

  // ---------- browse ----------
  function currentResults() {
    let list = state.all;
    const searched = Search.run(state.query);
    if (searched) list = searched;
    list = Filters.applyFilters(list, state.selected);
    if (!searched) list = list.slice().sort(Filters.SORTS[state.sort]);
    return list;
  }

  function renderBrowse() {
    document.title = DEFAULT_TITLE;
    view.innerHTML = `
      <div class="browse">
        <aside class="filters" id="filters"></aside>
        <section>
          <div class="searchbar">
            <input type="search" id="q" placeholder="Search airlines, countries, hubs, people…" value="${esc(state.query)}">
            <select id="sort" title="Sort">
              <option value="name">Sort: Name</option>
              <option value="founded">Sort: Year founded</option>
              <option value="lifespan">Sort: Lifespan</option>
              <option value="country">Sort: Country</option>
            </select>
          </div>
          <div class="result-meta" id="meta"></div>
          <div id="results"></div>
        </section>
      </div>`;

    const q = document.getElementById("q");
    q.value = state.query;
    q.addEventListener("input", () => { state.query = q.value; refresh(); });
    const sortSel = document.getElementById("sort");
    sortSel.value = state.sort;
    sortSel.addEventListener("change", () => { state.sort = sortSel.value; refresh(); });
    refresh();
    // keep focus in the search box on rerender
    q.focus(); q.setSelectionRange(q.value.length, q.value.length);
  }

  function refresh() {
    const list = currentResults();
    renderFilters();
    renderMeta(list.length);
    renderCards(list);
  }

  function renderMeta(n) {
    const active = Object.values(state.selected).reduce((s, set) => s + set.size, 0);
    const m = document.getElementById("meta");
    if (!m) return;
    m.innerHTML = `<b>${n}</b> airline${n === 1 ? "" : "s"}` +
      (state.query ? ` matching “${esc(state.query)}”` : "") +
      (active ? ` · ${active} filter${active === 1 ? "" : "s"} active <button class="clearbtn" id="clear">Clear all</button>` : "");
    const c = document.getElementById("clear");
    if (c) c.addEventListener("click", () => { state.selected = {}; refresh(); });
  }

  function renderFilters() {
    const host = document.getElementById("filters");
    if (!host) return;
    const base = Search.run(state.query) || state.all;
    const counts = Filters.computeCounts(base, state.selected);
    host.innerHTML = Filters.FACETS.map(f => {
      const c = counts[f.key] || {};
      const vals = Object.keys(c).sort((a, b) => c[b] - c[a] || a.localeCompare(b));
      if (!vals.length) return "";
      const sel = state.selected[f.key] || new Set();
      const collapsed = state.collapsed.has(f.key);
      const rows = vals.map(v => `
        <label><input type="checkbox" data-f="${esc(f.key)}" value="${esc(v)}" ${sel.has(v) ? "checked" : ""}>
        <span>${esc(v)}</span><span class="cnt">${c[v]}</span></label>`).join("");
      return `<div class="facet ${collapsed ? "collapsed" : ""}" data-facet="${esc(f.key)}">
        <h3 data-toggle="${esc(f.key)}">${esc(f.label)}</h3>
        <div class="facet-body">${rows}</div></div>`;
    }).join("");

    host.querySelectorAll('input[type=checkbox]').forEach(cb =>
      cb.addEventListener("change", () => {
        const k = cb.dataset.f;
        if (!state.selected[k]) state.selected[k] = new Set();
        cb.checked ? state.selected[k].add(cb.value) : state.selected[k].delete(cb.value);
        if (state.selected[k].size === 0) delete state.selected[k];
        refresh();
      }));
    host.querySelectorAll("h3[data-toggle]").forEach(h =>
      h.addEventListener("click", () => {
        const k = h.dataset.toggle;
        state.collapsed.has(k) ? state.collapsed.delete(k) : state.collapsed.add(k);
        renderFilters();
      }));
  }

  function renderCards(list) {
    const host = document.getElementById("results");
    if (!host) return;
    if (!list.length) {
      host.innerHTML = `<div class="empty"><h2>No matches</h2><p>Try clearing a filter or search term.</p></div>`;
      return;
    }
    host.innerHTML = `<div class="cards">${list.map(cardHTML).join("")}</div>`;
  }

  function cardHTML(a) {
    const scope = a.scopes.map(s => `<span class="badge scope">${esc(s)}</span>`).join("");
    const status = a.active
      ? `<span class="badge active">Operating ’98</span>`
      : `<span class="badge ceased">Ceased</span>`;
    const stub = a.is_stub ? `<span class="badge stub">Stub</span>` : "";
    const flag = (a.review_flags && a.review_flags.length) ? `<span class="badge flag">⚑ Review</span>` : "";
    return `<a class="card" href="#/a/${a.entry}">
      <div class="cname">${esc(a.name)}</div>
      <div class="cmeta">${esc(a.country)} · <span class="cyears">${yearsLabel(a)}</span>${
        a.lifespan != null ? ` · ${a.lifespan} yr` : ""}</div>
      <div class="badges">${status}${stub}${flag}${scope}</div>
    </a>`;
  }

  // ---------- detail ----------
  const DEFAULT_TITLE = document.title;
  function renderDetail(entry) {
    const a = state.byEntry.get(entry);
    if (!a) { view.innerHTML = `<div class="empty"><h2>Not found</h2><p><a href="#/">Back to browse</a></p></div>`; return; }
    document.title = `${a.name} (${a.country}) — African Airlines Encyclopedia`;
    const d = a.detail || {};
    const p = a.provenance;

    const coreRows = [
      ["Country", val(a.country)],
      ["Former colonial power", val(a.colonial_power)],
      ["Settler / non-settler", val(a.settler)],
      ["Type of decolonization", val(a.decolonization)],
      ["Year founded", num(a.year_founded)],
      ["Year ceased", a.year_ceased != null ? num(a.year_ceased) : (a.active ? "Still operating (1998)" : ns)],
      ["Lifespan", a.lifespan != null ? `${a.lifespan} years` : ns],
      ["Ownership model", val(a.ownership)],
      ["Government involvement", val(a.government)],
      ["Fleet size", num(a.fleet_size)],
      ["Number of employees", num(a.employees)],
      ["Domestic service", a.scopes.includes("Domestic") ? "Yes" : (d ? "No" : ns)],
      ["Regional service", a.scopes.includes("Regional") ? "Yes" : "No"],
      ["Intercontinental service", a.scopes.includes("Intercontinental") ? "Yes" : "No"],
    ].map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join("");

    const detailRows = [
      ["Base / hub", val(d.base_city)],
      ["Aircraft types", val(d.aircraft)],
      ["Key people", val(d.people)],
      ["Predecessor", val(d.predecessor)],
      ["Successor", val(d.successor)],
      ["Fate", val(d.fate)],
      ["National carrier", val(d.national_carrier)],
    ].map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join("");

    const dest = renderDestinations(a.destinations);
    const prov = renderProvenance(a, p);
    const cite = citation(a, p);
    const reviewBanner = (a.review_flags && a.review_flags.length)
      ? `<div class="review-note">⚑ This entry has <b>${a.review_flags.length}</b> field(s) flagged for scholarly review: ${a.review_flags.map(esc).join(", ")}. See the provenance panel.</div>`
      : "";

    view.innerHTML = `
      <a class="detail-back" href="#/">← Back to browse</a>
      <div class="detail-head">
        <h1>${esc(a.name)}</h1>
        <div class="sub">${esc(a.country)} · ${yearsLabel(a)}${a.is_stub ? " · <em>stub — operational data pending</em>" : ""}</div>
        <div class="badges">
          ${a.active ? `<span class="badge active">Operating ’98</span>` : `<span class="badge ceased">Ceased</span>`}
          ${a.scopes.map(s => `<span class="badge scope">${esc(s)}</span>`).join("")}
          ${a.is_stub ? `<span class="badge stub">Stub</span>` : ""}
        </div>
        ${reviewBanner}
      </div>
      <div class="detail-grid">
        <div>
          ${d.summary ? `<div class="panel"><h2>Summary</h2><p class="summary">${esc(d.summary)}</p></div>` : ""}
          <div class="panel"><h2>Core record (16 fields)</h2><table class="kv">${coreRows}</table></div>
          <div class="panel"><h2>Detail</h2><table class="kv">${detailRows}</table></div>
          ${dest}
        </div>
        <div>
          ${prov}
          <div class="panel"><h2>Cite this entry</h2>${cite}</div>
        </div>
      </div>`;

    const cb = view.querySelector(".copybtn");
    if (cb) cb.addEventListener("click", () => {
      navigator.clipboard.writeText(cb.dataset.cite).then(() => {
        cb.textContent = "Copied!"; setTimeout(() => (cb.textContent = "Copy"), 1500);
      });
    });
  }

  function renderDestinations(dests) {
    if (!dests || !dests.length) return "";
    const order = ["Domestic", "Regional", "Intercontinental"];
    const groups = {};
    dests.forEach(x => (groups[x.scope || "Other"] ||= []).push(x));
    const blocks = order.concat(Object.keys(groups).filter(k => !order.includes(k)))
      .filter(k => groups[k])
      .map(k => `<div class="dest-group"><h4>${esc(k)} (${groups[k].length})</h4>
        <div class="dest-list">${groups[k].map(x =>
          `<span class="chip">${esc(x.city)}${x.city_country ? ` <span class="cc">· ${esc(x.city_country)}</span>` : ""}</span>`
        ).join("")}</div></div>`).join("");
    return `<div class="panel"><h2>Destinations (${dests.length})</h2>${blocks}</div>`;
  }

  function renderProvenance(a, p) {
    if (!p) return `<div class="panel"><h2>Provenance</h2><p class="muted" style="font-size:13px">No per-field provenance recorded for this entry yet.</p></div>`;
    const src = [p.source, p.book_page ? `p. ${esc(p.book_page)}` : null].filter(Boolean).join(", ");
    const fields = p.fields || {};
    const items = Object.keys(fields).map(k => {
      const m = fields[k] || {};
      return `<div class="prov-item">
        <span class="pf">${esc(k)}</span> <span class="lbl ${esc(m.label || "")}">${esc((m.label || "").replace(/_/g, " "))}</span>
        ${m.note ? `<div class="muted">${esc(m.note)}</div>` : ""}</div>`;
    }).join("");
    return `<div class="panel"><h2>Provenance</h2>
      ${src ? `<p style="font-size:13px;margin:0 0 6px"><b>Source:</b> ${src}</p>` : ""}
      ${p.confidence ? `<p style="font-size:13px;margin:0 0 10px"><b>Confidence:</b> ${esc(p.confidence)}</p>` : ""}
      ${items || '<p class="muted" style="font-size:13px">No field-level notes.</p>'}</div>`;
  }

  function citation(a, p) {
    const page = p && p.book_page ? `, p. ${p.book_page}` : "";
    const txt = `“${a.name}” (${a.country}). In Ben Guttery, Encyclopedia of African Airlines (Jefferson, NC: McFarland, 1995)${page}. Via From Colonies to Carriers dataset, ed. Reese Hollister.`;
    return `<div class="cite"><button class="copybtn" data-cite="${esc(txt)}">Copy</button><code>${esc(txt)}</code></div>`;
  }

  // ---------- about ----------
  function renderAbout() {
    document.title = "About — African Airlines Encyclopedia";
    view.innerHTML = `<article class="page">
      <h1>About this dataset</h1>
      <p><strong>From Colonies to Carriers</strong> is a structured, provenance-tracked encyclopedia of African
      airlines through 1998, rebuilt from Ben Guttery's <em>Encyclopedia of African Airlines</em> (Jefferson, NC:
      McFarland, 1995). Each airline is described by a 16-field core record, plus detail (base, aircraft, key people,
      predecessor/successor, fate), destinations, and per-field source provenance.</p>

      <h2>Method</h2>
      <p>Records were extracted from OCR scans of the printed encyclopedia and cross-checked against reference tables.
      A guiding rule governs every field: <strong>blanks are never estimated.</strong> Where Guttery did not state a
      value, the field is recorded as “Not stated” rather than guessed. Provenance labels on each entry distinguish
      values <em>extracted</em> from the source, values <em>derived</em> by documented method, fields <em>blank</em>
      in the source, and fields <em>flagged for review</em>.</p>

      <h2>Decolonization classifications</h2>
      <p>Each country carries a draft classification of its former colonial power, settler vs. non-settler status, and
      type of decolonization (negotiated / violent / mixed). These power the comparative analysis but are
      <strong>scholarly judgments, not facts in the source.</strong> Contested cases — including Kenya, Cameroon, and
      Cape Verde — are flagged <code>review:high</code> pending sign-off and should be cited with that caveat.</p>

      <h2>How to cite</h2>
      <div class="cite"><code>Reese Hollister, ed. From Colonies to Carriers: A Provenance-Tracked Dataset of African
      Airlines (1920–1998). Built from Ben Guttery, Encyclopedia of African Airlines (McFarland, 1995).</code></div>

      <h2>Limitations</h2>
      <p>Coverage ends at Guttery's 1995/1998 horizon. Stub entries (badged “Stub”) preserve an airline's identity
      while operational fields await extraction. Fleet sizes and founding dates are as stated by Guttery and reflect
      the data available to him.</p>

      <h2>Research behind this dataset</h2>
      <p>This encyclopedia is part of <em>From Colonies to Carriers</em>, a digital history project examining how
      colonial structure shaped African aviation. The working paper argues that ownership model, decolonization
      pathway, and settler status predict airline survival and route geography more than geography alone does.</p>
      <p><a href=”/projects/from-colonies-to-carriers/”>← Read the research project →</a></p>

      <p style=”margin-top:24px”><a href=”#/”>← Back to browse</a></p>
    </article>`;
  }
})();
