/* explore.js — Atlas, Countries, Networks, Sources views
   Reads window.DATA (set by app.js) and loads geo/viz data independently. */
(function (global) {
  const VIZ_FONT = '"Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';
  const GEO_ALIAS = {
    "Democratic Republic of the Congo (Zaire)": "Democratic Republic of the Congo",
    "Congo": "Republic of the Congo",
    "Tanzania": "United Republic of Tanzania",
    "Guinea-Bissau": "Guinea Bissau",
  };

  const esc = s => (s == null ? "" : String(s).replace(/[&<>"']/g,
    c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])));

  let _geoReady = false;
  let _charts = [];

  function disposeCharts() {
    _charts.forEach(c => { try { c.dispose(); } catch (e) {} });
    _charts = [];
  }

  function chartDiv(container, height) {
    const d = document.createElement("div");
    d.className = "vchart";
    d.style.height = height;
    container.appendChild(d);
    const inst = echarts.init(d, "portfolio");
    _charts.push(inst);
    let t;
    window.addEventListener("resize", () => {
      clearTimeout(t);
      t = setTimeout(() => { try { inst.resize(); } catch (e) {} }, 120);
    });
    return inst;
  }

  function ensureGeo() {
    if (_geoReady) return Promise.resolve();
    return fetch("data/africa.geo.json").then(r => r.json())
      .then(g => { echarts.registerMap("africa", g); _geoReady = true; });
  }

  // Compute per-country per-year active airline count from window.DATA
  function buildCountryYearCounts() {
    const data = window.DATA || [];
    const END = 1998;
    const byCountry = {};
    data.forEach(a => {
      if (!a.year_founded) return;
      const endY = a.year_ceased ?? END;
      if (!byCountry[a.country]) byCountry[a.country] = {};
      for (let y = a.year_founded; y <= Math.min(endY, END); y++) {
        byCountry[a.country][y] = (byCountry[a.country][y] || 0) + 1;
      }
    });
    return byCountry;
  }

  // ================================================================= ATLAS
  function renderAtlas(view) {
    const data = window.DATA || [];
    const END = 1998;
    const nCountries = new Set(data.map(a => a.country).filter(Boolean)).size;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    view.innerHTML = `
      <div class="atlas-wrap">
        <div class="atlas-header">
          <div class="atlas-kickers">
            <span class="atlas-kicker"><b>${data.length}</b> airlines</span>
            <span class="atlas-kicker"><b>${nCountries}</b> countries</span>
            <span class="atlas-kicker"><b>1910–1998</b></span>
          </div>
          <p class="atlas-byline">
            African aviation was shaped less by geography than by colonial structure — and the data shows it.
            Watch the network grow: slowly through the colonial era, then surging after 1960.
          </p>
          ${prefersReduced ? `<p class="atlas-note">Autoplay is paused — use the timeline controls below to step through years.</p>` : ""}
        </div>
        <div id="atlas-chart-area"></div>
        <p class="atlas-note">
          Shading = airlines headquartered in each country. Click any country to compare it in
          <a href="#/countries">Countries</a>. Data ends at Guttery's 1998 survey horizon.
        </p>
      </div>`;

    ensureGeo().then(() => {
      const area = document.getElementById("atlas-chart-area");
      if (!area) return;

      const byCountry = buildCountryYearCounts();
      const countries = Object.keys(byCountry);
      const years = [];
      for (let y = 1920; y <= END; y++) years.push(y);

      let maxCount = 0;
      countries.forEach(c => Object.values(byCountry[c]).forEach(v => { if (v > maxCount) maxCount = v; }));
      maxCount = Math.max(1, maxCount);

      const countryPower = {};
      data.forEach(a => { if (a.country) countryPower[a.country] = a.colonial_power || "Unknown"; });
      const geoToDb = {};
      Object.entries(GEO_ALIAS).forEach(([db, geo]) => { geoToDb[geo] = db; });

      const options = years.map(y => ({
        title: { text: String(y) },
        series: [{
          data: countries.map(c => ({
            name: GEO_ALIAS[c] || c,
            value: byCountry[c][y] || 0,
          })),
        }],
      }));

      const inst = chartDiv(area, "600px");
      inst.setOption({
        baseOption: {
          animation: false,
          timeline: {
            axisType: "category", data: years,
            autoPlay: !prefersReduced, playInterval: 240,
            currentIndex: 0, bottom: 8, left: 40, right: 40,
            label: { interval: 9, fontSize: 11 },
            checkpointStyle: { color: "#006191" },
            controlStyle: { color: "#006191", borderColor: "#006191" },
          },
          title: {
            left: "center", top: 8,
            textStyle: { fontSize: 20, fontFamily: VIZ_FONT, color: "#281d15", fontWeight: "700" },
            subtext: "Active airlines by country — darker = more airlines",
            subtextStyle: { color: "rgba(40,29,21,.6)", fontSize: 12, fontFamily: VIZ_FONT },
          },
          tooltip: {
            formatter: p => {
              if (!p || !p.name) return "";
              const dbName = geoToDb[p.name] || p.name;
              const power = countryPower[dbName] || "—";
              const count = (p.data && p.data.value != null) ? p.data.value : 0;
              if (count === 0) return `<b>${esc(p.name)}</b><br>No airlines recorded`;
              return `<b>${esc(p.name)}</b><br>${count} airline(s) active` +
                `<br><span style="color:rgba(40,29,21,.6)">Colonial power: ${esc(power)}</span>` +
                `<br><span style="color:#006191;font-size:11px">Click to explore this country →</span>`;
            },
          },
          visualMap: {
            type: "continuous", min: 0, max: maxCount,
            left: 16, bottom: 80, calculable: true,
            text: ["more airlines", "fewer"],
            inRange: { color: ["#f4e7d6", "#d5e9f0", "#89c0d5", "#3b88a8", "#006191"] },
            textStyle: { fontSize: 11, fontFamily: VIZ_FONT },
          },
          series: [{
            type: "map", map: "africa", roam: false,
            label: { show: false },
            emphasis: {
              label: { show: true, fontSize: 10, fontFamily: VIZ_FONT },
              itemStyle: { areaColor: "#f7941d" },
            },
            itemStyle: { areaColor: "#f9efe2", borderColor: "#d8c6ad", borderWidth: 0.6 },
            data: [],
          }],
        },
        options,
      });

      // click a country → open Countries view with that country pre-selected
      inst.on("click", p => {
        if (!p || !p.name) return;
        const dbName = geoToDb[p.name] || p.name;
        location.hash = "#/countries/" + encodeURIComponent(dbName);
      });
    });
  }

  // ============================================================== COUNTRIES
  function renderCountries(view, preselected) {
    const data = window.DATA || [];
    const allCountries = Array.from(new Set(data.map(a => a.country).filter(Boolean))).sort();
    const selected = new Set(preselected && allCountries.includes(preselected) ? [preselected] : []);
    const PALETTE = ["#006191", "#9e1c1f", "#61692d"];

    function statsFor(country) {
      const airlines = data.filter(a => a.country === country);
      const powers = {}, decols = {};
      airlines.forEach(a => {
        if (a.colonial_power) powers[a.colonial_power] = (powers[a.colonial_power] || 0) + 1;
        if (a.decolonization) decols[a.decolonization] = (decols[a.decolonization] || 0) + 1;
      });
      return {
        total: airlines.length,
        active: airlines.filter(a => a.active).length,
        stubs: airlines.filter(a => a.is_stub).length,
        power: Object.entries(powers).sort((a, b) => b[1] - a[1])[0]?.[0] || "—",
        decol: Object.entries(decols).sort((a, b) => b[1] - a[1])[0]?.[0] || "—",
      };
    }

    function buildYearSeries(countriesList) {
      const byCountry = buildCountryYearCounts();
      return countriesList.map(c => {
        const vals = [];
        for (let y = 1920; y <= 1998; y++) vals.push(byCountry[c] ? (byCountry[c][y] || 0) : 0);
        return { country: c, vals };
      });
    }

    function refresh() {
      const sel = Array.from(selected);
      const statsEl = document.getElementById("country-stats");
      const chartEl = document.getElementById("country-chart");
      if (!statsEl || !chartEl) return;

      statsEl.innerHTML = sel.length === 0
        ? `<p style="color:rgba(40,29,21,.6);font-size:14px">Select up to three countries to compare timelines and stats.</p>`
        : `<div class="country-stats-area">${sel.map((c, i) => {
            const s = statsFor(c);
            return `<div class="country-card" style="border-top-color:${PALETTE[i]}">
              <h3>${esc(c)}</h3>
              <div class="country-stats-row">
                <span><b>${s.total}</b> airlines</span>
                <span><b>${s.active}</b> active 1998</span>
                ${s.stubs ? `<span><b>${s.stubs}</b> stubs</span>` : ""}
              </div>
              <div class="country-meta-row">
                <span>Colonial power: <b>${esc(s.power)}</b></span>
                <span>Decolonization: <b>${esc(s.decol)}</b></span>
              </div>
            </div>`;
          }).join("")}</div>`;

      disposeCharts();
      if (sel.length > 0) {
        const series = buildYearSeries(sel);
        const years = [];
        for (let y = 1920; y <= 1998; y++) years.push(String(y));
        const inst = chartDiv(chartEl, "340px");
        inst.setOption({
          title: { text: "Active airlines per year", left: "center",
            textStyle: { fontSize: 14, fontFamily: VIZ_FONT } },
          tooltip: { trigger: "axis" },
          legend: { bottom: 0 },
          grid: { left: 52, right: 28, top: 40, bottom: 44 },
          xAxis: { type: "category", data: years, axisLabel: { interval: 9 } },
          yAxis: { type: "value", name: "Active airlines",
            splitLine: { lineStyle: { color: "#efe2d2" } } },
          series: series.map((s, i) => ({
            name: s.country, type: "line", smooth: false, showSymbol: false,
            data: s.vals, itemStyle: { color: PALETTE[i] }, lineStyle: { width: 2.5 },
            markLine: i === 0 ? {
              silent: true, symbol: "none",
              lineStyle: { color: "#9e1c1f", type: "dashed" },
              data: [{ xAxis: "1957" }, { xAxis: "1960" }],
              label: { formatter: p => p.value === "1957" ? "Ghana\nindep." : "1960\nwave",
                color: "#9e1c1f", fontSize: 9 },
            } : undefined,
          })),
        });
      } else {
        chartEl.innerHTML = "";
      }
    }

    view.innerHTML = `
      <div class="explore-wrap">
        <aside class="explore-sidebar">
          <p class="explore-sidebar__label">Select up to three countries</p>
          <input type="search" id="country-search" class="country-search-input"
            placeholder="Search countries…" autocomplete="off">
          <div class="country-list" id="country-list"></div>
        </aside>
        <div class="explore-main">
          <div id="country-stats"></div>
          <div id="country-chart"></div>
        </div>
      </div>`;

    const listEl = document.getElementById("country-list");
    const searchEl = document.getElementById("country-search");

    function renderList(filter) {
      const fil = allCountries.filter(c => !filter || c.toLowerCase().includes(filter.toLowerCase()));
      listEl.innerHTML = fil.map(c => {
        const isSel = selected.has(c);
        const idx = Array.from(selected).indexOf(c);
        const color = isSel ? PALETTE[idx] : "";
        return `<button class="country-list-item${isSel ? " selected" : ""}"
          data-country="${esc(c)}"
          style="${isSel ? `border-left-color:${color};background:${color}22` : ""}">
          ${esc(c)}</button>`;
      }).join("");
      listEl.querySelectorAll(".country-list-item").forEach(btn => {
        btn.addEventListener("click", () => {
          const c = btn.dataset.country;
          if (selected.has(c)) { selected.delete(c); }
          else if (selected.size < 3) { selected.add(c); }
          renderList(searchEl.value);
          refresh();
        });
      });
    }

    searchEl.addEventListener("input", () => renderList(searchEl.value));
    renderList("");
    refresh();
  }

  // ============================================================== NETWORKS
  function renderNetworks(view) {
    const data = window.DATA || [];
    const SCOPES = ["Domestic", "Regional", "Intercontinental"];
    let currentScope = "Regional";

    function computeHubs(scope) {
      const hubCounts = {}, hubCountry = {};
      data.filter(a => a.scopes && a.scopes.includes(scope)).forEach(a => {
        const base = a.detail && a.detail.base_city;
        if (!base) return;
        hubCounts[base] = (hubCounts[base] || 0) + 1;
        hubCountry[base] = a.country;
      });
      return Object.entries(hubCounts)
        .sort((a, b) => b[1] - a[1]).slice(0, 25)
        .map(([city, count]) => ({ city, count, country: hubCountry[city] }));
    }

    function scopeTotals() {
      return SCOPES.map(s => {
        const n = data.filter(a => a.scopes && a.scopes.includes(s)).length;
        const hubs = new Set(data.filter(a => a.scopes && a.scopes.includes(s))
          .map(a => a.detail && a.detail.base_city).filter(Boolean)).size;
        return { scope: s, airlines: n, hubs };
      });
    }

    const totals = scopeTotals();

    view.innerHTML = `
      <div class="explore-full">
        <div class="network-scope-filter">
          ${SCOPES.map((s, i) => {
            const t = totals[i];
            return `<button class="network-scope-btn${s === currentScope ? " active" : ""}" data-scope="${s}">
              ${s} <span class="scope-count">${t.airlines}</span>
            </button>`;
          }).join("")}
        </div>
        <div class="network-caveat">
          <b>Data note:</b> Hub data comes from carrier base-city records — carriers with a documented
          base city who were active during the survey period (1910–1998). This reflects carrier geography,
          not confirmed scheduled services or route-opening dates.
        </div>
        <div id="network-chart"></div>
        <div id="network-table"></div>
      </div>`;

    function renderScope(scope) {
      const hubs = computeHubs(scope);
      const chartEl = document.getElementById("network-chart");
      const tableEl = document.getElementById("network-table");
      if (!chartEl || !tableEl) return;

      disposeCharts();

      if (!hubs.length) {
        chartEl.innerHTML = `<p class="muted" style="text-align:center;padding:40px">No hub data.</p>`;
        tableEl.innerHTML = "";
        return;
      }

      const h = Math.max(260, hubs.length * 24) + "px";
      const inst = chartDiv(chartEl, h);
      inst.setOption({
        title: {
          text: `Top hubs by ${scope.toLowerCase()} service`,
          subtext: "Carriers with a recorded base city — active at any point 1910–1998",
          left: "center",
          textStyle: { fontSize: 14, fontFamily: VIZ_FONT },
          subtextStyle: { color: "rgba(40,29,21,.6)", fontSize: 11, fontFamily: VIZ_FONT },
        },
        tooltip: { trigger: "axis", axisPointer: { type: "shadow" },
          formatter: p => `<b>${esc(p[0].name)}</b><br>${p[0].value} carrier(s)` },
        grid: { left: 140, right: 56, top: 58, bottom: 16 },
        xAxis: { type: "value", name: "Carriers",
          splitLine: { lineStyle: { color: "#efe2d2" } } },
        yAxis: { type: "category", data: hubs.map(h => h.city), inverse: true,
          axisLabel: { fontSize: 11 } },
        series: [{ type: "bar", data: hubs.map(h => h.count),
          itemStyle: { color: "#006191" }, barMaxWidth: 24 }],
      });

      tableEl.innerHTML = `
        <table class="kv" style="max-width:520px;margin-top:14px">
          <thead><tr><th style="width:32px">#</th><th>Hub city</th><th>Country</th><th>Carriers</th></tr></thead>
          <tbody>
            ${hubs.map((h, i) => `<tr>
              <td style="color:rgba(40,29,21,.4)">${i + 1}</td>
              <td><b>${esc(h.city)}</b></td>
              <td>${esc(h.country || "—")}</td>
              <td>${h.count}</td>
            </tr>`).join("")}
          </tbody>
        </table>`;
    }

    view.querySelectorAll(".network-scope-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        view.querySelectorAll(".network-scope-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentScope = btn.dataset.scope;
        renderScope(currentScope);
      });
    });

    renderScope(currentScope);
  }

  // ============================================================== SOURCES
  function renderSources(view) {
    const data = window.DATA || [];
    const total = data.length;
    const stubs = data.filter(a => a.is_stub).length;
    const full = total - stubs;
    const noFounding = data.filter(a => !a.year_founded).length;
    const withFlags = data.filter(a => a.review_flags && a.review_flags.length).length;

    const flagCounts = {};
    data.forEach(a => (a.review_flags || []).forEach(f => {
      flagCounts[f] = (flagCounts[f] || 0) + 1;
    }));
    const topFlags = Object.entries(flagCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

    const stubByCountry = {};
    data.filter(a => a.is_stub).forEach(a => {
      if (a.country) stubByCountry[a.country] = (stubByCountry[a.country] || 0) + 1;
    });
    const topStubCountries = Object.entries(stubByCountry).sort((a, b) => b[1] - a[1]).slice(0, 8);

    const confidence = {};
    data.forEach(a => {
      const c = a.provenance && a.provenance.confidence;
      if (c) confidence[c] = (confidence[c] || 0) + 1;
    });

    const bar = (v, max, color) =>
      `<div class="bar-track"><div class="bar-fill" style="width:${Math.round(v/max*100)}%;${color ? `background:${color}` : ""}"></div></div>`;

    view.innerHTML = `
      <article class="page sources-page">
        <h1>Sources &amp; data quality</h1>
        <p>This encyclopedia is built on a scholarly principle:
        <strong>blanks are never estimated.</strong>
        Every field either contains a value from the source or is recorded as "Not stated."
        Uncertainty is tracked, not hidden.</p>

        <h2>Dataset completeness</h2>
        <div class="stats-hero" style="max-width:740px;margin-bottom:14px">
          <div class="stat-card">
            <div class="num">${total}</div>
            <div class="lab">Total airlines</div>
          </div>
          <div class="stat-card">
            <div class="num" style="color:#61692d">${full}</div>
            <div class="lab">Full records</div>
          </div>
          <div class="stat-card">
            <div class="num" style="color:#c98a2d">${stubs}</div>
            <div class="lab">Stubs — identity known, operational data pending</div>
          </div>
          <div class="stat-card">
            <div class="num" style="color:#9e1c1f">${noFounding}</div>
            <div class="lab">Missing founding year</div>
          </div>
        </div>
        <p style="font-size:13px;color:rgba(40,29,21,.6);margin:0 0 4px">${full} of ${total} full records (${Math.round(full/total*100)}%)</p>
        <div class="bar-track" style="max-width:420px;height:16px;margin-bottom:24px;border-radius:8px">
          <div class="bar-fill" style="width:${Math.round(full/total*100)}%;background:#61692d;border-radius:8px"></div>
        </div>

        ${topFlags.length ? `
        <h2>Fields most often flagged for scholarly review</h2>
        <p>${withFlags} entries carry at least one review flag — a signal that the classification is
        contested or awaiting sign-off, not that the field is wrong.</p>
        <div style="max-width:580px">
          ${topFlags.map(([f, n]) => `
            <div class="bar-row">
              <span class="blab" title="${esc(f)}">${esc(f)}</span>
              ${bar(n, topFlags[0][1])}
              <span class="bval">${n}</span>
            </div>`).join("")}
        </div>` : ""}

        ${topStubCountries.length ? `
        <h2>Countries with the most stub entries</h2>
        <p>Stub entries record an airline's identity — name, country, founding year where stated —
        while full operational data awaits extraction from the Guttery source.</p>
        <div style="max-width:580px">
          ${topStubCountries.map(([c, n]) => `
            <div class="bar-row">
              <span class="blab">${esc(c)}</span>
              ${bar(n, topStubCountries[0][1], "#c98a2d")}
              <span class="bval">${n}</span>
            </div>`).join("")}
        </div>` : ""}

        ${Object.keys(confidence).length ? `
        <h2>Provenance confidence distribution</h2>
        <div style="max-width:580px">
          ${Object.entries(confidence).sort((a, b) => b[1] - a[1]).map(([c, n]) => `
            <div class="bar-row">
              <span class="blab">${esc(c)}</span>
              ${bar(n, total)}
              <span class="bval">${n}</span>
            </div>`).join("")}
        </div>` : ""}

        <h2>What this data can and cannot tell you</h2>
        <ul>
          <li><strong>Can tell you:</strong> which airlines existed, roughly when they were founded
          and ceased, who controlled them, what colonial context shaped them, and what service scope
          they operated.</li>
          <li><strong>Cannot tell you:</strong> exact route histories — documented connections are
          inferred from carrier records, not flight schedules. Nor can it tell you precise fleet sizes
          across all years (Guttery records point-in-time snapshots), or post-1998 trajectories.</li>
          <li><strong>Use caution with:</strong> decolonization type classifications (scholarly
          judgments, contested cases flagged), founding years for stub entries, and fleet/employee
          figures for low-confidence entries.</li>
        </ul>
        <p style="margin-top:24px"><a href="#/">← Browse airlines</a> · <a href="#/about">Full methodology →</a></p>
      </article>`;
  }

  // ================================================================= RENDER
  function render(view, hash) {
    disposeCharts();
    if (!window.DATA) {
      view.innerHTML = `<div class="empty"><p>Loading data…</p></div>`;
      const poll = setInterval(() => {
        if (window.DATA) { clearInterval(poll); render(view, hash); }
      }, 80);
      return;
    }
    if (hash.startsWith("/countries")) {
      const country = decodeURIComponent((hash.replace(/^\/countries\/?/, "") || "")) || null;
      return renderCountries(view, country);
    }
    if (hash.startsWith("/networks")) return renderNetworks(view);
    if (hash.startsWith("/sources")) return renderSources(view);
    renderAtlas(view);
  }

  global.Atlas = { render };
})(window);
