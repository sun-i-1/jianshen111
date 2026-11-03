import fs from "node:fs";
const front = fs.readFileSync("tools/anatomy-front.svgfragment","utf8");
const back = fs.readFileSync("tools/anatomy-back.svgfragment","utf8");
const html = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Anatomy two</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#fff;color:#1b1d22;font-family:"Segoe UI","PingFang SC",sans-serif}
header{padding:20px 32px;border-bottom:1px solid #eceef1;display:flex;justify-content:space-between;align-items:center}
header strong{font-size:19px;letter-spacing:.06em}.nav{display:flex;gap:24px;font:600 10px/1 monospace;color:#7c818c;letter-spacing:.12em}
.layout{display:grid;grid-template-columns:440px minmax(0,1fr);min-height:calc(100vh - 68px)}
.intro{padding:82px 42px}.eyebrow{font:600 10px/1.2 monospace;letter-spacing:.16em;color:#7e838e;text-transform:uppercase}
h1{font-size:52px;line-height:1.06;letter-spacing:-.055em;margin:26px 0 22px;font-weight:800}h1 span{font-family:serif;font-weight:500;color:#f15a32;display:block;letter-spacing:-.07em}
p.lede{font-size:15px;line-height:1.8;color:#626872;max-width:360px}
.stats{margin-top:34px;padding-top:18px;border-top:1px solid #eceef1;display:flex;gap:22px;font:600 9px/1.4 monospace;color:#7c818c;letter-spacing:.05em}.stats b{font-family:"Segoe UI";font-size:21px;color:#20232a;letter-spacing:-.04em;margin-right:3px}
.stage{margin:24px 28px 24px 0;background:#f7f8fa;border:1px solid #e8eaee;border-radius:28px;padding:24px 22px 16px;position:relative;display:flex;flex-direction:column;min-height:0}
.stage-head{display:flex;justify-content:space-between;font:600 8px/1.2 monospace;letter-spacing:.15em;text-transform:uppercase;color:#8b909a;padding:2px 8px 0;z-index:2}
.pair{flex:1;display:grid;grid-template-columns:1fr 1px 1fr;gap:22px;align-items:stretch;min-height:0;padding:8px 4px 0}
.pane{display:flex;flex-direction:column;min-height:0;position:relative}
.art{flex:1;display:flex;align-items:center;justify-content:center;min-height:0;padding:8px 0}
.anatomy-svg{width:100%;height:100%;max-height:670px;overflow:visible;display:block}
.body-outline{fill:#fbfbfc;stroke:#555b68;stroke-width:3.1;stroke-linejoin:round;stroke-linecap:round}
.muscle-path{fill:#f1f2f4;stroke:#8a909c;stroke-width:1.75;stroke-linejoin:round;stroke-linecap:round;transition:fill .18s,stroke .18s}
.muscle-passive .muscle-path{fill:#f7f8fa;stroke:#cbd0d7;stroke-width:1.15}
.muscle-zone{cursor:pointer;outline:none}
.muscle-zone:hover .muscle-path,.muscle-zone.is-hovered .muscle-path{fill:#fce5dc;stroke:#e56b4c}
.muscle-zone.is-selected .muscle-path{fill:#f15a32;stroke:#a93b20;stroke-width:2}
.muscle-zone:focus-visible .muscle-path{stroke:#1a1c20;stroke-width:3}
.anatomy-detail-line{fill:none;stroke:#6c727d;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.caption{display:flex;justify-content:center;align-items:baseline;gap:10px;font:600 9px/1.2 monospace;color:#8a8f99;letter-spacing:.1em;padding:8px 0 3px;text-transform:uppercase}
.caption b{font-family:"PingFang SC","Microsoft YaHei",sans-serif;font-size:11px;color:#4d525c;letter-spacing:.08em;font-weight:600}
.caption i{font-style:normal;color:#c1c5cc}.divider{background:#e4e6ea;margin-top:30px;margin-bottom:20px}
.focus{position:absolute;top:52px;left:50%;transform:translateX(-50%);z-index:3;display:flex;gap:8px;align-items:center;padding:8px 12px;background:#fff;border:1px solid #e3e5e9;border-radius:99px;box-shadow:0 2px 8px rgba(20,24,30,.04);font:600 10px/1 monospace;color:#a4a8b0;letter-spacing:.03em;white-space:nowrap}
.focus strong{font:700 11px/1 "PingFang SC",sans-serif;color:#555b65;letter-spacing:.02em}.focus.selected{background:#fff5f0;border-color:#f5c9b9}.focus.selected strong{color:#be4d2b}
.dot{width:5px;height:5px;border-radius:50%;background:#e7e9ed}.focus.selected .dot{background:#f15a32;box-shadow:0 0 0 4px #fce6de}
.hint{position:absolute;left:24px;bottom:14px;border:1px solid #e1e3e8;background:#fff;border-radius:99px;padding:8px 12px;font:500 9px/1.2 "PingFang SC",sans-serif;color:#7c818b;letter-spacing:.02em;display:inline-flex;gap:8px;align-items:center}
.hint svg{width:12px;height:12px;color:#f15a32}.code{position:absolute;right:24px;bottom:18px;font:600 8px/1.2 monospace;letter-spacing:.1em;color:#a5a9b1}
@media(max-width:768px){header{padding:14px 16px}.nav{display:none}.layout{display:block;min-height:0}.intro{padding:28px 20px 16px}h1{font-size:44px;margin:16px 0}.lede{font-size:14px}.stage{margin:8px 16px 20px;padding:16px 10px 12px;height:600px;border-radius:22px}.pair{grid-template-columns:1fr;gap:0}.pane[data-pane="back"]{display:none}.pane[data-pane="front"].active{display:flex}.divider{display:none}.anatomy-svg{max-height:500px}.focus{top:43px;font-size:9px}.hint{display:none}.caption{padding:2px}.stats{margin-top:22px}}
</style></head><body>
<header><strong>肌理 MUSCLE ATLAS</strong><div class="nav"><span>MUSCLE MAP</span><span>ACTIONS</span><span>FRONT / BACK</span></div></header>
<div class="layout"><section class="intro"><div class="eyebrow">INTERACTIVE MUSCLE MAP / 01</div><h1>点准肌群，<span>练对动作。</span></h1><p class="lede">从身体出发，选择任意肌群，即刻查看针对性的训练动作、循环演示与专业要点。</p><div class="stats"><span><b>10</b>肌群</span><span><b>60</b>动作</span><span><b>0</b>登录</span></div></section>
<section class="stage"><div class="stage-head"><span>● INTERACTIVE ANATOMY</span><span>MALE · DUAL VIEW</span></div>
<div class="focus" id="focus"><span class="dot"></span><strong id="focusName">选择一块肌群</strong><span id="focusMeta">HOVER / TAP</span></div>
<div class="pair">
<figure class="pane" data-pane="front"><div class="art">${front}</div><figcaption class="caption"><b>正面</b><i>/</i>ANTERIOR</figcaption></figure>
<div class="divider"></div>
<figure class="pane" data-pane="back"><div class="art">${back}</div><figcaption class="caption"><b>背面</b><i>/</i>POSTERIOR</figcaption></figure>
</div>
<div class="hint"><svg viewBox="0 0 16 16" fill="none"><path d="M8 2v5.2l2.7 1.5M14.5 8A6.5 6.5 0 1 1 1.5 8a6.5 6.5 0 0 1 13 0Z" stroke="currentColor" stroke-width="1.3"/></svg>轻点肌群 · 查看动作</div>
<div class="code">10 MUSCLE GROUPS</div>
</section></div>
<script>
const focus=document.getElementById('focus'), name=document.getElementById('focusName'), meta=document.getElementById('focusMeta');
document.querySelectorAll('.muscle-zone').forEach(z=>{
  z.addEventListener('mouseenter',()=>{document.querySelectorAll('.muscle-zone.is-hovered').forEach(x=>x.classList.remove('is-hovered'));z.classList.add('is-hovered');name.textContent=z.dataset.name;meta.textContent='CLICK TO VIEW';focus.classList.add('selected');});
  z.addEventListener('mouseleave',()=>{document.querySelectorAll('.muscle-zone.is-hovered').forEach(x=>x.classList.remove('is-hovered'));name.textContent='选择一块肌群';meta.textContent='HOVER / TAP';focus.classList.remove('selected');});
  z.addEventListener('click',()=>{document.querySelectorAll('.muscle-zone.is-selected').forEach(x=>x.classList.remove('is-selected'));document.querySelectorAll('[data-muscle="'+z.dataset.muscle+'"]').forEach(x=>x.classList.add('is-selected'));name.textContent=z.dataset.name;meta.textContent='已选中';focus.classList.add('selected');});
});
document.querySelectorAll('[data-pane="front"] .muscle-zone, [data-pane="back"] .muscle-zone').forEach(z=>z.setAttribute('aria-pressed','false'));
</script></body></html>`;
fs.writeFileSync("anatomy-preview-two.html", html);
console.log("wrote", html.length);
