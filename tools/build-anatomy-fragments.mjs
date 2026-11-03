import fs from "node:fs";

const muscleMeta = {
  chest: ["胸大肌", "PECTORALIS MAJOR"], shoulders: ["三角肌", "DELTOIDS"], biceps: ["肱二头肌", "BICEPS"],
  triceps: ["肱三头肌", "TRICEPS"], lats: ["背阔肌", "LATISSIMUS DORSI"], abs: ["腹部核心", "CORE"],
  glutes: ["臀部", "GLUTES"], quads: ["股四头肌", "QUADRICEPS"], hamstrings: ["腘绳肌", "HAMSTRINGS"],
  gastrocnemius: ["腓肠肌", "GASTROCNEMIUS"]
};
const views = {
  front: { file: "tools/front-preview.json", groups: [
    ["chest", ["CHEST"]], ["shoulders", ["SHOULDERS_FRONT", "SHOULDERS_SIDE"]], ["biceps", ["BICEPS"]],
    ["abs", ["CORE", "OBLIQUES"]], ["quads", ["QUADS"]], ["gastrocnemius", ["CALVES"]]
  ], passive: ["TRAPEZIUS", "TRICEPS", "FOREARMS", "ABDUCTORS", "ADDUCTORS"] },
  back: { file: "tools/back-preview.json", groups: [
    ["lats", ["LATS"]], ["shoulders", ["SHOULDERS_REAR", "SHOULDERS_SIDE"]], ["triceps", ["TRICEPS"]],
    ["glutes", ["GLUTES"]], ["hamstrings", ["HAMSTRINGS"]], ["gastrocnemius", ["CALVES"]]
  ], passive: ["TRAPEZIUS", "RHOMBOIDS", "BACK_LOWER", "FOREARMS", "ABDUCTORS", "ADDUCTORS", "OBLIQUES"] }
};
for (const [view, spec] of Object.entries(views)) {
  const data = JSON.parse(fs.readFileSync(spec.file, "utf8"));
  let out = "";
  out += `        <svg class="anatomy-svg" data-body="${view}" viewBox="170 35 684 1425" preserveAspectRatio="xMidYMid meet" role="group" aria-label="男性${view === "front" ? "正面" : "背面"}肌肉图">\n`;
  out += `          <g class="anatomy-figure">\n`;
  for (const o of data.outline) out += `            <path class="body-outline" d="${o.d}"/>\n`;
  const passive = data.muscles.filter(m => spec.passive.includes(m.group));
  if (passive.length) {
    out += `            <g class="muscle-passive" aria-hidden="true">\n`;
    for (const m of passive) out += `              <path class="muscle-path" d="${m.d}"/>\n`;
    out += `            </g>\n`;
  }
  for (const [key, groupNames] of spec.groups) {
    const [name, latin] = muscleMeta[key];
    const paths = data.muscles.filter(m => groupNames.includes(m.group));
    out += `            <g class="muscle-zone" data-muscle="${key}" data-name="${name}" data-latin="${latin}" data-count="6" role="button" tabindex="0" aria-pressed="false" aria-label="${name}，6 个训练动作">\n`;
    for (const m of paths) out += `              <path class="muscle-path" d="${m.d}"/>\n`;
    out += `            </g>\n`;
  }
  if (view === "front") {
    out += `            <g class="anatomy-annotation" aria-hidden="true">
              <path class="anatomy-hair" d="M459 151c0-26 11-47 30-58 14-8 32-9 46-2 17 9 26 28 28 52 1 5 1 10 0 15-8-10-15-18-24-24-11 8-25 13-41 16-15 2-28 4-39 1Z"/>
              <path class="anatomy-detail-line" d="M446 166c-6 3-8 11-6 18 2 8 6 13 12 15"/>
              <path class="anatomy-detail-line" d="M578 166c6 3 8 11 6 18-2 8-6 13-12 15"/>
            </g>\n`;
  } else {
    out += `            <g class="anatomy-annotation" aria-hidden="true">
              <path class="anatomy-hair" d="M457 158c1-42 23-69 55-69 33 0 54 27 55 69-10-8-19-19-25-33-13 15-31 24-53 28-11 2-21 4-32 5Z"/>
              <path class="anatomy-detail-line" d="M446 170c-6 3-8 11-6 18 2 8 6 13 12 15"/>
              <path class="anatomy-detail-line" d="M578 170c6 3 8 11 6 18-2 8-6 13-12 15"/>
            </g>\n`;
  }
  out += `          </g>\n        </svg>\n`;
  fs.writeFileSync(`tools/anatomy-${view}.svgfragment`, out);
  console.log(view, out.length);
}
