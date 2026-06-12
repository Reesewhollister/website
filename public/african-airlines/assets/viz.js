/* viz.js — the "Visualize" tab: timelines, trends, route map, decolonization.
   Powered by Apache ECharts (bundled locally). Reads window.DATA (airlines,
   set by app.js) plus data/viz.json (precomputed aggregates) and
   data/africa.geo.json (basemap). */
(function (global) {
  const POWER_COLORS = {
    France: "#006191", Britain: "#9e1c1f", Portugal: "#61692d",
    Belgium: "#c98a2d", Italy: "#7c5067", Spain: "#b07d2b",
    Germany: "#6b5d4f", None: "#8c7f72", Unknown: "#a89a8c",
    "Britain / Italy": "#8f4a26", "France / Britain": "#4a6a8f",
    "France / Spain": "#5e5588", "Germany / South Africa": "#6b5d4f",
    "None (Americo-Liberian settlement; never colonized)": "#8c7f72",
    "None (Italian occupation 1936-41)": "#a89a8c",
  };
  // shorter display labels for verbose colonial-power values
  const POWER_SHORT = {
    "None (Americo-Liberian settlement; never colonized)": "Liberia (uncolonized)",
    "None (Italian occupation 1936-41)": "Ethiopia (uncolonized)",
  };
  const shortPower = p => POWER_SHORT[p] || (p || "Unknown").replace(/\s*\/\s*/g, "/");
  const DECOL_COLORS = { Negotiated: "#61692d", Violent: "#9e1c1f", Mixed: "#c98a2d" };
  const GEO_ALIAS = {
    "Democratic Republic of the Congo (Zaire)": "Democratic Republic of the Congo",
    "Congo": "Republic of the Congo",
    "Tanzania": "United Republic of Tanzania",
    "Guinea-Bissau": "Guinea Bissau",
  };
  const SUBS = [
    ["timelines", "Timelines"],
    ["trends", "Trends over time"],
    ["map", "Route map"],
    ["decolonization", "Decolonization"],
  ];
  const CAPTIONS = {
    timelines: "Every airline across 1920–1998. Press play to watch carriers appear at their founding year and fade when they cease; the lifelines below show each airline's full span.",
    trends: "Active carriers per year, stacked by former colonial power — the post-independence aviation boom made visible — with annual foundings below.",
    map: "Hub cities and reconstructed route arcs. Bubble size = carriers serving a city; country shading = airlines based there. Drag to pan, scroll to zoom.",
    decolonization: "Independence year vs. the first airline founded in each country. Points above the diagonal mean aviation came after independence. Classifications are scholarly judgments — contested cases flagged.",
  };

  // chart-wide theme: Work Sans labels + warm ink, matching reesehollister.com
  const VIZ_FONT = '"Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';
  if (typeof echarts !== "undefined") {
    echarts.registerTheme("portfolio", {
      textStyle: { fontFamily: VIZ_FONT, color: "#281d15" },
      title: { textStyle: { fontFamily: VIZ_FONT, color: "#281d15" } },
      legend: { textStyle: { fontFamily: VIZ_FONT, color: "rgba(40,29,21,.74)" } },
      categoryAxis: { axisLabel: { fontFamily: VIZ_FONT, color: "rgba(40,29,21,.74)" } },
      valueAxis: { axisLabel: { fontFamily: VIZ_FONT, color: "rgba(40,29,21,.74)" } },
      tooltip: { textStyle: { fontFamily: VIZ_FONT } },
    });
  }

  let vizData = null, geoReady = false, charts = [], resizeBound = false;

  const esc = s => (s == null ? "" : String(s).replace(/[&<>"']/g,
    c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])));
  const powerColor = p => POWER_COLORS[p] || "#b0b7c0";
  const decolColor = d => DECOL_COLORS[d] || "#a89a8c";

  function render(view, hash) {
    const sub = ((hash || "").split("/")[2]) || "timelines";
    const tabs = SUBS.map(([k, label]) =>
      `<a class="vsub ${k === sub ? "active" : ""}" href="#/viz/${k}">${label}</a>`).join("");
    view.innerHTML = `
      <div class="viz">
        <div class="vsubnav">${tabs}</div>
        <p class="vcaption">${CAPTIONS[sub] || ""}</p>
        <div id="vizbody"><div class="empty">Loading visualization…</div></div>
      </div>`;
    bindResize();
    ensureData()
      .then(() => {
        disposeCharts();
        draw(sub);
        // charts may init before the container has its final size (the autoplaying
        // timeline above can shift layout) — force a resize on the next frames.
        requestAnimationFrame(() => charts.forEach(c => { try { c.resize(); } catch (e) {} }));
        setTimeout(() => charts.forEach(c => { try { c.resize(); } catch (e) {} }), 120);
      })
      .catch(err => {
        document.getElementById("vizbody").innerHTML =
          `<div class="empty"><h2>Couldn't load visualization data</h2>
           <p>${esc(String(err))}</p>
           <p class="muted">Run <code>python3 build/build_data.py</code> and serve with
           <code>python3 -m http.server</code>.</p></div>`;
      });
  }

  function ensureData() {
    const jobs = [];
    if (!window.DATA) jobs.push(fetch("data/airlines.json").then(r => r.json()).then(d => (window.DATA = d)));
    if (!vizData) jobs.push(fetch("data/viz.json").then(r => r.json()).then(d => (vizData = d)));
    if (!geoReady) jobs.push(fetch("data/africa.geo.json").then(r => r.json())
      .then(g => { echarts.registerMap("africa", g); geoReady = true; }));
    return Promise.all(jobs);
  }

  function chartDiv(height) {
    const host = document.getElementById("vizbody");
    const d = document.createElement("div");
    d.className = "vchart";
    d.style.height = height;
    host.appendChild(d);
    const inst = echarts.init(d, "portfolio");
    charts.push(inst);
    return inst;
  }
  function sectionTitle(text) {
    const host = document.getElementById("vizbody");
    const h = document.createElement("h3");
    h.className = "vsection";
    h.textContent = text;
    host.appendChild(h);
  }
  function disposeCharts() {
    charts.forEach(c => { try { c.dispose(); } catch (e) {} });
    charts = [];
    const host = document.getElementById("vizbody");
    if (host) host.innerHTML = "";
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
  function goDetail(entry) { if (entry != null) location.hash = "#/a/" + entry; }

  function draw(sub) {
    if (sub === "timelines") return drawTimelines();
    if (sub === "trends") return drawTrends();
    if (sub === "map") return drawMap();
    if (sub === "decolonization") return drawDecolonization();
    drawTimelines();
  }

  // ---------------------------------------------------------------- TIMELINES
  function drawTimelines() {
    drawAnimatedFoundings();
    sectionTitle("Lifelines — every airline's span, grouped by colonial power");
    drawGantt();
  }

  function drawAnimatedFoundings() {
    const data = (window.DATA || []).filter(a => a.year_founded);
    const powers = Array.from(new Set(data.map(a => a.colonial_power || "Unknown"))).sort();
    const laneOf = {};
    powers.forEach((p, i) => (laneOf[p] = i));
    const END = (vizData && vizData.survey_end) || 1998;
    const items = data.map(a => {
      const p = a.colonial_power || "Unknown";
      const jitter = (((a.entry * 53) % 100) / 100 - 0.5) * 0.62;
      return {
        founded: a.year_founded, end: a.year_ceased || END,
        lane: laneOf[p] + jitter, power: p, decol: a.decolonization,
        size: Math.max(5, Math.min(26, Math.sqrt(a.fleet_size || 2) * 4)),
        name: a.name, entry: a.entry, country: a.country, fleet: a.fleet_size,
      };
    });
    const years = [];
    for (let y = 1920; y <= END; y++) years.push(y);

    const point = it => ({
      value: [it.founded, it.lane], name: it.name, entry: it.entry,
      country: it.country, fleet: it.fleet, symbolSize: it.size,
    });
    const options = years.map(Y => {
      const active = [], ceased = [];
      for (const it of items) {
        if (it.founded > Y) continue;
        if (it.end < Y) ceased.push(point(it));
        else active.push({ ...point(it), itemStyle: { color: decolColor(it.decol), opacity: 0.85 } });
      }
      return { title: { text: "From Colonies to Carriers — African aviation, " + Y, left: "center", textStyle: { fontSize: 14 } },
        series: [{ data: active }, { data: ceased }] };
    });

    const inst = chartDiv("440px");
    inst.setOption({
      color: ["#61692d", "#d8cbbb"],
      baseOption: {
        timeline: {
          axisType: "category", data: years, autoPlay: true, playInterval: 220,
          currentIndex: years.length - 1, bottom: 4, left: 40, right: 40,
          label: { interval: 9 }, checkpointStyle: { color: "#006191" },
          controlStyle: { color: "#006191", borderColor: "#006191" },
        },
        title: { left: "center", textStyle: { fontSize: 14 } },
        tooltip: {
          formatter: p => `<b>${esc(p.data.name)}</b><br>${esc(p.data.country || "")}` +
            `<br>founded ${p.data.value[0]}` + (p.data.fleet ? `<br>fleet ~${p.data.fleet}` : "") +
            `<br><span style="color:#888">click to open</span>`,
        },
        grid: { left: 150, right: 30, top: 44, bottom: 60 },
        xAxis: { type: "value", min: 1920, max: END, name: "Year founded", nameLocation: "middle",
          nameGap: 26, splitLine: { lineStyle: { color: "#efe2d2" } } },
        yAxis: { type: "category", data: powers, name: "Colonial power",
          axisLabel: { fontSize: 10, formatter: shortPower }, axisTick: { show: false } },
        series: [
          { type: "scatter", name: "Operating", emphasis: { focus: "series" } },
          { type: "scatter", name: "Ceased", symbolSize: 6, itemStyle: { color: "#d8cbbb", opacity: 0.55 } },
        ],
      },
      options,
    });
    inst.on("click", p => p.data && goDetail(p.data.entry));
  }

  function drawGantt() {
    const g = (vizData && vizData.gantt) || [];
    const names = g.map(x => x.name || ("#" + x.entry));
    const data = g.map((x, i) => ({
      value: [i, x.founded, x.end, x.entry],
      itemStyle: { color: decolColor(x.decolonization), opacity: x.ceased ? 0.95 : 0.7 },
      meta: x,
    }));
    const pct = Math.min(100, Math.max(4, (38 / Math.max(1, g.length)) * 100));
    const END = (vizData && vizData.survey_end) || 1998;

    const inst = chartDiv("560px");
    inst.setOption({
      tooltip: {
        formatter: p => {
          const m = p.data.meta;
          return `<b>${esc(m.name)}</b><br>${esc(m.country)} · ${esc(m.group)}` +
            `<br>${m.founded}–${m.ceased ? m.end : "still operating"}` +
            `<br>${esc(m.decolonization || "—")} decolonization<br><span style="color:#888">click to open</span>`;
        },
      },
      grid: { left: 168, right: 28, top: 10, bottom: 40 },
      xAxis: { type: "value", min: 1920, max: END, position: "top",
        splitLine: { lineStyle: { color: "#efe2d2" } } },
      yAxis: { type: "category", data: names, inverse: true,
        axisLabel: { fontSize: 9, formatter: v => (v.length > 26 ? v.slice(0, 25) + "…" : v) },
        axisTick: { show: false } },
      dataZoom: [
        { type: "slider", yAxisIndex: 0, width: 14, right: 6, start: 0, end: pct, brushSelect: false },
        { type: "inside", yAxisIndex: 0, start: 0, end: pct },
      ],
      series: [{
        type: "custom",
        renderItem: (params, api) => {
          const cat = api.value(0);
          const start = api.coord([api.value(1), cat]);
          const end = api.coord([api.value(2), cat]);
          const h = Math.max(2.5, api.size([0, 1])[1] * 0.55);
          const w = Math.max(1.5, end[0] - start[0]);
          return {
            type: "rect",
            shape: { x: start[0], y: start[1] - h / 2, width: w, height: h, r: 1.5 },
            style: api.style(),
          };
        },
        encode: { x: [1, 2], y: 0 },
        data,
      }],
    });
    inst.on("click", p => p.data && goDetail(p.data.value[3]));
  }

  // ------------------------------------------------------------------- TRENDS
  function drawTrends() {
    const ts = vizData.time_series;
    const series = ts.powers.map(p => ({
      name: p, type: "line", stack: "active", smooth: false,
      showSymbol: false, areaStyle: { opacity: 0.85 },
      lineStyle: { width: 0 }, itemStyle: { color: powerColor(p) },
      emphasis: { focus: "series" }, data: ts.by_power[p],
    }));
    const inst = chartDiv("420px");
    inst.setOption({
      title: { text: "Active carriers per year, by former colonial power", left: "center", textStyle: { fontSize: 14 } },
      tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
      legend: { top: 26, type: "scroll", formatter: shortPower },
      grid: { left: 56, right: 28, top: 64, bottom: 40 },
      xAxis: { type: "category", data: ts.years, boundaryGap: false,
        axisLabel: { interval: 9 } },
      yAxis: { type: "value", name: "Airlines operating", splitLine: { lineStyle: { color: "#efe2d2" } } },
      series,
    });

    sectionTitle("Airlines founded each year");
    const inst2 = chartDiv("300px");
    inst2.setOption({
      tooltip: { trigger: "axis" },
      grid: { left: 56, right: 28, top: 16, bottom: 40 },
      xAxis: { type: "category", data: ts.years, axisLabel: { interval: 9 } },
      yAxis: { type: "value", name: "New airlines", splitLine: { lineStyle: { color: "#efe2d2" } } },
      series: [{ type: "bar", data: ts.foundings, itemStyle: { color: "#006191" },
        markLine: { silent: true, symbol: "none", lineStyle: { color: "#9e1c1f", type: "dashed" },
          data: [{ xAxis: String(1957) }, { xAxis: String(1960) }],
          label: { formatter: "decolonization wave", color: "#9e1c1f", fontSize: 10 } } }],
    });
  }

  // ---------------------------------------------------------------------- MAP
  function drawMap() {
    const m = vizData.map;
    const counts = m.country_counts || {};
    const choro = Object.keys(counts).map(c => ({ name: GEO_ALIAS[c] || c, value: counts[c] }))
      .filter(d => d.name !== "Canary Islands");
    const maxCount = Math.max(1, ...choro.map(d => d.value));

    const hubs = m.cities.filter(c => c.asHub).map(c =>
      ({ name: c.city, value: [c.lng, c.lat, c.carriers], carriers: c.carriers, country: c.country }));
    const dests = m.cities.filter(c => !c.asHub).map(c =>
      ({ name: c.city, value: [c.lng, c.lat, c.carriers], carriers: c.carriers, country: c.country }));
    const maxCarriers = Math.max(1, ...m.cities.map(c => c.carriers));
    const sz = n => 4 + Math.sqrt(n / maxCarriers) * 22;
    const maxW = Math.max(1, ...m.routes.map(r => r.weight));
    const routes = m.routes.map(r => ({ coords: [r.from, r.to], value: r.weight,
      lineStyle: { width: 0.4 + (r.weight / maxW) * 2.4, opacity: 0.18 + (r.weight / maxW) * 0.5 } }));

    const inst = chartDiv("680px");
    inst.setOption({
      tooltip: {
        formatter: p => {
          if (p.seriesType === "lines") return "";
          if (p.seriesType === "map") return `<b>${esc(p.name)}</b><br>${p.value || 0} airline(s) based here`;
          return `<b>${esc(p.name)}</b><br>${esc(p.data.country || "")}<br>${p.data.carriers} carrier(s) served`;
        },
      },
      visualMap: {
        type: "continuous", min: 0, max: maxCount, left: 12, bottom: 24, seriesIndex: 0,
        text: ["more airlines", "fewer"], calculable: true,
        inRange: { color: ["#f4e7d6", "#c4dae9", "#7aa9c4", "#2f7ea3", "#006191"] },
        textStyle: { fontSize: 11 },
      },
      geo: {
        map: "africa", roam: true, scaleLimit: { min: 0.8, max: 8 },
        itemStyle: { areaColor: "#f9efe2", borderColor: "#d8c6ad" },
        emphasis: { itemStyle: { areaColor: "#eee0c9" }, label: { show: false } },
      },
      series: [
        { type: "map", geoIndex: 0, name: "Based here", data: choro },
        { type: "lines", coordinateSystem: "geo", name: "Routes", polyline: false,
          lineStyle: { color: "#b07d2b", curveness: 0.18 }, blendMode: "source-over",
          effect: { show: true, period: 6, trailLength: 0.2, symbol: "arrow", symbolSize: 3, color: "#b07d2b" },
          data: routes, silent: true, z: 2 },
        { type: "scatter", coordinateSystem: "geo", name: "Cities", z: 3,
          symbolSize: p => sz(p[2]), itemStyle: { color: "#006191", opacity: 0.55 }, data: dests },
        { type: "effectScatter", coordinateSystem: "geo", name: "Hubs", z: 4,
          showEffectOn: "render", rippleEffect: { scale: 2.4, brushType: "stroke" },
          symbolSize: p => sz(p[2]), itemStyle: { color: "#b07d2b" }, data: hubs },
      ],
    });
  }

  // ------------------------------------------------------------ DECOLONIZATION
  function drawDecolonization() {
    const host = document.getElementById("vizbody");
    const note = document.createElement("div");
    note.className = "review-note";
    note.style.marginBottom = "14px";
    note.innerHTML = "⚑ Independence years and decolonization types are curated scholarly classifications, " +
      "not data from Guttery. Contested cases (e.g. Kenya, Cameroon, Cape Verde, South Africa, Zimbabwe, Egypt) " +
      "are flagged and await sign-off. Ethiopia, Liberia, and overseas territories are omitted (no standard independence date).";
    host.appendChild(note);

    const rows = (vizData.independence || []).filter(d => d.independence_year && d.first_founding);
    const pts = rows.map(d => ({
      value: [d.independence_year, d.first_founding, d.airline_count],
      name: d.country, lag: d.lag, contested: d.contested, note: d.note,
      itemStyle: { color: d.contested ? "#9e1c1f" : "#006191", opacity: 0.8,
        borderColor: "#fff", borderWidth: 1 },
      symbolSize: Math.max(8, Math.min(40, Math.sqrt(d.airline_count) * 6)),
    }));
    const yrs = rows.flatMap(d => [d.independence_year, d.first_founding]);
    const lo = Math.min(1900, ...yrs), hi = Math.max(...yrs, 1998);

    const inst = chartDiv("480px");
    inst.setOption({
      title: { text: "Independence year vs. first airline founded", left: "center", textStyle: { fontSize: 14 } },
      tooltip: {
        formatter: p => `<b>${esc(p.data.name)}</b>` +
          `<br>independence ${p.data.value[0]} · first airline ${p.data.value[1]}` +
          `<br>lag ${p.data.lag > 0 ? "+" + p.data.lag : p.data.lag} yr · ${p.data.value[2]} airline(s)` +
          (p.data.contested ? `<br><span style="color:#9e1c1f">contested classification</span>` : "") +
          (p.data.note ? `<br><span style="color:#888">${esc(p.data.note)}</span>` : ""),
      },
      grid: { left: 60, right: 30, top: 50, bottom: 70 },
      xAxis: { type: "value", name: "Independence year", nameLocation: "middle", nameGap: 28,
        min: lo, max: hi, splitLine: { lineStyle: { color: "#efe2d2" } } },
      yAxis: { type: "value", name: "First airline founded", min: lo, max: hi,
        splitLine: { lineStyle: { color: "#efe2d2" } } },
      series: [
        { type: "line", silent: true, showSymbol: false, data: [[lo, lo], [hi, hi]],
          lineStyle: { color: "#b9a890", type: "dashed" }, tooltip: { show: false },
          markPoint: { silent: true, symbol: "rect", symbolSize: 0 } },
        { type: "scatter", data: pts, emphasis: { focus: "self", label: { show: true,
          formatter: p => p.data.name, position: "top", fontSize: 10 } } },
      ],
    });

    // sorted lag bar
    sectionTitle("Years from independence to first national-era airline");
    const sorted = rows.slice().sort((a, b) => (a.lag || 0) - (b.lag || 0));
    const inst2 = chartDiv(Math.max(260, sorted.length * 18) + "px");
    inst2.setOption({
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" },
        formatter: p => { const d = p[0]; return `<b>${esc(d.name)}</b><br>lag ${d.value > 0 ? "+" + d.value : d.value} yr`; } },
      grid: { left: 130, right: 40, top: 8, bottom: 30 },
      xAxis: { type: "value", name: "Lag (years)", splitLine: { lineStyle: { color: "#efe2d2" } } },
      yAxis: { type: "category", data: sorted.map(d => d.country), inverse: true, axisLabel: { fontSize: 10 } },
      series: [{ type: "bar", data: sorted.map(d => ({ value: d.lag,
        itemStyle: { color: d.lag < 0 ? "#61692d" : (d.contested ? "#9e1c1f" : "#006191") } })) }],
    });
  }

  global.Viz = { render };
})(window);
