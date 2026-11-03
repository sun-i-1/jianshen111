(async () => {
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const out = {};

  location.hash = "";
  await wait(120);
  if (document.querySelector("#drawerLayer").classList.contains("is-open")) {
    document.querySelector("#drawerClose").click();
    await wait(120);
  }

  const chest = document.querySelector('.anatomy-pane[data-pane="front"] [data-muscle="chest"]');
  chest.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  await wait(160);
  out.afterClick = {
    hash: location.hash,
    drawerOpen: document.querySelector("#drawerLayer").classList.contains("is-open"),
    title: document.querySelector("#drawerTitle").textContent,
    selected: chest.classList.contains("is-selected"),
    focus: document.querySelector("#focusName").textContent
  };

  history.back();
  await wait(250);
  out.afterBack = {
    hash: location.hash,
    drawerOpen: document.querySelector("#drawerLayer").classList.contains("is-open"),
    selectedCount: document.querySelectorAll(".muscle-zone.is-selected").length
  };

  document.querySelector('.anatomy-pane[data-pane="back"] [data-muscle="lats"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  await wait(160);
  out.lats = {
    hash: location.hash,
    drawerOpen: document.querySelector("#drawerLayer").classList.contains("is-open"),
    title: document.querySelector("#drawerTitle").textContent
  };

  const firstExercises = document.querySelectorAll(".exercise-card").length;
  out.cards = firstExercises;

  document.querySelector("#drawerClose").click();
  await wait(120);
  out.afterClose = {
    hash: location.hash,
    drawerOpen: document.querySelector("#drawerLayer").classList.contains("is-open"),
    selected: document.querySelectorAll(".muscle-zone.is-selected").length
  };

  return JSON.stringify(out);
})();
