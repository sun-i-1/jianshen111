const emitted = [];
document.addEventListener("muscle:select", (event) => {
  emitted.push({ id: event.detail.id, name: event.detail.name, view: event.detail.view, count: event.detail.exerciseCount });
});
const keys = [...new Set([...document.querySelectorAll(".muscle-zone")].map((zone) => zone.dataset.muscle))];
const frontZones = [...document.querySelectorAll('.body-svg[data-body="front"] .muscle-zone')];
const backZones = [...document.querySelectorAll('.body-svg[data-body="back"] .muscle-zone')];
document.querySelector('[data-muscle="chest"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
const chest = {
  selected: document.querySelector('[data-muscle="chest"]').classList.contains("is-selected"),
  pressed: document.querySelector('[data-muscle="chest"]').getAttribute("aria-pressed"),
  drawerOpen: document.querySelector("#drawerLayer").classList.contains("is-open"),
  title: document.querySelector("#drawerTitle").textContent,
  count: document.querySelector("#drawerCount").textContent,
  cards: document.querySelectorAll(".exercise-card").length,
  event: emitted.at(-1)
};
document.querySelector("#drawerClose").click();
document.querySelector('.js-view [data-value="back"]').click();
const back = {
  activeView: document.querySelector("#stage").dataset.view,
  frontActive: document.querySelector('.body-svg[data-body="front"]').classList.contains("is-active"),
  backActive: document.querySelector('.body-svg[data-body="back"]').classList.contains("is-active"),
  zones: backZones.map((zone) => zone.dataset.muscle),
  code: document.querySelector("#stageCode").textContent
};
JSON.stringify({ keys, uniqueCount: keys.length, front: frontZones.map((z) => z.dataset.muscle), back: backZones.map((z) => z.dataset.muscle), chest, back });
