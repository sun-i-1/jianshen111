import fs from "node:fs";
const front = fs.readFileSync("tools/anatomy-front.svgfragment", "utf8");
const back = fs.readFileSync("tools/anatomy-back.svgfragment", "utf8");
const html = `    <section class="anatomy-stage" id="stage" data-view="front" aria-label="交互式人体肌肉图">
      <!--
        Interactive anatomy path data is based on MuscleMap
        (https://github.com/Jsplice/MuscleMap), Copyright (c) 2026 Jsplice / MuscleMap contributors,
        licensed under the MIT License. The layer styling and application UI are original to this project.
      -->
      <div class="an-head">
        <span class="an-kicker"><span class="an-dot" aria-hidden="true"></span>Interactive anatomy</span>
        <span class="an-code"><span>Model 01</span><i aria-hidden="true"></i><span id="stageCode">Male · Dual view</span></span>
      </div>

      <div class="an-focus" id="focusCard" aria-hidden="true">
        <span class="an-focus-dot" aria-hidden="true"></span>
        <strong id="focusName">选择一块肌群</strong>
        <span id="focusMeta">HOVER / TAP TO EXPLORE</span>
      </div>

      <div class="an-pair">
        <figure class="anatomy-pane is-active" data-pane="front">
          <div class="an-art">
${front}
          </div>
          <figcaption class="an-caption"><b>正面</b><span class="an-caption-rule" aria-hidden="true">/</span><span>ANTERIOR</span><span class="an-caption-no">01</span></figcaption>
        </figure>

        <span class="an-divider" aria-hidden="true"></span>

        <figure class="anatomy-pane" data-pane="back">
          <div class="an-art">
${back}
          </div>
          <figcaption class="an-caption"><b>背面</b><span class="an-caption-rule" aria-hidden="true">/</span><span>POSTERIOR</span><span class="an-caption-no">02</span></figcaption>
        </figure>
      </div>

      <div class="an-foot">
        <span class="an-hint">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 2v5.2l2.7 1.5M14.5 8A6.5 6.5 0 1 1 1.5 8a6.5 6.5 0 0 1 13 0Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          </svg>
          悬停高亮 · 点击肌群查看动作
        </span>
        <span class="an-count"><span class="an-count-dot" aria-hidden="true"></span>10 MUSCLE GROUPS</span>
      </div>
    </section>`;
fs.writeFileSync("tools/new-stage.html", html);
console.log("stage", html.length);
