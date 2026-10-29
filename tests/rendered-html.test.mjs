import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the huraneko homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>フラネコ \| Personal Homepage<\/title>/);
  assert.match(html, /フラネコの最初のセーブ/);
  assert.match(html, /アイデアを、/);
  assert.match(html, /遊べる形へ。/);
  assert.match(html, /data-scroll-scene/);
  assert.match(html, /scroll-motion/);
  assert.match(html, /portal-canvas/);
  assert.match(html, /深度/);
  assert.match(html, /huraneko1714@gmail\.com/);
  assert.match(html, /images\/huraneko-icon\.png/);
  assert.match(html, /href="\/terms"/);
  assert.match(
    html,
    /https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.neko\.tsumitask/,
  );
});

test("keeps the app and static homepage in sync", async () => {
  const [page, staticPage, appCss, staticCss, motion, particlePortal, staticMotion] =
    await Promise.all([
      readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../docs/index.html", import.meta.url), "utf8"),
      readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
      readFile(new URL("../docs/style.css", import.meta.url), "utf8"),
      readFile(new URL("../app/scroll-motion.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/particle-portal.tsx", import.meta.url), "utf8"),
      readFile(new URL("../docs/motion.js", import.meta.url), "utf8"),
    ]);

  for (const text of [page, staticPage]) {
    assert.match(text, /フラネコの最初のセーブ/);
    assert.match(text, /発想/);
    assert.match(text, /試作/);
    assert.match(text, /更新/);
    assert.match(text, /探索者データ/);
    assert.match(text, /ツミタスク/);
    assert.match(text, /Google Playで見る/);
  }

  assert.equal(appCss, staticCss);
  assert.match(appCss, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(appCss, /--scene-shift/);
  assert.match(appCss, /--quest-progress/);
  assert.match(motion, /requestAnimationFrame/);
  assert.match(motion, /--scroll-progress/);
  assert.doesNotMatch(motion, /--scene-shift/);
  assert.match(particlePortal, /createParticles\(width <= 620 \? 110 : 220\)/);
  assert.match(particlePortal, /visibilitychange/);
  assert.match(staticMotion, /requestAnimationFrame/);
  assert.match(staticMotion, /createParticles\(width <= 620 \? 110 : 220\)/);
});

test("renders the privacy policy", async () => {
  const response = await render("/privacy-policy");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>プライバシーポリシー \| フラネコ<\/title>/);
  assert.match(html, /広告配信について/);
  assert.match(html, /huraneko1714@gmail\.com/);
  assert.match(html, /href="\/terms"/);
});

test("renders the terms of service and keeps the static page in sync", async () => {
  const response = await render("/terms");
  assert.equal(response.status, 200);

  const [html, appTerms, staticTerms] = await Promise.all([
    response.text(),
    readFile(new URL("../app/terms/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../docs/terms/index.html", import.meta.url), "utf8"),
  ]);

  assert.match(html, /<title>利用規約 \| フラネコ<\/title>/);
  assert.match(html, /アプリ、Botその他のサービス/);
  assert.match(html, /消費者契約法/);
  assert.match(html, /huraneko1714@gmail\.com/);
  assert.match(html, /href="\/privacy-policy"/);

  for (const text of [appTerms, staticTerms]) {
    assert.match(text, /適用範囲/);
    assert.match(text, /自動処理と出力/);
    assert.match(text, /禁止事項/);
    assert.match(text, /有料機能/);
    assert.match(text, /保証と責任/);
    assert.match(text, /準拠法と裁判管轄/);
    assert.match(text, /制定日: 2026年10月29日/);
  }
});
