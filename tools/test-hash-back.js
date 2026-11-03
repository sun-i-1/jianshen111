(async () => {
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const click = (selector) => document.querySelector(selector).dispatchEvent(new MouseEvent("click", { bubbles: true }));
  location.hash = "";
  await wait(120);
  if (document.querySelector("#drawerLayer").classList.contains("is-open")) {
    document.querySelector("#drawerClose").click();
    await wait(100);
  }
  click(".anatomy-pane[data-pane=front] [data-muscle=chest]");
  await wait(150);
  document.querySelector("#drawerClose").click();
  await wait(120);
  click(".anatomy-pane[data-pane=back] [data-muscle=lats]");
  await wait(160);
  const before = location.hash;
  history.back();
  await wait(300);
  return JSON.stringify({
    beforeBack: before,
    afterBack: location.hash,
    drawerOpen: document.querySelector("#drawerLayer").classList.contains("is-open"),
    title: document.querySelector("#drawerTitle").textContent,
    selectedMuscles: [...document.querySelectorAll(".muscle-zone.is-selected")].map((z) => z.dataset.muscle)
  });
})();
