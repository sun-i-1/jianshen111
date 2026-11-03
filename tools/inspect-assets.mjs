import fs from "node:fs";
import vm from "node:vm";
function load(file) {
  let src = fs.readFileSync(file, "utf8");
  const outline = src.match(/const OUTLINE: OutlinePath\[\] = (\[[\s\S]*?\n\]);/)[1];
  const muscles = src.match(/const MUSCLES: MusclePath\[\] = (\[[\s\S]*?\n\]);/)[1];
  const context = {};
  vm.createContext(context);
  vm.runInContext("outline=" + outline + "; muscles=" + muscles + ";", context);
  return { outline: context.outline, muscles: context.muscles, viewBox: (src.match(/viewBox: "([^"]+)"/)||[])[1], centerX: (src.match(/centerX: (\d+)/)||[])[1] };
}
for (const [name, file] of [["front","tools/male-front.ts"],["back","tools/male-back.ts"]]) {
  const d = load(file);
  console.log(name, "viewBox", d.viewBox, "centerX", d.centerX, "outline", d.outline.length, "muscles", d.muscles.length);
  const groups = {};
  for (const m of d.muscles) { groups[m.group] = (groups[m.group]||0)+1; }
  console.log(groups);
  console.log(d.muscles.slice(0,12).map(m=>({group:m.group, side:m.side, id:m.id, len:m.d.length})));
}
