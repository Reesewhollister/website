/* explore.js — Unified Atlas: Time / Country / Network / Institution / Sources tabs */
(function (global) {
  const VIZ_FONT = '"Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';
  const GEO_ALIAS = {
    "Democratic Republic of the Congo (Zaire)": "Democratic Republic of the Congo",
    "Congo": "Republic of the Congo",
    "Tanzania": "United Republic of Tanzania",
    "Guinea-Bissau": "Guinea Bissau",
  };
  // reverse: geo name → db name
  const GEO_TO_DB = {};
  const DB_TO_GEO = {};
  Object.entries(GEO_ALIAS).forEach(([db, geo]) => { GEO_TO_DB[geo] = db; DB_TO_GEO[db] = geo; });

  const esc = s => (s == null ? "" : String(s).replace(/[&<>"']/g,
    c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])));

  let _geoReady = false;
  let _vizData = null;
  let _cityCoords = {};   // city name → [lng, lat]
  let _charts = [];
  let _playInterval = null;

  function disposeCharts() {
    if (_playInterval) { clearInterval(_playInterval); _playInterval = null; }
    _charts.forEach(c => { try { c.dispose(); } catch (_) {} });
    _charts = [];
  }

  function chartDiv(parent, height) {
    const d = document.createElement("div");
    d.className = "vchart";
    d.style.height = height;
    parent.appendChild(d);
    const inst = echarts.init(d, "portfolio");
    _charts.push(inst);
    let t;
    window.addEventListener("resize", () => {
      clearTimeout(t);
      t = setTimeout(() => { try { inst.resize(); } catch (_) {} }, 120);
    });
    return inst;
  }

  function ensureGeo() {
    if (_geoReady) return Promise.resolve();
    return fetch("data/africa.geo.json").then(r => r.json())
      .then(g => { echarts.registerMap("africa", g); _geoReady = true; });
  }

  function ensureViz() {
    if (_vizData) return Promise.resolve(_vizData);
    return fetch("data/viz.json").then(r => r.json()).then(d => {
      _vizData = d;
      const cities = (d.map && d.map.cities) || [];
      cities.forEach(c => {
        if (c.city && c.lng != null && c.lat != null) _cityCoords[c.city] = [c.lng, c.lat];
      });
      return d;
    });
  }

  function buildCountryYearCounts() {
    const data = window.DATA || [];
    const END = 1998;
    const out = {};
    data.forEach(a => {
      if (!a.year_founded || !a.country) return;
      const endY = Math.min(a.year_ceased ?? END, END);
      if (!out[a.country]) out[a.country] = {};
      for (let y = a.year_founded; y <= endY; y++) {
        out[a.country][y] = (out[a.country][y] || 0) + 1;
      }
    });
    return out;
  }

  // =========================================================== UNIFIED RENDER
  function render(view, hash) {
    disposeCharts();

    if (!window.DATA) {
      view.innerHTML = `<div class="empty"><p>Loading data…</p></div>`;
      const poll = setInterval(() => {
        if (window.DATA) { clearInterval(poll); render(view, hash); }
      }, 80);
      return;
    }

    // Determine initial tab
    let activeTab = "time";
    let preselected = null;
    if (hash.startsWith("/countries")) {
      activeTab = "country";
      const raw = hash.replace(/^\/countries\/?/, "");
      preselected = raw ? decodeURIComponent(raw) : null;
    } else if (hash.startsWith("/networks")) {
      activeTab = "network";
    } else if (hash.startsWith("/sources")) {
      activeTab = "sources";
    }

    const data = window.DATA;
    const nAirlines = data.length;
    const nCountries = new Set(data.map(a => a.country).filter(Boolean)).size;

    view.innerHTML = `
      <div class="atlas-container">
        <div class="atlas-topbar">
          <div class="atlas-kickers">
            <span class="atlas-kicker"><b>${nAirlines}</b> airlines</span>
            <span class="atlas-kicker"><b>${nCountries}</b> countries</span>
            <span class="atlas-kicker"><b>1910–1998</b></span>
          </div>
          <div class="atlas-tabs" role="tablist">
            <button class="atlas-tab${activeTab==="time"?" active":""}" data-tab="time">Time</button>
            <button class="atlas-tab${activeTab==="country"?" active":""}" data-tab="country">Country</button>
            <button class="atlas-tab${activeTab==="network"?" active":""}" data-tab="network">Network</button>
            <button class="atlas-tab${activeTab==="institution"?" active":""}" data-tab="institution">Institution</button>
            <button class="atlas-tab${activeTab==="sources"?" active":""}" data-tab="sources">Sources</button>
          </div>
        </div>
        <div id="atlas-content" class="atlas-content"></div>
      </div>`;

    function activateTab(tab, presel) {
      disposeCharts();
      view.querySelectorAll(".atlas-tab").forEach(b =>
        b.classList.toggle("active", b.dataset.tab === tab));
      const content = document.getElementById("atlas-content");
      if (!content) return;
      content.innerHTML = "";
      switch (tab) {
        case "time":        renderTimeTab(content); break;
        case "country":     renderCountryTab(content, presel); break;
        case "network":     renderNetworkTab(content); break;
        case "institution": renderInstitutionTab(content); break;
        case "sources":     renderSourcesTab(content); break;
      }
    }

    view.querySelectorAll(".atlas-tab").forEach(btn =>
      btn.addEventListener("click", () => activateTab(btn.dataset.tab, null)));

    activateTab(activeTab, preselected);
  }

  // ============================================================= TIME TAB
  function renderTimeTab(container) {
    container.innerHTML = `
      <div class="atlas-time">
        <div class="atlas-controls-bar">
          <div class="atlas-year-row">
            <span class="atlas-year-label">YEAR</span>
            <input type="range" class="atlas-year-slider" id="atlas-year-slider"
              min="1920" max="1998" step="1" value="1960">
            <span class="atlas-year-value" id="atlas-year-val">1960</span>
            <button class="atlas-play-btn" id="atlas-play-btn">▶ Play</button>
          </div>
          <div class="atlas-scope-row">
            <span class="atlas-scope-heading">Show:</span>
            <label class="atlas-scope-label"><input type="checkbox" checked data-scope="Domestic"> Domestic</label>
            <label class="atlas-scope-label"><input type="checkbox" checked data-scope="Regional"> Regional</label>
            <label class="atlas-scope-label"><input type="checkbox" checked data-scope="Intercontinental"> Intercontinental</label>
            <label class="atlas-scope-label atlas-scope-label--dim"><input type="checkbox" data-scope="routes"> Route arcs</label>
          </div>
        </div>
        <div id="atlas-map-area" class="atlas-map-area"></div>
        <div id="atlas-stat-row" class="atlas-stat-row"></div>
        <p class="atlas-map-legend">
          <span class="legend-dot" style="background:#006191"></span> Active hub city &nbsp;
          <span class="legend-dot" style="background:#61692d"></span> Founded this year &nbsp;
          <span class="legend-dot" style="background:#9e1c1f"></span> Ceased this year
          &nbsp;·&nbsp; Click a country to explore in Country tab.
        </p>
      </div>`;

    Promise.all([ensureGeo(), ensureViz()]).then(() => {
      const mapArea = document.getElementById("atlas-map-area");
      if (!mapArea) return;
      _initTimeChart(container, mapArea);
    });
  }

  function _initTimeChart(container, mapArea) {
    const data = window.DATA;
    const byCountry = buildCountryYearCounts();
    const countries = Object.keys(byCountry);

    let maxCount = 0;
    countries.forEach(c => Object.values(byCountry[c]).forEach(v => { if (v > maxCount) maxCount = v; }));
    maxCount = Math.max(1, maxCount);

    const countryPower = {};
    data.forEach(a => { if (a.country) countryPower[a.country] = a.colonial_power || "Unknown"; });

    let currentYear = 1960;
    let activeScopes = new Set(["Domestic", "Regional", "Intercontinental"]);

    function seriesData(year, scopes) {
      const countryData = countries.map(c => ({
        name: DB_TO_GEO[c] || c,
        value: byCountry[c][year] || 0,
      }));

      const activeCities = {};
      data.forEach(a => {
        if (!a.year_founded || a.year_founded > year) return;
        const endY = a.year_ceased ?? 1998;
        if (endY < year) return;
        if (scopes.size > 0 && a.scopes && a.scopes.length > 0 && !a.scopes.some(s => scopes.has(s))) return;
        const city = a.detail && a.detail.base_city;
        if (city && _cityCoords[city]) activeCities[city] = _cityCoords[city];
      });
      const cityData = Object.entries(activeCities).map(([city, coord]) => ({
        name: city, value: [...coord, 1],
      }));

      const foundedData = [];
      const ceasedData = [];
      data.forEach(a => {
        if (a.year_founded === year) {
          const city = a.detail && a.detail.base_city;
          if (city && _cityCoords[city]) foundedData.push({ name: a.name, value: [..._cityCoords[city], 1] });
        }
        if (a.year_ceased === year) {
          const city = a.detail && a.detail.base_city;
          if (city && _cityCoords[city]) ceasedData.push({ name: a.name, value: [..._cityCoords[city], 1] });
        }
      });

      return { countryData, cityData, foundedData, ceasedData };
    }

    function statCounts(year, scopes) {
      let total = 0, founded = 0, ceased = 0;
      const active = new Set();
      data.forEach(a => {
        if (a.year_founded === year) founded++;
        if (a.year_ceased === year) ceased++;
        if (!a.year_founded || a.year_founded > year) return;
        const endY = a.year_ceased ?? 1998;
        if (endY < year) return;
        if (scopes.size > 0 && a.scopes && a.scopes.length > 0 && !a.scopes.some(s => scopes.has(s))) return;
        total++;
        if (a.country) active.add(a.country);
      });
      return { total, countries: active.size, founded, ceased };
    }

    function updateStatRow(year) {
      const s = statCounts(year, activeScopes);
      const el = document.getElementById("atlas-stat-row");
      if (!el) return;
      el.innerHTML = `
        <div class="atlas-stat-card">
          <span class="atlas-stat-num">${s.total}</span>
          <span class="atlas-stat-lab">airlines active</span>
        </div>
        <div class="atlas-stat-card">
          <span class="atlas-stat-num">${s.countries}</span>
          <span class="atlas-stat-lab">countries served</span>
        </div>
        <div class="atlas-stat-card atlas-stat-green">
          <span class="atlas-stat-num">${s.founded}</span>
          <span class="atlas-stat-lab">founded this year</span>
        </div>
        <div class="atlas-stat-card atlas-stat-red">
          <span class="atlas-stat-num">${s.ceased}</span>
          <span class="atlas-stat-lab">ceased this year</span>
        </div>`;
    }

    const chart = chartDiv(mapArea, "520px");
    const { countryData, cityData, foundedData, ceasedData } = seriesData(currentYear, activeScopes);

    chart.setOption({
      animation: false,
      backgroundColor: "transparent",
      geo: {
        map: "africa", roam: false,
        itemStyle: { areaColor: "#f9efe2", borderColor: "#d8c6ad", borderWidth: 0.6 },
        emphasis: { itemStyle: { areaColor: "#f7941d" }, label: { show: false } },
        label: { show: false },
      },
      tooltip: {
        show: true,
        formatter: p => {
          if (!p || !p.name) return "";
          if (p.seriesId === "s-choropleth") {
            const dbName = GEO_TO_DB[p.name] || p.name;
            const power = countryPower[dbName] || "—";
            const count = p.data ? (p.data.value ?? 0) : 0;
            if (!count) return `<b>${esc(p.name)}</b><br><span style="opacity:.6">No airlines on record</span>`;
            return `<span style="font-family:${VIZ_FONT}"><b>${esc(p.name)}</b><br>${count} airline(s) active<br><span style="opacity:.65">${esc(power)}</span></span>`;
          }
          return `<span style="font-family:${VIZ_FONT};font-size:12px">${esc(p.name)}</span>`;
        },
      },
      visualMap: {
        type: "continuous", min: 0, max: maxCount,
        left: 12, bottom: 16, calculable: false,
        text: ["more airlines", "fewer"],
        inRange: { color: ["#f4e7d6", "#d5e9f0", "#89c0d5", "#3b88a8", "#006191"] },
        textStyle: { fontSize: 10, fontFamily: VIZ_FONT },
        seriesIndex: [0],
      },
      series: [
        {
          id: "s-choropleth",
          type: "map", map: "africa", geoIndex: 0,
          label: { show: false },
          emphasis: { label: { show: false } },
          data: countryData,
        },
        {
          id: "s-cities",
          type: "scatter", coordinateSystem: "geo",
          data: cityData,
          symbolSize: 5,
          itemStyle: { color: "#006191", opacity: 0.65 },
          zlevel: 2,
        },
        {
          id: "s-founded",
          type: "effectScatter", coordinateSystem: "geo",
          data: foundedData,
          symbolSize: 7,
          itemStyle: { color: "#61692d" },
          rippleEffect: { brushType: "fill", scale: 2.5, period: 1.5 },
          zlevel: 3,
        },
        {
          id: "s-ceased",
          type: "effectScatter", coordinateSystem: "geo",
          data: ceasedData,
          symbolSize: 7,
          itemStyle: { color: "#9e1c1f" },
          rippleEffect: { brushType: "fill", scale: 2.5, period: 1.5 },
          zlevel: 3,
        },
      ],
    });

    updateStatRow(currentYear);

    function updateAll(year) {
      const sd = seriesData(year, activeScopes);
      chart.setOption({
        series: [
          { id: "s-choropleth", data: sd.countryData },
          { id: "s-cities", data: sd.cityData },
          { id: "s-founded", data: sd.foundedData },
          { id: "s-ceased", data: sd.ceasedData },
        ],
      });
      updateStatRow(year);
    }

    // Click country → switch to Country tab with pre-selection
    chart.on("click", p => {
      if (p && p.seriesId === "s-choropleth" && p.name) {
        const dbName = GEO_TO_DB[p.name] || p.name;
        const countryBtn = document.querySelector('.atlas-tab[data-tab="country"]');
        if (countryBtn) countryBtn.click();
        // Wait for country tab to render, then pre-select
        setTimeout(() => {
          const clist = document.getElementById("country-list");
          if (clist) {
            const btn = clist.querySelector(`[data-country="${esc(dbName)}"]`);
            if (btn) btn.click();
          }
        }, 80);
      }
    });

    // Slider
    const slider = document.getElementById("atlas-year-slider");
    const yearVal = document.getElementById("atlas-year-val");
    if (slider) {
      slider.addEventListener("input", () => {
        currentYear = parseInt(slider.value, 10);
        if (yearVal) yearVal.textContent = currentYear;
        updateAll(currentYear);
      });
    }

    // Play / pause
    const playBtn = document.getElementById("atlas-play-btn");
    if (playBtn) {
      playBtn.addEventListener("click", () => {
        if (_playInterval) {
          clearInterval(_playInterval);
          _playInterval = null;
          playBtn.textContent = "▶ Play";
        } else {
          if (currentYear >= 1998) {
            currentYear = 1920;
            if (slider) slider.value = 1920;
            if (yearVal) yearVal.textContent = 1920;
          }
          playBtn.textContent = "⏸ Pause";
          _playInterval = setInterval(() => {
            currentYear++;
            if (currentYear > 1998) {
              clearInterval(_playInterval);
              _playInterval = null;
              playBtn.textContent = "▶ Play";
              return;
            }
            if (slider) slider.value = currentYear;
            if (yearVal) yearVal.textContent = currentYear;
            updateAll(currentYear);
          }, 240);
        }
      });
    }

    // Scope checkboxes
    container.querySelectorAll("[data-scope]").forEach(cb => {
      cb.addEventListener("change", () => {
        const scope = cb.dataset.scope;
        if (scope === "routes") return; // route arcs future work
        if (cb.checked) activeScopes.add(scope);
        else activeScopes.delete(scope);
        updateAll(currentYear);
      });
    });
  }

  // =========================================================== COUNTRY TAB
  function renderCountryTab(container, preselected) {
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
        ? `<p class="country-placeholder">Select up to three countries to compare timelines and statistics.</p>`
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

    container.innerHTML = `
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
          if (selected.has(c)) selected.delete(c);
          else if (selected.size < 3) selected.add(c);
          renderList(searchEl.value);
          refresh();
        });
      });
    }

    searchEl.addEventListener("input", () => renderList(searchEl.value));
    renderList("");
    refresh();
  }

  // =========================================================== NETWORK TAB
  function renderNetworkTab(container) {
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

    container.innerHTML = `
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
        chartEl.innerHTML = `<p class="muted" style="text-align:center;padding:40px">No hub data for this scope.</p>`;
        tableEl.innerHTML = "";
        return;
      }

      const h = Math.max(260, hubs.length * 24) + "px";
      const inst = chartDiv(chartEl, h);
      inst.setOption({
        title: {
          text: `Top hubs — ${scope.toLowerCase()} service`,
          subtext: "Carriers with a recorded base city, active any point 1910–1998",
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

    container.querySelectorAll(".network-scope-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".network-scope-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentScope = btn.dataset.scope;
        renderScope(currentScope);
      });
    });

    renderScope(currentScope);
  }

  // ======================================================== INSTITUTION TAB
  function renderInstitutionTab(container) {
    const data = window.DATA || [];

    // Group airlines by colonial power — at each year
    const powers = Array.from(new Set(data.map(a => a.colonial_power).filter(Boolean))).sort();
    const decolTypes = Array.from(new Set(data.map(a => a.decolonization).filter(Boolean))).sort();
    const END = 1998, START = 1920;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // For each power, airlines active per year
    function computePowerYear(year) {
      const counts = {};
      data.forEach(a => {
        if (!a.year_founded || a.year_founded > year) return;
        const endY = a.year_ceased ?? END;
        if (endY < year) return;
        const p = a.colonial_power || "Unknown";
        counts[p] = (counts[p] || 0) + 1;
      });
      return counts;
    }

    function computeDecolYear(year) {
      const counts = {};
      data.forEach(a => {
        if (!a.year_founded || a.year_founded > year) return;
        const endY = a.year_ceased ?? END;
        if (endY < year) return;
        const d = a.decolonization || "Not stated";
        counts[d] = (counts[d] || 0) + 1;
      });
      return counts;
    }

    function computeStateLinked(year) {
      // "State-linked" = airlines where decolonization type is not null/unknown
      // (i.e., their trajectory was shaped by a colonial/state transition)
      const active = data.filter(a => {
        if (!a.year_founded || a.year_founded > year) return false;
        const endY = a.year_ceased ?? END;
        return endY >= year;
      });
      const stateLinked = active.filter(a => a.colonial_power && a.colonial_power !== "None");
      const stateCountries = new Set(stateLinked.map(a => a.country).filter(Boolean));
      return { count: stateLinked.length, countries: stateCountries.size, total: active.length };
    }

    let currentYear = 1960;
    const POWER_COLORS = {
      "Britain": "#006191",
      "France": "#2d7a5f",
      "Portugal": "#8b5e2a",
      "Belgium": "#9e1c1f",
      "Italy": "#5b3a8b",
      "Spain": "#b07d2b",
      "Germany": "#3c6e3c",
      "Unknown": "rgba(40,29,21,.3)",
    };

    container.innerHTML = `
      <div class="atlas-institution">
        <div class="atlas-controls-bar">
          <div class="atlas-year-row">
            <span class="atlas-year-label">YEAR</span>
            <input type="range" class="atlas-year-slider" id="inst-year-slider"
              min="${START}" max="${END}" step="1" value="${currentYear}">
            <span class="atlas-year-value" id="inst-year-val">${currentYear}</span>
            <button class="atlas-play-btn" id="inst-play-btn">▶ Play</button>
          </div>
        </div>
        <div id="inst-stat-row" class="atlas-stat-row"></div>
        <div class="inst-charts-grid">
          <div>
            <p class="vsection">Active airlines by colonial power affiliation</p>
            <div id="inst-power-chart"></div>
          </div>
          <div>
            <p class="vsection">Active airlines by decolonization pathway</p>
            <div id="inst-decol-chart"></div>
          </div>
        </div>
        <p class="atlas-map-legend">
          Colonial power affiliation reflects the recorded historical colonial relationship, not current government policy.
          "State-linked" = airlines with a documented colonial-power connection (Britain, France, Portugal, etc.).
        </p>
      </div>`;

    function updateStatRow(year) {
      const { count, countries, total } = computeStateLinked(year);
      const el = document.getElementById("inst-stat-row");
      if (!el) return;
      el.innerHTML = `
        <div class="atlas-stat-card">
          <span class="atlas-stat-num">${count}</span>
          <span class="atlas-stat-lab">state-linked institutions</span>
        </div>
        <div class="atlas-stat-card">
          <span class="atlas-stat-num">${countries}</span>
          <span class="atlas-stat-lab">countries</span>
        </div>
        <div class="atlas-stat-card">
          <span class="atlas-stat-num">${total}</span>
          <span class="atlas-stat-lab">airlines on record</span>
        </div>`;
    }

    let powerChart = null, decolChart = null;

    function updateCharts(year) {
      const powerCounts = computePowerYear(year);
      const decolCounts = computeDecolYear(year);

      const pEntries = Object.entries(powerCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
      const dEntries = Object.entries(decolCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

      if (!powerChart) {
        const el = document.getElementById("inst-power-chart");
        if (el) powerChart = chartDiv(el, "280px");
      }
      if (!decolChart) {
        const el = document.getElementById("inst-decol-chart");
        if (el) decolChart = chartDiv(el, "280px");
      }

      if (powerChart) {
        powerChart.setOption({
          animation: false,
          grid: { left: 80, right: 40, top: 12, bottom: 12 },
          tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
          xAxis: { type: "value", splitLine: { lineStyle: { color: "#efe2d2" } } },
          yAxis: { type: "category", data: pEntries.map(e => e[0]).reverse(),
            axisLabel: { fontSize: 11 } },
          series: [{
            type: "bar", barMaxWidth: 20,
            data: pEntries.map(e => e[1]).reverse(),
            itemStyle: {
              color: p => POWER_COLORS[pEntries[pEntries.length - 1 - p.dataIndex]?.[0]] || "#006191"
            },
          }],
        });
      }

      if (decolChart) {
        decolChart.setOption({
          animation: false,
          grid: { left: 110, right: 40, top: 12, bottom: 12 },
          tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
          xAxis: { type: "value", splitLine: { lineStyle: { color: "#efe2d2" } } },
          yAxis: { type: "category", data: dEntries.map(e => e[0]).reverse(),
            axisLabel: { fontSize: 11 } },
          series: [{
            type: "bar", barMaxWidth: 20,
            data: dEntries.map(e => e[1]).reverse(),
            itemStyle: { color: "#9e1c1f" },
          }],
        });
      }
    }

    updateStatRow(currentYear);
    updateCharts(currentYear);

    const slider = document.getElementById("inst-year-slider");
    const yearVal = document.getElementById("inst-year-val");
    if (slider) {
      slider.addEventListener("input", () => {
        currentYear = parseInt(slider.value, 10);
        if (yearVal) yearVal.textContent = currentYear;
        updateStatRow(currentYear);
        updateCharts(currentYear);
      });
    }

    const playBtn = document.getElementById("inst-play-btn");
    if (playBtn) {
      playBtn.addEventListener("click", () => {
        if (_playInterval) {
          clearInterval(_playInterval);
          _playInterval = null;
          playBtn.textContent = "▶ Play";
        } else {
          if (currentYear >= END) {
            currentYear = START;
            if (slider) slider.value = START;
            if (yearVal) yearVal.textContent = START;
          }
          playBtn.textContent = "⏸ Pause";
          _playInterval = setInterval(() => {
            currentYear++;
            if (currentYear > END) {
              clearInterval(_playInterval);
              _playInterval = null;
              playBtn.textContent = "▶ Play";
              return;
            }
            if (slider) slider.value = currentYear;
            if (yearVal) yearVal.textContent = currentYear;
            updateStatRow(currentYear);
            updateCharts(currentYear);
          }, 240);
        }
      });
    }
  }

  // ============================================================= SOURCES TAB
  function renderSourcesTab(container) {
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

    container.innerHTML = `
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

  global.Atlas = { render };
})(window);
