import fs from "node:fs"; import vm from "node:vm";
function load(file){let src=fs.readFileSync(file,"utf8"); const outline=src.match(/const OUTLINE: OutlinePath\[\] = (\[[\s\S]*?\n\]);/)[1]; const muscles=src.match(/const MUSCLES: MusclePath\[\] = (\[[\s\S]*?\n\]);/)[1]; const c={};vm.createContext(c);vm.runInContext("o="+outline+";m="+muscles+";",c); return { outline:c.o, muscles:c.m, viewBox:(src.match(/viewBox: "([^"]+)"/)||[])[1] };}
fs.writeFileSync("tools/front-preview.json", JSON.stringify(load("tools/male-front.ts")));
fs.writeFileSync("tools/back-preview.json", JSON.stringify(load("tools/male-back.ts")));
console.log("written");
