(() => {
  const results = {};
  const keys = ["chest", "shoulders", "biceps", "abs", "quads", "gastrocnemius", "lats", "triceps", "glutes", "hamstrings"];
  for (const key of keys) {
    const groups = [...document.querySelectorAll(`.muscle-zone[data-muscle="${key}"]`)];
    let hit = false;
    for (const group of groups) {
      const r = group.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      for (let y = r.top + 8; y < r.bottom - 8 && !hit; y += Math.max(8, r.height / 12)) {
        for (let x = r.left + 8; x < r.right - 8; x += Math.max(8, r.width / 12)) {
          const el = document.elementFromPoint(x, y);
          if (el && el.closest(".muscle-zone") === group) {
            hit = true;
            break;
          }
        }
      }
      if (hit) break;
    }
    results[key] = hit;
  }
  return JSON.stringify(results);
})();
