import fs from "node:fs";

const targets = await fetch("http://127.0.0.1:9222/json/list").then((r) => r.json());
const target = targets.find((t) => t.type === "page" && t.url.includes("127.0.0.1:8123"))
  || targets.find((t) => t.type === "page");
if (!target) throw new Error("No page target");

const ws = new WebSocket(target.webSocketDebuggerUrl);
let nextId = 1;
const pending = new Map();

ws.addEventListener("message", (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(JSON.stringify(msg.error)));
    else resolve(msg.result);
  }
});

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

await new Promise((resolve) => ws.addEventListener("open", resolve, { once: true }));
await send("Page.enable");
await send("Runtime.enable");

if (process.argv[2] === "eval") {
  const source = process.argv[3].startsWith("@")
    ? fs.readFileSync(process.argv[3].slice(1), "utf8")
    : process.argv[3];
  if (process.argv[4]) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: Number(process.argv[4]),
      height: Number(process.argv[5] || 844),
      deviceScaleFactor: 1,
      mobile: Number(process.argv[4]) < 769,
    });
    await new Promise((r) => setTimeout(r, 300));
  }
  const result = await send("Runtime.evaluate", {
    expression: source,
    awaitPromise: true,
    returnByValue: true,
  });
  console.log(JSON.stringify(result, null, 2));
}

if (process.argv[2] === "screenshot") {
  if (process.argv[4]) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: Number(process.argv[4]),
      height: Number(process.argv[5] || 844),
      deviceScaleFactor: 1,
      mobile: Number(process.argv[4]) < 769,
    });
  }
  await new Promise((r) => setTimeout(r, 500));
  const result = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
  fs.writeFileSync(process.argv[3], Buffer.from(result.data, "base64"));
  console.log(`saved ${process.argv[3]}`);
}

if (process.argv[2] === "manifest") {
  const result = await send("Page.getAppManifest");
  console.log(JSON.stringify({ url: result.url, errors: result.errors, data: result.data?.slice(0, 3000) }, null, 2));
}

if (process.argv[2] === "offline-test") {
  await send("Network.enable");
  await send("Network.emulateNetworkConditions", {
    offline: true,
    latency: 0,
    downloadThroughput: 0,
    uploadThroughput: 0,
  });
  await send("Page.reload");
  await new Promise((r) => setTimeout(r, 2500));
  const result = await send("Runtime.evaluate", {
    expression: "JSON.stringify({title:document.title,hash:location.hash,zones:document.querySelectorAll('.muscle-zone').length,drawer:document.querySelector('#drawerLayer')?.classList.contains('is-open'),controller:!!navigator.serviceWorker.controller})",
    returnByValue: true,
  });
  console.log(JSON.stringify(result, null, 2));
  const shot = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
  fs.writeFileSync(process.argv[3], Buffer.from(shot.data, "base64"));
  await send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 0,
    downloadThroughput: -1,
    uploadThroughput: -1,
  });
}

if (process.argv[2] === "ios-guide") {
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await send("Emulation.setUserAgentOverride", {
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
  });
  await send("Page.addScriptToEvaluateOnNewDocument", {
    source: "window.addEventListener('beforeinstallprompt', function(e){ e.stopImmediatePropagation(); }, true);",
  });
  await send("Page.reload");
  await new Promise((r) => setTimeout(r, 1400));
  await send("Runtime.evaluate", {
    expression: "document.querySelector('.install-app--hero').click()",
  });
  await new Promise((r) => setTimeout(r, 600));
  const shot = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
  fs.writeFileSync(process.argv[3], Buffer.from(shot.data, "base64"));
  console.log("saved guide");
}

ws.close();
