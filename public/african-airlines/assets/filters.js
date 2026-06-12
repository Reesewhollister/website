/* filters.js — facet definitions + filtering/sorting (no deps) */
(function (global) {
  // Each facet maps a UI group to a value-extractor on an airline record.
  // Multi-valued facets (scopes) return an array.
  const FACETS = [
    { key: "country",        label: "Country",              get: a => a.country },
    { key: "colonial_power", label: "Colonial Power",       get: a => a.colonial_power },
    { key: "settler",        label: "Settler Status",       get: a => a.settler },
    { key: "decolonization", label: "Decolonization",       get: a => a.decolonization },
    { key: "ownership",      label: "Ownership",            get: a => a.ownership },
    { key: "government",     label: "Govt. Involvement",    get: a => a.government },
    { key: "scopes",         label: "Service",              get: a => a.scopes },
    { key: "decade",         label: "Decade Founded",       get: a => a.decade },
    { key: "status",         label: "Status (1998)",        get: a => (a.active ? "Operating" : "Ceased") },
    { key: "flags",          label: "Data",                 get: a => {
        const t = [];
        if (a.is_stub) t.push("Stub / pending");
        if (a.review_flags && a.review_flags.length) t.push("Has review flag");
        return t;
      } },
  ];

  function valuesOf(facet, a) {
    const v = facet.get(a);
    if (v == null) return [];
    return Array.isArray(v) ? v.filter(Boolean) : [v];
  }

  // selected = { facetKey: Set(values) }
  function matches(a, selected) {
    for (const f of FACETS) {
      const sel = selected[f.key];
      if (!sel || sel.size === 0) continue;
      const vals = valuesOf(f, a);
      if (!vals.some(v => sel.has(v))) return false;
    }
    return true;
  }

  function applyFilters(list, selected) {
    return list.filter(a => matches(a, selected));
  }

  // Counts for each facet value given the OTHER active facets (faceted-search style).
  function computeCounts(list, selected) {
    const counts = {};
    for (const f of FACETS) {
      // narrow by every selected facet except this one
      const others = {};
      for (const k in selected) if (k !== f.key) others[k] = selected[k];
      const subset = applyFilters(list, others);
      const c = {};
      for (const a of subset) {
        for (const v of valuesOf(f, a)) c[v] = (c[v] || 0) + 1;
      }
      counts[f.key] = c;
    }
    return counts;
  }

  const SORTS = {
    name:     (a, b) => (a.name || "").localeCompare(b.name || ""),
    founded:  (a, b) => (a.year_founded || 9999) - (b.year_founded || 9999) || (a.name||"").localeCompare(b.name||""),
    lifespan: (a, b) => (b.lifespan || -1) - (a.lifespan || -1) || (a.name||"").localeCompare(b.name||""),
    country:  (a, b) => (a.country || "").localeCompare(b.country || "") || (a.name||"").localeCompare(b.name||""),
  };

  global.Filters = { FACETS, valuesOf, applyFilters, computeCounts, SORTS };
})(window);
