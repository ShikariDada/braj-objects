const { firefox } = require("@playwright/test");

(async () => {
  const browser = await firefox.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));
  await page.goto("http://127.0.0.1:3100/collection/krishna-janmabhoomi", {
    waitUntil: "domcontentloaded",
  });
  await page.waitForTimeout(2500);
  const tapCount = await page.getByRole("button", { name: "View in 3D" }).count();
  const canvasCount = await page.locator("[data-canvas-shell] canvas").count();
  console.log("tap buttons:", tapCount, "| canvases:", canvasCount);
  await page.getByRole("button", { name: "Back + magnet" }).click();
  const src = await page.getByTestId("pdp-stage").locator("img").getAttribute("src");
  console.log("plate after Back click:", src);
  const note = await page.getByTestId("pdp-stage").locator("p").last().textContent();
  console.log("note:", (note || "").trim());
  console.log("pageerrors:", errors.length ? errors : "none");
  await browser.close();
})().catch((e) => {
  console.error("FATAL", e.message);
  process.exit(1);
});
