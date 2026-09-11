import { test, expect } from "@playwright/test";

const SLUGS = [
  ["krishna-janmabhoomi", "Krishna Janmabhoomi"],
  ["vishram-ghat", "Vishram Ghat"],
  ["dwarkadhish", "Dwarkadhish"],
  ["govardhan", "Govardhan"],
  ["kusum-sarovar", "Kusum Sarovar"],
  ["braj-84-kos", "Braj 84 Kos"],
  ["premanand-ji", "Premanand Ji"],
  ["sharnanand-ji", "Sharnanand Ji"],
] as const;

test.describe("PDP viewer interactions", () => {
  test("front/back toggle swaps the plate image and note", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto("/collection/krishna-janmabhoomi", { waitUntil: "domcontentloaded" });

    const stage = page.getByTestId("pdp-stage");
    const img = stage.locator("img");
    await expect(img).toBeVisible();
    await expect(img).toHaveAttribute("src", /krishna-janmabhoomi-front/);
    await expect(stage.getByText(/Face —/)).toBeVisible();

    await page.getByRole("button", { name: "Back + magnet" }).click();
    await expect(img).toHaveAttribute("src", /krishna-janmabhoomi-back/);
    await expect(stage.getByText(/Back — inset magnet disc/)).toBeVisible();
    await expect(page.getByRole("button", { name: "Back + magnet" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await page.getByRole("button", { name: "Front", exact: true }).click();
    await expect(img).toHaveAttribute("src", /krishna-janmabhoomi-front/);
    expect(errors).toEqual([]);
  });

  test("View in 3D loads a canvas or reports unavailability", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto("/collection/krishna-janmabhoomi", { waitUntil: "domcontentloaded" });

    // The tap affordance is the SSR-safe first pass; on capable devices it
    // upgrades to auto-3D shortly after hydration. Let that settle, then test
    // whichever path is live.
    await page.waitForTimeout(1500);
    const tap = page.getByRole("button", { name: "View in 3D" });
    if ((await tap.count()) > 0) {
      await tap.click();
      const canvas = page.locator("[data-canvas-shell] canvas");
      const fallback = page.getByText("Interactive 3D is not available in this browser");
      const seated = page.getByText("Drag to inspect");
      await expect(canvas.or(fallback).or(seated).first()).toBeVisible({ timeout: 20000 });
    } else {
      // auto-3D path (capable desktop): canvas arrives on its own.
      const canvas = page.locator("[data-canvas-shell] canvas");
      await expect(canvas).toBeVisible({ timeout: 20000 });
    }
    expect(errors).toEqual([]);
  });

  test("PDP without WebGL: toggle works, 3D degrades with a message", async ({
    page,
    context,
  }) => {
    await context.addInitScript(() => {
      HTMLCanvasElement.prototype.getContext = () => null;
    });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto("/collection/krishna-janmabhoomi", { waitUntil: "domcontentloaded" });

    await page.getByRole("button", { name: "Back + magnet" }).click();
    await expect(page.getByTestId("pdp-stage").locator("img")).toHaveAttribute(
      "src",
      /krishna-janmabhoomi-back/,
    );

    await page.getByRole("button", { name: "View in 3D" }).click();
    await expect(
      page.getByText("Interactive 3D is not available in this browser"),
    ).toBeVisible({ timeout: 15000 });
    expect(errors).toEqual([]);
  });

  test("all eight PDPs render with facts and gallery", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    for (const [slug, name] of SLUGS) {
      await page.goto(`/collection/${slug}`, { waitUntil: "domcontentloaded" });
      await expect(page.getByRole("heading", { level: 1 })).toContainText(name.split(" ")[0]);
      await expect(page.getByText("₹ TBD")).toBeVisible();
      // Gallery shows three studio views (hero/edge/back), no duplicate face.
      await expect(page.getByText("Three-quarter studio view")).toBeVisible();
      await expect(page.getByText("Edge and bevel macro")).toBeVisible();
      await expect(page.getByText("Rear plate with inset magnet disc")).toBeVisible();
    }
    expect(errors).toEqual([]);
  });
});

test.describe("home interactions", () => {
  test("construction slider drives the separation readout", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const slider = page.getByLabel("Exploded view separation");
    await slider.scrollIntoViewIfNeeded();
    await slider.fill("100");
    await expect(page.getByText("Separated 100%")).toBeVisible();
    await slider.fill("0");
    await expect(page.getByText("Separated 0%")).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("snap slider seats the magnet", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const slider = page.getByLabel("Magnet distance to fridge surface");
    await slider.scrollIntoViewIfNeeded();
    await slider.fill("0");
    await expect(page.getByText(/mm to contact/)).toBeVisible();
    await slider.fill("100");
    await expect(page.getByText("Seated. Holding.")).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("collection index switches the active plate", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: /Braj 84 Kos/ }).scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /Braj 84 Kos/ }).click();
    await expect(page.getByText("Braj Object 006 — Braj 84 Kos, Braj")).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("home without WebGL still has working sliders and static construction", async ({
    page,
    context,
  }) => {
    await context.addInitScript(() => {
      HTMLCanvasElement.prototype.getContext = () => null;
    });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto("/", { waitUntil: "domcontentloaded" });
    // Construction falls back to a static plate (no dead slider).
    await expect(page.getByText("Layer stack — static view for reduced motion.")).toBeVisible();
    // Snap slider is pure DOM and always works.
    const slider = page.getByLabel("Magnet distance to fridge surface");
    await slider.scrollIntoViewIfNeeded();
    await slider.fill("100");
    await expect(page.getByText("Seated. Holding.")).toBeVisible();
    expect(errors).toEqual([]);
  });
});

test.describe("flows", () => {
  test("home → collection → PDP → bag empty state", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.getByRole("link", { name: "View the collection" }).click();
    await expect(page).toHaveURL(/\/collection$/);
    await page.getByRole("link", { name: /Vishram Ghat/ }).first().click();
    await expect(page).toHaveURL(/vishram-ghat/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Vishram");
    // Concept product: disabled purchase.
    await expect(page.getByRole("button", { name: "Pricing on release" })).toBeDisabled();
    await page.getByRole("link", { name: "Bag" }).first().click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("empty");
    expect(errors).toEqual([]);
  });

  test("purchase rail links every object to its PDP", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("Take the set home.")).toBeVisible();
    const rail = page.locator("section", {
      has: page.getByRole("heading", { name: "Take the set home." }),
    });
    const links = rail.getByRole("link", { name: "View object" });
    await expect(links).toHaveCount(8);
    await links.first().click();
    await expect(page).toHaveURL(/\/collection\//);
    expect(errors).toEqual([]);
  });
});
