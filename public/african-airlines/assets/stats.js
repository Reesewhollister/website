/* stats.js — renders the statistics overview from data/stats.json */
(function (global) {
  const esc = s => (s == null ? "" : String(s).replace(/[&<>"']/g,
    c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])));

  let cache = null;

  function render(view, airlines) {
    view.innerHTML = `<div class="empty">Loading statistics…</div>`;
    if (cache) return paint(view, cache);
    fetch("data/stats.json")
      .then(r => r.json())
      .then(s => { cache = s; paint(view, s); })
      .catch(() => { view.innerHTML = `<div class="empty"><h2>Statistics unavailable</h2>
        <p class="muted">Run <code>python3 build/build_data.py</code> to generate <code>data/stats.json</code>.</p></div>`; });
  }

  function bars(obj, opts = {}) {
    const entries = Object.entries(obj);
    if (!entries.length) return `<p class="muted">No data.</p>`;
    const max = Math.max(...entries.map(([, v]) => v));
    const suffix = opts.suffix || "";
    return entries.map(([k, v]) => `
      <div class="bar-row">
        <span class="blab" title="${esc(k)}">${esc(k)}</span>
        <span class="bar-track"><span class="bar-fill" style="width:${max ? (v / max * 100) : 0}%"></span></span>
        <span class="bval">${esc(v)}${suffix}</span>
      </div>`).join("");
  }

  function block(title, body) {
    return `<div class="panel"><h2>${esc(title)}</h2>${body}</div>`;
  }

  function paint(view, s) {
    const hero = [
      [s.total, "Airlines"],
      [Object.keys(s.by_country).length, "Countries"],
      [s.active_1998, "Operating in 1998"],
      [s.ceased, "Ceased"],
      [s.total_routes, "Route records"],
      [s.stubs, "Stub entries"],
    ].map(([n, l]) => `<div class="stat-card"><div class="num">${esc(n)}</div><div class="lab">${esc(l)}</div></div>`).join("");

    view.innerHTML = `
      <article class="page" style="max-width:none">
        <h1>Statistics</h1>
        <p class="muted">Aggregates across the full dataset. Survival is measured against Guttery's 1998 survey horizon.</p>
        <div class="stats-hero">${hero}</div>
        <div class="stat-blocks">
          ${block("Airlines by colonial power", bars(s.by_colonial_power))}
          ${block("By type of decolonization", bars(s.by_decolonization))}
          ${block("By settler status", bars(s.by_settler))}
          ${block("By ownership model", bars(s.by_ownership))}
          ${block("Foundings by decade", bars(s.foundings_by_decade))}
          ${block("Mean lifespan by decolonization (yrs)", bars(s.mean_lifespan_by_decolonization, { suffix: " yr" }))}
          ${block("Mean lifespan by settler status (yrs)", bars(s.mean_lifespan_by_settler, { suffix: " yr" }))}
          ${block("Top hub cities (by carriers served)", bars(s.top_hubs))}
          ${block("Top countries by airline count", bars(topN(s.by_country, 12)))}
        </div>
        <p style="margin-top:22px"><a href="#/">← Back to browse</a></p>
      </article>`;
  }

  function topN(obj, n) {
    return Object.fromEntries(Object.entries(obj).slice(0, n));
  }

  global.Stats = { render };
})(window);
