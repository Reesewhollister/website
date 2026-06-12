/* search.js — Fuse.js fuzzy search over airline records */
(function (global) {
  let fuse = null;

  function build(list) {
    const data = list.map(a => ({
      ref: a,
      name: a.name || "",
      country: a.country || "",
      base: (a.detail && a.detail.base_city) || "",
      people: (a.detail && a.detail.people) || "",
      aka: (a.detail && a.detail.predecessor) || "",
    }));
    fuse = new Fuse(data, {
      includeScore: true,
      threshold: 0.38,
      ignoreLocation: true,
      keys: [
        { name: "name", weight: 0.6 },
        { name: "country", weight: 0.2 },
        { name: "base", weight: 0.1 },
        { name: "people", weight: 0.05 },
        { name: "aka", weight: 0.05 },
      ],
    });
  }

  // returns array of airline records (order = relevance) or null if query empty
  function run(query) {
    const q = (query || "").trim();
    if (!q || !fuse) return null;
    return fuse.search(q).map(r => r.item.ref);
  }

  global.Search = { build, run };
})(window);
