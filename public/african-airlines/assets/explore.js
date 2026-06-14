/* explore.js - question-first atlas views for the African Airlines app.
   Uses the existing airlines.json, viz.json, africa.geo.json, and bundled ECharts. */
(function (global) {
  const YEAR_MIN = 1920;
  const YEAR_MAX = 1998;
  const ALL_SCOPES = ["Domestic", "Regional", "Intercontinental"];
  const SCOPE_COLORS = {
    Domestic: "#006191",
    Regional: "#61692d",
    Intercontinental: "#b07d2b",
  };
  const ASSET_BASE = "../assets/projects/from-colonies-to-carriers/";
  const ATLAS_IMAGE = ASSET_BASE + "2026-06-13__reese-portfolio__asset__v01__african-airlines-routes-from-europe.png";
  const ARCHIVE_IMAGES = [
    {
      src: ASSET_BASE + "2026-06-13__reese-portfolio__asset__v01__african-airlines-admin-divisions-1960.jpg",
      label: "Africa, 1960",
      alt: "Library of Congress map of African administrative divisions in 1960."
    },
    {
      src: ASSET_BASE + "2026-06-13__reese-portfolio__asset__v01__african-airlines-routes-from-europe.png",
      label: "European routes",
      alt: "Route map showing European airline connections across Africa."
    },
    {
      src: ASSET_BASE + "2026-06-13__reese-portfolio__asset__v01__african-airlines-air-afrique-advertisement.png",
      label: "Air Afrique",
      alt: "Air Afrique advertisement with a route map and photographic collage."
    },
    {
      src: ASSET_BASE + "2026-06-13__reese-portfolio__asset__v01__african-airlines-ram-marketing-fleet.png",
      label: "RAM fleet",
      alt: "Royal Air Maroc marketing spread featuring an aircraft and fleet information."
    },
    {
      src: ASSET_BASE + "2026-06-13__reese-portfolio__asset__v01__african-airlines-ram-ridership-chart.png",
      label: "RAM ridership",
      alt: "Chart showing Royal Air Maroc passenger growth from 1955 to 1976."
    },
    {
      src: ASSET_BASE + "2026-06-13__reese-portfolio__asset__v01__african-airlines-ram-plane-article.png",
      label: "RAM aircraft",
      alt: "Article image showing a Royal Air Maroc aircraft in flight."
    },
  ];
  const GEO_ALIAS = {
    "Democratic Republic of the Congo (Zaire)": "Democratic Republic of the Congo",
    Congo: "Republic of the Congo",
    Tanzania: "United Republic of Tanzania",
    "Guinea-Bissau": "Guinea Bissau",
  };
  const LENS_LABELS = {
    time: "all active carriers",
    country: "country trajectories",
    network: "documented network links",
    institution: "state-linked institutions",
    sources: "source gaps",
  };

  let vizData = null;
  let geoReady = false;
  let cityLookup = null;
  let charts = [];
  let resizeBound = false;
  let playTimer = null;

  const viewState = {
    atlasYear: 1960,
    atlasLens: "time",
    atlasScopes: new Set(ALL_SCOPES),
    atlasRoutes: false,
    institutionYear: 1960,
    networkYear: YEAR_MAX,
    networkScopes: new Set(ALL_SCOPES),
    countryCompare: ["Morocco", "Nigeria", "South Africa"],
  };

  const TAB_META = [
    ["time", "#/atlas", "Time"],
    ["country", "#/countries", "Country"],
    ["network", "#/networks", "Network"],
    ["institution", "#/institution", "Institution"],
    ["sources", "#/sources", "Sources"],
  ];

  const esc = s => (s == null ? "" : String(s).replace(/[&<>"']/g,
    c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])));
  const fmt = n => Number(n || 0).toLocaleString("en-US");
  const norm = s => String(s || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/\s+/g, " ").trim();
  const geoName = country => GEO_ALIAS[country] || country || "";

  function ensureData() {
    if (typeof echarts === "undefined") return Promise.reject(new Error("ECharts is not loaded."));
    const jobs = [];
    if (!vizData) jobs.push(fetch("data/viz.json").then(r => r.json()).then(d => (vizData = d)));
    if (!geoReady) jobs.push(fetch("data/africa.geo.json").then(r => r.json())
      .then(g => { echarts.registerMap("africa", g); geoReady = true; }));
    return Promise.all(jobs).then(() => {
      if (!cityLookup) cityLookup = makeCityLookup(vizData.map.cities || []);
    });
  }

  function bindResize() {
    if (resizeBound) return;
    resizeBound = true;
    let t;
    window.addEventListener("resize", () => {
      clearTimeout(t);
      t = setTimeout(() => charts.forEach(c => { try { c.resize(); } catch (e) {} }), 120);
    });
  }

  function clearCharts() {
    if (playTimer) {
      clearInterval(playTimer);
      playTimer = null;
    }
    charts.forEach(c => { try { c.dispose(); } catch (e) {} });
    charts = [];
  }

  function chartFrom(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    const inst = echarts.init(el, "portfolio");
    charts.push(inst);
    bindResize();
    return inst;
  }

  function shell(title, lead, body, activeTab) {
    const archive = ARCHIVE_IMAGES.map(item => `<a class="archive-tile" href="${item.src}">
      <img src="${item.src}" alt="${esc(item.alt)}" loading="lazy">
      <span>${esc(item.label)}</span>
    </a>`).join("");
    const tabs = TAB_META.map(([key, href, label]) =>
      `<a class="atlas-tab ${activeTab === key ? "active" : ""}" href="${href}" data-atlas-tab="${key}">${esc(label)}</a>`
    ).join("");
    return `<article class="explore-page">
      <header class="explore-hero">
        <div class="explore-hero__copy">
          <p class="eyebrow">Exploratory atlas</p>
          <h1>${esc(title)}</h1>
          <p>${esc(lead)}</p>
        </div>
        <figure class="explore-hero__media">
          <img src="${ATLAS_IMAGE}" alt="Historic route map showing European airline connections across Africa.">
          <figcaption>Route-map source image from the African Airlines project files.</figcaption>
        </figure>
      </header>
      <section class="archive-strip" aria-label="African Airlines source images">
        <div class="archive-strip__head">
          <h2>Archive images</h2>
          <p>Selected visuals from the African Airlines project folder.</p>
        </div>
        <div class="archive-strip__rail">${archive}</div>
      </section>
      <section class="atlas-shell">
        <div class="atlas-topbar">
          <div class="atlas-kickers">
            <span class="atlas-kicker"><b>${fmt((global.DATA || []).length)}</b> airlines</span>
            <span class="atlas-kicker"><b>${fmt(new Set((global.DATA || []).map(a => a.country).filter(Boolean)).size)}</b> countries</span>
            <span class="atlas-kicker"><b>${YEAR_MIN}-${YEAR_MAX}</b></span>
          </div>
          <nav class="atlas-tabs" aria-label="Atlas views">${tabs}</nav>
        </div>
        <div class="atlas-tab-panel">${body}</div>
      </section>
    </article>`;
  }

  function loadError(view, err) {
    view.innerHTML = `<div class="empty"><h2>Could not load the atlas</h2>
      <p>${esc(String(err))}</p></div>`;
  }

  function activeAt(a, year) {
    return !!a.year_founded && a.year_founded <= year && (a.year_ceased == null || a.year_ceased >= year);
  }

  function scopeMatch(a, scopes) {
    if (!scopes || !scopes.size || scopes.size >= ALL_SCOPES.length) return true;
    const vals = a.scopes || [];
    return vals.some(s => scopes.has(s));
  }

  function stateLinked(a) {
    const s = [a.ownership, a.government].filter(Boolean).join(" ");
    return /(state|government|parastatal|public|mixed|joint|consortium|national)/i.test(s) && !/^none$/i.test(a.government || "");
  }

  function hasSourceGap(a) {
    const d = a.detail || {};
    return !!(
      a.is_stub ||
      (a.review_flags && a.review_flags.length) ||
      !a.year_founded ||
      !d.base_city ||
      !(a.destinations && a.destinations.length) ||
      !a.provenance ||
      !a.provenance.confidence
    );
  }

  function filterByLens(list, lens) {
    if (lens === "institution") return list.filter(stateLinked);
    if (lens === "sources") return list.filter(hasSourceGap);
    return list;
  }

  function makeCityLookup(cities) {
    const exact = new Map();
    const byName = new Map();
    for (const c of cities) {
      const rec = { city: c.city, country: c.country, lng: c.lng, lat: c.lat, key: `${norm(c.city)}|${norm(c.country)}` };
      exact.set(`${norm(c.city)}|${norm(c.country)}`, rec);
      if (!byName.has(norm(c.city))) byName.set(norm(c.city), rec);
    }
    return { exact, byName };
  }

  function cleanCityName(value) {
    if (!value) return "";
    return String(value)
      .split(/[;/]/)[0]
      .split(/\s+and\s+/i)[0]
      .split(",")[0]
      .replace(/\([^)]*\)/g, "")
      .trim();
  }

  function findCity(city, country) {
    const name = cleanCityName(city);
    if (!name || !cityLookup) return null;
    const exact = cityLookup.exact.get(`${norm(name)}|${norm(geoName(country))}`)
      || cityLookup.exact.get(`${norm(name)}|${norm(country)}`);
    if (exact) return exact;
    return cityLookup.byName.get(norm(name)) || null;
  }

  function sameCountry(left, right) {
    return norm(geoName(left)) === norm(geoName(right)) || norm(left) === norm(right);
  }

  function homePoint(a) {
    const d = a.detail || {};
    let home = findCity(d.base_city, a.country);
    if (home) return home;
    const dests = a.destinations || [];
    const local = dests.find(x => x.city_country && sameCountry(x.city_country, a.country));
    if (local) home = findCity(local.city, local.city_country);
    return home || null;
  }

  function addCity(target, coord, a, scope, asHub) {
    if (!coord) return;
    const key = coord.key;
    if (!target.has(key)) {
      target.set(key, {
        city: coord.city,
        country: coord.country,
        lng: coord.lng,
        lat: coord.lat,
        entries: new Set(),
        scopes: new Set(),
        hubs: 0,
      });
    }
    const item = target.get(key);
    item.entries.add(a.entry);
    if (scope) item.scopes.add(scope);
    if (asHub) item.hubs += 1;
  }

  function buildSnapshot(airlines, year, scopes, lens) {
    const base = airlines.filter(a => activeAt(a, year) && scopeMatch(a, scopes));
    const active = filterByLens(base, lens);
    const countries = {};
    const ownership = {};
    const cityCounts = new Map();
    const routeCounts = new Map();
    const founded = filterByLens(airlines.filter(a => a.year_founded === year && scopeMatch(a, scopes)), lens);
    const ceased = filterByLens(airlines.filter(a => a.year_ceased === year && scopeMatch(a, scopes)), lens);

    for (const a of active) {
      countries[a.country] = (countries[a.country] || 0) + 1;
      const own = a.ownership || "Not stated";
      ownership[own] = (ownership[own] || 0) + 1;

      const origin = homePoint(a);
      if (origin) addCity(cityCounts, origin, a, null, true);

      const seenCities = new Set();
      const seenRoutes = new Set();
      for (const d of (a.destinations || [])) {
        if (scopes && scopes.size && d.scope && !scopes.has(d.scope)) continue;
        const dest = findCity(d.city, d.city_country);
        if (!dest) continue;
        if (!seenCities.has(dest.key)) {
          addCity(cityCounts, dest, a, d.scope, false);
          seenCities.add(dest.key);
        }
        if (!origin || origin.key === dest.key) continue;
        const routeKey = `${origin.key}->${dest.key}|${d.scope || "Other"}`;
        if (seenRoutes.has(routeKey)) continue;
        seenRoutes.add(routeKey);
        if (!routeCounts.has(routeKey)) {
          routeCounts.set(routeKey, {
            from: [origin.lng, origin.lat],
            to: [dest.lng, dest.lat],
            from_name: origin.city,
            to_name: dest.city,
            scope: d.scope || "Other",
            entries: new Set(),
          });
        }
        routeCounts.get(routeKey).entries.add(a.entry);
      }
    }

    const cities = Array.from(cityCounts.values())
      .map(c => ({
        name: c.city,
        country: c.country,
        value: [c.lng, c.lat, c.entries.size],
        carriers: c.entries.size,
        scopes: Array.from(c.scopes),
        hubCount: c.hubs,
      }))
      .sort((a, b) => b.carriers - a.carriers || a.name.localeCompare(b.name));

    const routes = Array.from(routeCounts.values())
      .map(r => ({
        coords: [r.from, r.to],
        value: r.entries.size,
        from_name: r.from_name,
        to_name: r.to_name,
        scope: r.scope,
      }))
      .sort((a, b) => b.value - a.value);

    return {
      year,
      lens,
      base,
      active,
      countries,
      ownership,
      cities,
      routes,
      founded,
      ceased,
      gaps: active.filter(hasSourceGap).length,
    };
  }

  function eventPoints(list, type) {
    return list.map(a => {
      const p = homePoint(a);
      if (!p) return null;
      return {
        name: a.name,
        entry: a.entry,
        country: a.country,
        value: [p.lng, p.lat, 1],
        eventType: type,
      };
    }).filter(Boolean);
  }

  function countrySeriesData(countries) {
    return Object.entries(countries)
      .map(([country, value]) => ({ name: geoName(country), value, country }))
      .filter(d => d.name !== "Canary Islands");
  }

  function mapOptions(snapshot, opts) {
    const maxCountry = Math.max(1, ...Object.values(snapshot.countries));
    const maxCity = Math.max(1, ...snapshot.cities.map(c => c.carriers));
    const maxRoute = Math.max(1, ...snapshot.routes.map(r => r.value));
    const size = n => 5 + Math.sqrt(n / maxCity) * 23;
    const lineWidth = n => 0.35 + (n / maxRoute) * 2.4;
    const lineOpacity = n => 0.16 + (n / maxRoute) * 0.48;
    const sourcePalette = snapshot.lens === "sources"
      ? ["#f4e7d6", "#efc9b8", "#d98a70", "#bd4b37", "#9e1c1f"]
      : ["#f4e7d6", "#c4dae9", "#7aa9c4", "#2f7ea3", "#006191"];

    const series = [
      { type: "map", geoIndex: 0, name: "Countries", data: countrySeriesData(snapshot.countries) },
    ];
    if (opts.showRoutes) {
      series.push({
        type: "lines",
        coordinateSystem: "geo",
        name: "Documented connections",
        polyline: false,
        data: snapshot.routes.map(r => ({
          name: `${r.from_name} -> ${r.to_name}`,
          coords: r.coords,
          value: r.value,
          from_name: r.from_name,
          to_name: r.to_name,
          scope: r.scope,
          lineStyle: {
            color: SCOPE_COLORS[r.scope] || "#b07d2b",
            width: lineWidth(r.value),
            opacity: lineOpacity(r.value),
            curveness: 0.18,
          },
        })),
        effect: opts.animateRoutes ? {
          show: true,
          period: 8,
          trailLength: 0.16,
          symbol: "arrow",
          symbolSize: 3,
          color: "#b07d2b",
        } : undefined,
        z: 2,
      });
    }
    series.push(
      {
        type: "scatter",
        coordinateSystem: "geo",
        name: "Served cities",
        data: snapshot.cities,
        symbolSize: p => size(p[2]),
        itemStyle: { color: "#006191", opacity: 0.58, borderColor: "#fffaf3", borderWidth: 1 },
        z: 3,
      },
      {
        type: "effectScatter",
        coordinateSystem: "geo",
        name: "Founded this year",
        data: eventPoints(snapshot.founded, "founded"),
        symbolSize: 11,
        rippleEffect: { scale: 2.3, brushType: "stroke" },
        itemStyle: { color: "#61692d", borderColor: "#fffaf3", borderWidth: 1 },
        z: 4,
      },
      {
        type: "scatter",
        coordinateSystem: "geo",
        name: "Ceased this year",
        data: eventPoints(snapshot.ceased, "ceased"),
        symbol: "diamond",
        symbolSize: 10,
        itemStyle: { color: "#9e1c1f", borderColor: "#fffaf3", borderWidth: 1 },
        z: 5,
      }
    );

    return {
      tooltip: {
        trigger: "item",
        formatter: p => {
          if (p.seriesType === "map") {
            return `<b>${esc(p.name)}</b><br>${fmt(p.value || 0)} ${esc(LENS_LABELS[snapshot.lens])}`;
          }
          if (p.seriesType === "lines") {
            return `<b>${esc(p.data.from_name)} -> ${esc(p.data.to_name)}</b>` +
              `<br>${esc(p.data.scope || "Service")} connection` +
              `<br>${fmt(p.data.value)} carrier record(s) active in ${snapshot.year}` +
              `<br><span style="color:#8c7f72">route dates are inferred from carrier active years</span>`;
          }
          if (p.data && p.data.eventType) {
            return `<b>${esc(p.data.name)}</b><br>${esc(p.data.country)}<br>${esc(p.data.eventType)} in ${snapshot.year}` +
              `<br><span style="color:#8c7f72">click to open entry</span>`;
          }
          if (p.data) {
            return `<b>${esc(p.data.name)}</b><br>${esc(p.data.country || "")}` +
              `<br>${fmt(p.data.carriers || 0)} active carrier record(s)`;
          }
          return "";
        },
      },
      visualMap: {
        type: "continuous",
        min: 0,
        max: maxCountry,
        left: 12,
        bottom: 22,
        seriesIndex: 0,
        text: [snapshot.lens === "sources" ? "more gaps" : "more records", "fewer"],
        calculable: true,
        inRange: { color: sourcePalette },
        textStyle: { fontSize: 11 },
      },
      geo: {
        map: "africa",
        roam: true,
        scaleLimit: { min: 0.8, max: 8 },
        itemStyle: { areaColor: "#f9efe2", borderColor: "#d8c6ad" },
        emphasis: { itemStyle: { areaColor: "#eee0c9" }, label: { show: false } },
      },
      legend: {
        top: 8,
        right: 10,
        orient: "vertical",
        selectedMode: true,
        textStyle: { fontSize: 11 },
      },
      series,
    };
  }

  function updateMap(chart, snapshot, opts) {
    chart.setOption(mapOptions(snapshot, opts), true);
    chart.off("click");
    chart.on("click", p => {
      if (p.data && p.data.entry) location.hash = "#/a/" + p.data.entry;
      if (p.seriesType === "map" && p.data && p.data.country) {
        location.hash = "#/countries/" + encodeURIComponent(p.data.country);
      }
    });
  }

  function selectedScopes(root, name) {
    const checked = Array.from(root.querySelectorAll(`input[name="${name}"]:checked`)).map(x => x.value);
    return new Set(checked.length ? checked : ALL_SCOPES);
  }

  function scopeControls(name, selected) {
    return ALL_SCOPES.map(scope => `<label class="scope-toggle">
      <input type="checkbox" name="${esc(name)}" value="${esc(scope)}" ${selected.has(scope) ? "checked" : ""}>
      <span>${esc(scope)}</span>
    </label>`).join("");
  }

  function eventList(items, label) {
    if (!items.length) return `<p class="muted">No ${esc(label)} records for this year.</p>`;
    return `<ul class="event-list">${items.slice(0, 8).map(a =>
      `<li><a href="#/a/${a.entry}">${esc(a.name)}</a><span>${esc(a.country)}</span></li>`).join("")}</ul>`;
  }

  function topList(rows, empty) {
    if (!rows.length) return `<p class="muted">${esc(empty)}</p>`;
    return `<ol class="rank-list">${rows.map(([label, value]) =>
      `<li><span>${esc(label)}</span><strong>${fmt(value)}</strong></li>`).join("")}</ol>`;
  }

  function topEntries(obj, n) {
    return Object.entries(obj).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, n);
  }

  function renderAtlasPanel(host, snapshot) {
    const topCountries = topEntries(snapshot.countries, 8);
    host.innerHTML = `
      <div class="stat-strip">
        <div><strong>${fmt(snapshot.active.length)}</strong><span>${esc(LENS_LABELS[snapshot.lens])}</span></div>
        <div><strong>${fmt(Object.keys(snapshot.countries).length)}</strong><span>countries</span></div>
        <div><strong>${fmt(snapshot.cities.length)}</strong><span>mapped cities</span></div>
        <div><strong>${fmt(snapshot.routes.length)}</strong><span>connection arcs</span></div>
      </div>
      <div class="panel note-panel">
        <h2>How to read this year</h2>
        <p>Country color counts carrier records active in ${snapshot.year}. City bubbles count active carrier records linked to that city. Green points were founded this year; red diamonds ceased this year.</p>
        <p class="muted">Routes are documented connections associated with carriers active in this year. The source does not provide exact route-opening dates.</p>
      </div>
      <div class="panel">
        <h2>Top countries</h2>
        ${topList(topCountries, "No active country records for this lens.")}
      </div>
      <div class="panel two-col-panel">
        <div>
          <h2>Founded in ${snapshot.year}</h2>
          ${eventList(snapshot.founded, "founding")}
        </div>
        <div>
          <h2>Ceased in ${snapshot.year}</h2>
          ${eventList(snapshot.ceased, "cessation")}
        </div>
      </div>`;
  }

  function renderAtlas(view, airlines) {
    clearCharts();
    view.innerHTML = shell(
      "Atlas over time",
      "Move through the twentieth century to see where African airline institutions appeared, survived, disappeared, and connected cities across the continent.",
      `<section class="explore-controls" id="atlas-controls">
        <div class="year-control">
          <button class="control-button" id="atlas-play" type="button">Play</button>
          <label for="atlas-year">Year</label>
          <input id="atlas-year" type="range" min="${YEAR_MIN}" max="${YEAR_MAX}" step="1" value="${viewState.atlasYear}">
          <output id="atlas-year-output">${viewState.atlasYear}</output>
        </div>
        <div class="lens-control" aria-label="Map lens">
          ${["time", "country", "network", "institution", "sources"].map(k =>
            `<button class="lens-chip ${viewState.atlasLens === k ? "is-active" : ""}" type="button" data-lens="${k}">${esc(k[0].toUpperCase() + k.slice(1))}</button>`).join("")}
        </div>
        <div class="scope-group" aria-label="Service layers">${scopeControls("atlas-scope", viewState.atlasScopes)}</div>
        <label class="scope-toggle route-toggle"><input id="atlas-routes" type="checkbox" ${viewState.atlasRoutes ? "checked" : ""}> <span>Route arcs</span></label>
      </section>
      <section class="map-workbench">
        <div class="atlas-map vchart" id="atlas-map"></div>
        <aside class="atlas-side" id="atlas-panel"></aside>
      </section>`,
      "time"
    );

    ensureData().then(() => {
      const root = document.getElementById("atlas-controls");
      const year = document.getElementById("atlas-year");
      const output = document.getElementById("atlas-year-output");
      const routes = document.getElementById("atlas-routes");
      const panel = document.getElementById("atlas-panel");
      const play = document.getElementById("atlas-play");
      const chart = chartFrom("atlas-map");
      const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      function update() {
        viewState.atlasYear = parseInt(year.value, 10);
        viewState.atlasScopes = selectedScopes(root, "atlas-scope");
        viewState.atlasRoutes = routes.checked;
        output.textContent = viewState.atlasYear;
        const snapshot = buildSnapshot(airlines, viewState.atlasYear, viewState.atlasScopes, viewState.atlasLens);
        updateMap(chart, snapshot, { showRoutes: viewState.atlasRoutes, animateRoutes: !reduceMotion && viewState.atlasRoutes });
        renderAtlasPanel(panel, snapshot);
      }

      year.addEventListener("input", update);
      routes.addEventListener("change", update);
      root.querySelectorAll('input[name="atlas-scope"]').forEach(input => input.addEventListener("change", update));
      root.querySelectorAll("[data-lens]").forEach(button => button.addEventListener("click", () => {
        viewState.atlasLens = button.dataset.lens;
        root.querySelectorAll("[data-lens]").forEach(b => b.classList.toggle("is-active", b === button));
        update();
      }));
      play.addEventListener("click", () => {
        if (playTimer) {
          clearInterval(playTimer);
          playTimer = null;
          play.textContent = "Play";
          return;
        }
        play.textContent = "Pause";
        playTimer = setInterval(() => {
          const next = parseInt(year.value, 10) >= YEAR_MAX ? YEAR_MIN : parseInt(year.value, 10) + 1;
          year.value = String(next);
          update();
        }, reduceMotion ? 900 : 360);
      });
      update();
      setTimeout(() => { try { chart.resize(); } catch (e) {} }, 120);
    }).catch(err => loadError(view, err));
  }

  function activeCountForCountry(airlines, country, year) {
    return airlines.filter(a => a.country === country && activeAt(a, year)).length;
  }

  function independenceMap() {
    const m = new Map();
    for (const row of (vizData.independence || [])) m.set(row.country, row);
    return m;
  }

  function countBy(list, get) {
    const out = {};
    for (const item of list) {
      const value = get(item) || "Not stated";
      if (Array.isArray(value)) {
        for (const v of value.filter(Boolean)) out[v] = (out[v] || 0) + 1;
      } else {
        out[value] = (out[value] || 0) + 1;
      }
    }
    return out;
  }

  function microBars(obj, limit) {
    const rows = topEntries(obj, limit);
    const max = Math.max(1, ...rows.map(([, v]) => v));
    if (!rows.length) return `<p class="muted">No data.</p>`;
    return `<div class="micro-bars">${rows.map(([label, value]) =>
      `<div class="micro-row"><span>${esc(label)}</span><i><b style="width:${(value / max) * 100}%"></b></i><strong>${fmt(value)}</strong></div>`
    ).join("")}</div>`;
  }

  function countryCard(country, airlines, ind) {
    const rows = airlines.filter(a => a.country === country);
    const founded = rows.filter(a => a.year_founded).sort((a, b) => a.year_founded - b.year_founded || a.name.localeCompare(b.name));
    const first = founded[0];
    const independence = ind.get(country);
    const stubs = rows.filter(a => a.is_stub).length;
    const review = rows.filter(a => a.review_flags && a.review_flags.length).length;
    const missingFounded = rows.filter(a => !a.year_founded).length;
    const confidence = countBy(rows, a => (a.provenance && a.provenance.confidence) || "not recorded");
    return `<article class="trajectory-card">
      <h2>${esc(country)}</h2>
      <dl class="country-facts">
        <div><dt>Total records</dt><dd>${fmt(rows.length)}</dd></div>
        <div><dt>First airline</dt><dd>${first ? `${esc(first.name)} (${first.year_founded})` : "Not stated"}</dd></div>
        <div><dt>Independence marker</dt><dd>${independence && independence.independence_year ? independence.independence_year : "Not in comparison table"}</dd></div>
        <div><dt>Lag to first airline</dt><dd>${independence && independence.lag != null ? `${independence.lag > 0 ? "+" : ""}${independence.lag} yr` : "Not available"}</dd></div>
      </dl>
      <h3>Ownership mix</h3>
      ${microBars(countBy(rows, a => a.ownership), 4)}
      <h3>Service scope</h3>
      ${microBars(countBy(rows, a => a.scopes || []), 3)}
      <h3>Source confidence</h3>
      ${microBars(confidence, 4)}
      <p class="quality-line">${fmt(stubs)} stub entries · ${fmt(review)} review-flagged · ${fmt(missingFounded)} missing founding year</p>
    </article>`;
  }

  function countryOptions(airlines, selected) {
    const countries = Array.from(new Set(airlines.map(a => a.country))).sort();
    return countries.map(c => `<option value="${esc(c)}" ${selected === c ? "selected" : ""}>${esc(c)}</option>`).join("");
  }

  function renderCountries(view, airlines) {
    clearCharts();
    const countryFromHash = decodeURIComponent((location.hash || "").replace(/^#\/countries\/?/, ""));
    if (countryFromHash && airlines.some(a => a.country === countryFromHash)) {
      viewState.countryCompare = [
        countryFromHash,
        ...viewState.countryCompare.filter(c => c !== countryFromHash),
      ].slice(0, 3);
    }
    view.innerHTML = shell(
      "Country trajectories",
      "Compare national aviation paths without reducing each country to a former empire. The focus is timing, survival, ownership, service scope, and source confidence.",
      `<section class="explore-controls country-controls" id="country-controls">
        ${[0, 1, 2].map(i => `<label>Country ${i + 1}
          <select data-country-select="${i}">${countryOptions(airlines, viewState.countryCompare[i])}</select>
        </label>`).join("")}
      </section>
      <section class="country-workbench">
        <div class="trajectory-chart vchart" id="country-chart"></div>
        <div class="trajectory-grid" id="country-cards"></div>
      </section>`,
      "country"
    );

    ensureData().then(() => {
      const chart = chartFrom("country-chart");
      const cards = document.getElementById("country-cards");
      const root = document.getElementById("country-controls");
      const years = [];
      for (let y = YEAR_MIN; y <= YEAR_MAX; y++) years.push(y);
      const ind = independenceMap();

      function update() {
        viewState.countryCompare = Array.from(root.querySelectorAll("[data-country-select]"))
          .map(s => s.value)
          .filter((country, i, all) => country && all.indexOf(country) === i)
          .slice(0, 3);
        chart.setOption({
          tooltip: { trigger: "axis" },
          legend: { top: 8 },
          grid: { left: 56, right: 28, top: 54, bottom: 42 },
          xAxis: { type: "category", data: years, axisLabel: { interval: 9 } },
          yAxis: { type: "value", name: "Active carriers", splitLine: { lineStyle: { color: "#efe2d2" } } },
          series: viewState.countryCompare.map((country, idx) => ({
            name: country,
            type: "line",
            smooth: false,
            showSymbol: false,
            lineStyle: { width: 2.5 },
            itemStyle: { color: ["#006191", "#9e1c1f", "#61692d"][idx] || "#b07d2b" },
            data: years.map(y => activeCountForCountry(airlines, country, y)),
          })),
        }, true);
        cards.innerHTML = viewState.countryCompare.map(country => countryCard(country, airlines, ind)).join("");
      }

      root.querySelectorAll("select").forEach(select => select.addEventListener("change", update));
      update();
      setTimeout(() => { try { chart.resize(); } catch (e) {} }, 120);
    }).catch(err => loadError(view, err));
  }

  function renderNetworkPanel(host, snapshot) {
    const scopeTotals = countBy(snapshot.active, a => a.scopes || []);
    host.innerHTML = `
      <div class="stat-strip">
        <div><strong>${fmt(snapshot.routes.length)}</strong><span>connection arcs</span></div>
        <div><strong>${fmt(snapshot.cities.length)}</strong><span>served cities</span></div>
        <div><strong>${fmt(snapshot.active.length)}</strong><span>active records</span></div>
      </div>
      <div class="panel note-panel">
        <h2>Network caveat</h2>
        <p>Connections are rebuilt from destinations attached to carrier records. The selected year filters carriers by founding and cessation years, so route display should be read as an active-carrier network, not a precise route timetable.</p>
      </div>
      <div class="panel">
        <h2>Top hubs and cities</h2>
        ${topList(snapshot.cities.slice(0, 12).map(c => [`${c.name}, ${c.country}`, c.carriers]), "No mapped cities for this filter.")}
      </div>
      <div class="panel">
        <h2>Service mix</h2>
        ${microBars(scopeTotals, 3)}
      </div>`;
  }

  function renderNetworks(view, airlines) {
    clearCharts();
    view.innerHTML = shell(
      "Networks and hubs",
      "Explore the documented city network by service scope and year. The map emphasizes mobility and hub formation rather than colonial categories.",
      `<section class="explore-controls" id="network-controls">
        <div class="year-control">
          <label for="network-year">Year</label>
          <input id="network-year" type="range" min="${YEAR_MIN}" max="${YEAR_MAX}" step="1" value="${viewState.networkYear}">
          <output id="network-year-output">${viewState.networkYear}</output>
        </div>
        <div class="scope-group" aria-label="Service layers">${scopeControls("network-scope", viewState.networkScopes)}</div>
      </section>
      <section class="map-workbench">
        <div class="atlas-map vchart" id="network-map"></div>
        <aside class="atlas-side" id="network-panel"></aside>
      </section>`,
      "network"
    );

    ensureData().then(() => {
      const root = document.getElementById("network-controls");
      const year = document.getElementById("network-year");
      const output = document.getElementById("network-year-output");
      const panel = document.getElementById("network-panel");
      const chart = chartFrom("network-map");
      const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      function update() {
        viewState.networkYear = parseInt(year.value, 10);
        viewState.networkScopes = selectedScopes(root, "network-scope");
        output.textContent = viewState.networkYear;
        const snapshot = buildSnapshot(airlines, viewState.networkYear, viewState.networkScopes, "network");
        updateMap(chart, snapshot, { showRoutes: true, animateRoutes: !reduceMotion });
        renderNetworkPanel(panel, snapshot);
      }

      year.addEventListener("input", update);
      root.querySelectorAll('input[name="network-scope"]').forEach(input => input.addEventListener("change", update));
      update();
      setTimeout(() => { try { chart.resize(); } catch (e) {} }, 120);
    }).catch(err => loadError(view, err));
  }

  function activeScoped(airlines, year, scopes) {
    return airlines.filter(a => activeAt(a, year) && scopeMatch(a, scopes));
  }

  function renderInstitution(view, airlines) {
    clearCharts();
    view.innerHTML = shell(
      "Institutions over time",
      "Track how state-linked airlines, ownership structures, colonial-power affiliations, and decolonization pathways changed as national aviation institutions appeared across the continent.",
      `<section class="explore-controls" id="institution-controls">
        <div class="year-control">
          <button class="control-button" id="institution-play" type="button">Play</button>
          <label for="institution-year">Year</label>
          <input id="institution-year" type="range" min="${YEAR_MIN}" max="${YEAR_MAX}" step="1" value="${viewState.institutionYear}">
          <output id="institution-year-output">${viewState.institutionYear}</output>
        </div>
        <div class="scope-group" aria-label="Service layers">${scopeControls("institution-scope", viewState.atlasScopes)}</div>
      </section>
      <section class="institution-workbench">
        <div class="stat-strip" id="institution-stats"></div>
        <div class="institution-grid">
          <div class="panel">
            <h2>Active airlines by colonial-power affiliation</h2>
            <div class="institution-chart vchart" id="institution-power-chart"></div>
          </div>
          <div class="panel">
            <h2>Active airlines by decolonization pathway</h2>
            <div class="institution-chart vchart" id="institution-decol-chart"></div>
          </div>
        </div>
        <div class="panel note-panel">
          <h2>Interpretive note</h2>
          <p>Colonial-power affiliation is historical context, not the default explanation. This tab uses it alongside institutional ownership, decolonization pathway, timing, and source confidence.</p>
          <p class="muted">State-linked records are identified from explicit ownership/government language in the dataset, so this is a conservative signal rather than a complete legal classification.</p>
        </div>
      </section>`,
      "institution"
    );

    ensureData().then(() => {
      const root = document.getElementById("institution-controls");
      const year = document.getElementById("institution-year");
      const output = document.getElementById("institution-year-output");
      const play = document.getElementById("institution-play");
      const stats = document.getElementById("institution-stats");
      const powerChart = chartFrom("institution-power-chart");
      const decolChart = chartFrom("institution-decol-chart");
      const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      function chartOptions(rows, color) {
        const ordered = rows.slice().reverse();
        return {
          tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
          grid: { left: 118, right: 22, top: 12, bottom: 28 },
          xAxis: { type: "value", splitLine: { lineStyle: { color: "#efe2d2" } } },
          yAxis: { type: "category", data: ordered.map(r => r[0]), axisLabel: { fontSize: 11 } },
          series: [{
            type: "bar",
            barMaxWidth: 22,
            data: ordered.map(r => r[1]),
            itemStyle: { color },
          }],
        };
      }

      function update() {
        viewState.institutionYear = parseInt(year.value, 10);
        viewState.atlasScopes = selectedScopes(root, "institution-scope");
        output.textContent = viewState.institutionYear;
        const active = activeScoped(airlines, viewState.institutionYear, viewState.atlasScopes);
        const linked = active.filter(stateLinked);
        const countries = new Set(linked.map(a => a.country).filter(Boolean));
        const withPower = active.filter(a => a.colonial_power && a.colonial_power !== "None");
        stats.innerHTML = `
          <div><strong>${fmt(linked.length)}</strong><span>state-linked records</span></div>
          <div><strong>${fmt(countries.size)}</strong><span>countries with state-linked records</span></div>
          <div><strong>${fmt(withPower.length)}</strong><span>records with colonial-power context</span></div>
          <div><strong>${fmt(active.length)}</strong><span>active carrier records</span></div>`;
        powerChart.setOption(chartOptions(topEntries(countBy(active, a => a.colonial_power || "Not stated"), 10), "#006191"), true);
        decolChart.setOption(chartOptions(topEntries(countBy(active, a => a.decolonization || "Not stated"), 10), "#9e1c1f"), true);
      }

      year.addEventListener("input", update);
      root.querySelectorAll('input[name="institution-scope"]').forEach(input => input.addEventListener("change", update));
      play.addEventListener("click", () => {
        if (playTimer) {
          clearInterval(playTimer);
          playTimer = null;
          play.textContent = "Play";
          return;
        }
        play.textContent = "Pause";
        playTimer = setInterval(() => {
          const next = parseInt(year.value, 10) >= YEAR_MAX ? YEAR_MIN : parseInt(year.value, 10) + 1;
          year.value = String(next);
          update();
        }, reduceMotion ? 900 : 240);
      });
      update();
      setTimeout(() => {
        try { powerChart.resize(); decolChart.resize(); } catch (e) {}
      }, 120);
    }).catch(err => loadError(view, err));
  }

  function sourceStats(airlines) {
    const rows = airlines.map(a => {
      const d = a.detail || {};
      const gapCount = [
        a.is_stub,
        a.review_flags && a.review_flags.length,
        !a.year_founded,
        !d.base_city,
        !(a.destinations && a.destinations.length),
        !a.provenance,
        !(a.provenance && a.provenance.confidence),
      ].filter(Boolean).length;
      return { airline: a, gapCount };
    });
    return {
      rows,
      stubs: airlines.filter(a => a.is_stub).length,
      review: airlines.filter(a => a.review_flags && a.review_flags.length).length,
      missingFounded: airlines.filter(a => !a.year_founded).length,
      missingBase: airlines.filter(a => !(a.detail && a.detail.base_city)).length,
      missingDestinations: airlines.filter(a => !(a.destinations && a.destinations.length)).length,
      noProvenance: airlines.filter(a => !a.provenance).length,
      confidence: countBy(airlines, a => (a.provenance && a.provenance.confidence) || "not recorded"),
      countries: countBy(rows.filter(r => r.gapCount), r => r.airline.country),
    };
  }

  function recordList(list, empty) {
    if (!list.length) return `<p class="muted">${esc(empty)}</p>`;
    return `<ul class="source-list">${list.slice(0, 14).map(a =>
      `<li><a href="#/a/${a.entry}">${esc(a.name)}</a><span>${esc(a.country)}</span></li>`).join("")}</ul>`;
  }

  function renderSources(view, airlines) {
    clearCharts();
    const s = sourceStats(airlines);
    const reviewRows = airlines.filter(a => a.review_flags && a.review_flags.length);
    const stubRows = airlines.filter(a => a.is_stub);
    const missingFounded = airlines.filter(a => !a.year_founded);
    view.innerHTML = shell(
      "Sources and gaps",
      "A useful digital history project should show what the archive can support and where the evidence is still thin.",
      `<section class="source-dashboard">
        <div class="stat-card"><div class="num">${fmt(s.stubs)}</div><div class="lab">Stub entries</div></div>
        <div class="stat-card"><div class="num">${fmt(s.review)}</div><div class="lab">Review-flagged records</div></div>
        <div class="stat-card"><div class="num">${fmt(s.missingFounded)}</div><div class="lab">Missing founding year</div></div>
        <div class="stat-card"><div class="num">${fmt(s.missingBase)}</div><div class="lab">Missing base city</div></div>
        <div class="stat-card"><div class="num">${fmt(s.missingDestinations)}</div><div class="lab">No destination list</div></div>
        <div class="stat-card"><div class="num">${fmt(s.noProvenance)}</div><div class="lab">No provenance panel</div></div>
      </section>
      <section class="source-grid">
        <div class="panel">
          <h2>Source confidence</h2>
          ${microBars(s.confidence, 6)}
        </div>
        <div class="panel">
          <h2>Countries with the most visible gaps</h2>
          ${microBars(s.countries, 12)}
        </div>
        <div class="panel">
          <h2>Review-flagged records</h2>
          ${recordList(reviewRows, "No review-flagged records.")}
        </div>
        <div class="panel">
          <h2>Stub records</h2>
          ${recordList(stubRows, "No stub records.")}
        </div>
        <div class="panel">
          <h2>Missing founding year</h2>
          ${recordList(missingFounded, "No records are missing founding years.")}
        </div>
        <div class="panel note-panel">
          <h2>Interpretive rule</h2>
          <p>Blank fields are not estimated. A missing value means the source did not state it or the field still needs review, not that the value is zero.</p>
          <p class="muted">This view keeps uncertainty visible so the map does not imply more precision than the evidence supports.</p>
        </div>
      </section>`
      ,
      "sources"
    );
  }

  global.Explore = { renderAtlas, renderCountries, renderNetworks, renderInstitution, renderSources };
})(window);
