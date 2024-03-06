import { expect, test } from "@playwright/test";

test("calling view without a file loaded will fail", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit button").click();
  const expectedOutput =
    "No CSV file is loaded. Please load a file using the load command to view!";
  await expect(page.getByText(expectedOutput)).toBeVisible();
});

test("calling view with a file with headers will succeed", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page
    .getByLabel("Command input")
    .fill("load_file census/dol_ri_earnings_disparity.csv");
  await page.getByLabel("Submit button").click();

  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit button").click();

  await expect(page.getByText("State")).toBeVisible();
  await expect(page.getByText("White")).toBeVisible();
  await expect(page.getByText("Black")).toBeVisible();
});

test("calling view with a file without headers will succeed", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page
    .getByLabel("Command input")
    .fill("load_file census/dol_ri_earnings_disparity_no_header.csv");
  await page.getByLabel("Submit button").click();

  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit button").click();

  await expect(page.getByText("State")).not.toBeVisible();
  await expect(page.getByText("White")).toBeVisible();
});

test("switching csvs will succeed", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page
    .getByLabel("Command input")
    .fill("load_file census/dol_ri_earnings_disparity.csv");
  await page.getByLabel("Submit button").click();

  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit button").click();

  await expect(page.getByText("State")).toBeVisible();

  await page
    .getByLabel("Command input")
    .fill("load_file census/dol_ri_earnings_disparity_no_header.csv");
  await page.getByLabel("Submit button").click();

  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit button").click();

  await expect(page.getByText("State")).toBeVisible();
});
