import { test, expect } from "@playwright/test";

test("homepage renders product-first, no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("A piece of Braj");
  await expect(page.getByText("Braj Object 001", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "View the collection" })).toBeVisible();
  // Collection index reaches all eight
  await expect(page.getByText("Krishna Janmabhoomi").first()).toBeVisible();
  await expect(page.getByText("Braj 84 Kos").first()).toBeVisible();
  await expect(page.getByText("Premanand Ji").first()).toBeVisible();
  expect(errors).toEqual([]);
});

test("collection and PDP work without WebGL", async ({ page, context }) => {
  await context.addInitScript(() => {
    // @ts-expect-error sabotage for fallback test
    window.WebGLRenderingContext = undefined;
    HTMLCanvasElement.prototype.getContext = () => null;
  });
  await page.goto("/collection", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Braj Objects");
  await page.goto("/collection/vishram-ghat", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Vishram Ghat");
  await expect(page.getByText("₹ TBD")).toBeVisible();
});

test("bag empty state and nav", async ({ page }) => {
  await page.goto("/bag", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("empty");
  // Mobile project has a 390px viewport where the Menu button is visible.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: /menu/i }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("no horizontal overflow at mobile width", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
});
