(async () => {
  const out = {};
  document.querySelector('[data-muscle="chest"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  out.open = document.querySelector("#drawerLayer").classList.contains("is-open");
  out.filterData = [...document.querySelectorAll(".filter-chip")].map((chip) => ({
    filter: chip.dataset.filter,
    count: chip.dataset.count,
    disabled: chip.disabled,
    pressed: chip.getAttribute("aria-pressed"),
    label: chip.getAttribute("aria-label")
  }));
  out.demoLabel = document.querySelector(".demo-placeholder-label")?.textContent;
  out.demoSlots = document.querySelectorAll(".demo-placeholder").length;
  out.cards = document.querySelectorAll(".exercise-card").length;

  document.querySelector("#drawerClose").click();
  const chest = document.querySelector('.body-svg.is-active [data-muscle="chest"]');
  chest.dispatchEvent(new PointerEvent("pointerenter", { bubbles: true }));
  chest.dispatchEvent(new PointerEvent("pointerleave", { bubbles: true }));
  out.focusRestored = {
    name: document.querySelector("#focusName").textContent,
    meta: document.querySelector("#focusMeta").textContent,
    selectedClass: document.querySelector("#focusCard").classList.contains("is-selected")
  };

  document.querySelector('.js-view [data-value="back"]').click();
  out.switchingClass = document.querySelector("#stage").classList.contains("is-switching");
  out.backActive = document.querySelector('.body-svg[data-body="back"]').classList.contains("is-active");

  await new Promise((resolve) => setTimeout(resolve, 760));
  out.switchingClassAfter = document.querySelector("#stage").classList.contains("is-switching");

  document.querySelector('[data-muscle="shoulders"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  out.shoulderFilters = [...document.querySelectorAll(".filter-chip")].map((chip) => ({
    filter: chip.dataset.filter,
    count: chip.dataset.count,
    disabled: chip.disabled
  }));

  return JSON.stringify(out);
})();
