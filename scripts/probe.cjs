const { chromium } = require("@playwright/test");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  const logs = [];
  page.on("console", (m) => logs.push(m.type() + ": " + m.text().slice(0, 200)));
  page.on("pageerror", (e) => logs.push("PAGEERROR: " + String(e).slice(0, 300)));
  await page.goto("http://127.0.0.1:3000/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(15000);
  const hero = await page.evaluate(() => {
    const stage = document.querySelector("section [role='img']");
    const canvases = document.querySelectorAll("canvas");
    const imgs = [...document.querySelectorAll("section img")].map((i) => ({
      src: i.currentSrc || i.src,
      w: i.naturalWidth,
      h: i.naturalHeight,
    }));
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!c.getContext("webgl2") || !!c.getContext("webgl");
    } catch {
      webgl = false;
    }
    return {
      stageHTML: stage ? stage.outerHTML.slice(0, 500) : "NO STAGE",
      canvasCount: canvases.length,
      canvasSizes: [...canvases].map((c) => [c.width, c.height]),
      heroImgs: imgs.slice(0, 3),
      webgl,
    };
  });
  console.log(JSON.stringify(hero, null, 1));
  console.log("LOGS:", logs.slice(0, 20).join(" | "));
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
