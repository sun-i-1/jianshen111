const results = {};
const keys = [...new Set([...document.querySelectorAll(".muscle-zone")].map((zone) => zone.dataset.muscle))];
for (const key of keys) {
  const zone = document.querySelector(`.muscle-zone[data-muscle="${key}"]`);
  zone.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  const cards = [...document.querySelectorAll(".exercise-card")];
  results[key] = {
    title: document.querySelector("#drawerTitle").textContent,
    count: document.querySelector("#drawerCount").textContent,
    cards: cards.length,
    cueCount: document.querySelectorAll(".exercise-cue").length,
    sampleCue: document.querySelector(".exercise-cue span")?.textContent || "",
    equipment: document.querySelector(".exercise-card .tag-accent")?.textContent || "",
    level: document.querySelector(".exercise-card .tag:not(.tag-accent)")?.textContent || ""
  };
  document.querySelector("#drawerClose").click();
}
JSON.stringify({ keys, results });
