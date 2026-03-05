import { expect, test } from "@playwright/test";

async function selectDbIfPrompted(page) {
  const chooserTitle = page.getByText("Choose a database");
  if (await chooserTitle.isVisible()) {
    await page.getByText("Generic", { exact: true }).first().click();
    await page.getByRole("button", { name: "Confirm" }).click();
    await expect(chooserTitle).not.toBeVisible();
  }
}

test("can add a table from the toolbar", async ({ page }) => {
  await page.goto("/editor");
  await selectDbIfPrompted(page);

  await expect(page.getByText("Tables (0)")).toBeVisible();
  await page.getByTestId("toolbar-add-table").click();
  await expect(page.getByText("Tables (1)")).toBeVisible();
});

test("can add a note from the toolbar", async ({ page }) => {
  await page.goto("/editor");
  await selectDbIfPrompted(page);

  await expect(page.getByText("Notes (0)")).toBeVisible();
  await page.getByTestId("toolbar-add-note").click();
  await expect(page.getByText("Notes (1)")).toBeVisible();
});
