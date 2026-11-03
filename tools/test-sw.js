(async () => {
  const out = {};
  const swCode = `self.addEventListener("install", e => self.skipWaiting()); self.addEventListener("activate", e => self.clients.claim()); self.addEventListener("fetch", e => {});`;
  try {
    const blob = new Blob([swCode], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const reg = await navigator.serviceWorker.register(url);
    out.blob = { ok: true, scope: reg.scope };
  } catch (error) {
    out.blob = { ok: false, name: error.name, message: error.message };
  }
  try {
    const url = "data:text/javascript," + encodeURIComponent(swCode);
    const reg = await navigator.serviceWorker.register(url);
    out.data = { ok: true, scope: reg.scope };
  } catch (error) {
    out.data = { ok: false, name: error.name, message: error.message };
  }
  try {
    const reg = await navigator.serviceWorker.register("./index.html?service-worker=1", { scope: "./" });
    out.sameFile = { ok: true, scope: reg.scope };
  } catch (error) {
    out.sameFile = { ok: false, name: error.name, message: error.message };
  }
  return JSON.stringify(out);
})();
