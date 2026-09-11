const { chromium } = require("@playwright/test");

const BASE = process.env.SHOTS_BASE || "http://127.0.0.1:3000";

(async () => {
  const browser = await chromium.launch();
  const pages = [
    { name: "home-390", width: 390, height: 844, url: "/" },
    { name: "home-768", width: 768, height: 1024, url: "/" },
    { name: "home-1366", width: 1366, height: 900, url: "/" },
    { name: "home-1440", width: 1440, height: 900, url: "/" },
    { name: "collection-1366", width: 1366, height: 900, url: "/collection" },
    { name: "pdp-1366", width: 1366, height: 900, url: "/collection/vishram-ghat" },
    { name: "pdp-390", width: 390, height: 844, url: "/collection/vishram-ghat" },
  ];
  for (const p of pages) {
    const page = await browser.newPage({ viewport: { width: p.width, height: p.height } });
    await page.goto(`${BASE}${p.url}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `docs/qa-shots/${p.name}.png`, fullPage: true });
    console.log("shot", p.name);
    await page.close();
  }
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
