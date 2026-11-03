const results = {};

document.querySelector('[data-muscle="chest"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
results.open = document.querySelector("#drawerLayer").classList.contains("is-open");
results.allCards = document.querySelectorAll(".exercise-card").length;
results.filters = [...document.querySelectorAll(".filter-chip")].map((chip) => chip.textContent.trim());
results.countAll = document.querySelector("#resultCount").textContent;

document.querySelector('.filter-chip[data-filter="barbell"]').click();
results.barbellCards = document.querySelectorAll(".exercise-card").length;
results.barbellCount = document.querySelector("#resultCount").textContent;
results.barbellTags = [...document.querySelectorAll(".exercise-card .tag-accent")].map((tag) => tag.textContent);

document.querySelector('.filter-chip[data-filter="machine"]').click();
results.machineCards = document.querySelectorAll(".exercise-card").length;
results.machineTags = [...document.querySelectorAll(".exercise-card .tag-accent")].map((tag) => tag.textContent);

document.querySelector('.filter-chip[data-filter="all"]').click();
const firstCard = document.querySelector(".exercise-card");
const firstToggle = firstCard.querySelector(".exercise-toggle");
firstToggle.click();
results.expanded = firstCard.classList.contains("is-expanded");
results.ariaExpanded = firstToggle.getAttribute("aria-expanded");
results.detailVisible = getComputedStyle(firstCard.querySelector(".exercise-details")).visibility;
results.detailText = firstCard.querySelector(".detail-copy")?.textContent || "";
firstToggle.click();
results.collapsed = !firstCard.classList.contains("is-expanded");
results.ariaCollapsed = firstToggle.getAttribute("aria-expanded");

document.querySelector("#drawerClose").click();
results.closed = !document.querySelector("#drawerLayer").classList.contains("is-open");

document.querySelector('.js-view [data-value="back"]').click();
document.querySelector('[data-muscle="shoulders"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
document.querySelector('.filter-chip[data-filter="bodyweight"]').click();
results.emptyCards = document.querySelectorAll(".exercise-card").length;
results.emptyState = document.querySelector(".filter-empty strong")?.textContent || "";
document.querySelector("#drawerClose").click();

JSON.stringify(results);
