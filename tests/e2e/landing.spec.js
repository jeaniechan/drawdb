import { expect, test } from "@playwright/test";

test("loads landing page and allows navigation to editor", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Draw, Copy, and Paste" }),
  ).toBeVisible();
  await expect(page.getByTestId("landing-try-editor")).toBeVisible();

  await page.getByTestId("landing-try-editor").click();
  await expect(page).toHaveURL(/\/editor/);
  await expect(page.locator("body")).toContainText("Diagrams/");
});
