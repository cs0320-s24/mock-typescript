import { expect, test } from "@playwright/test";

test("calling load without a file will fail", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("load_file");
  await page.getByLabel("Submit button").click();
  const expectedOutput = "Please input a filepath.";
  await expect(page.getByText(expectedOutput)).toBeVisible();
});

test("calling load with a file in brief will succeed", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page
    .getByLabel("Command input")
    .fill("load_file census/dol_ri_earnings_disparity.csv");
  await page.getByLabel("Submit button").click();
  const expectedOutput = "census/dol_ri_earnings_disparity.csv";
  await expect(page.getByText(expectedOutput)).toBeVisible({ timeout: 5000 });
});

test("calling load with a file in verbose will succeed", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("mode verbose");
  await page.getByLabel("Submit button").click();

  await page
    .getByLabel("Command input")
    .fill("load_file census/dol_ri_earnings_disparity.csv");
  await page.getByLabel("Submit button").click();

  const expectedOutput1 = "Output: census/dol_ri_earnings_disparity.csv";
  const expectedOutput2 =
    "Command: load_file census/dol_ri_earnings_disparity.csv";
  await expect(page.getByText(expectedOutput1)).toBeVisible({ timeout: 5000 });
  await expect(page.getByText(expectedOutput2)).toBeVisible({ timeout: 5000 });
});

test("calling load on a malformed file will fail", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("load_file malformed.csv");
  await page.getByLabel("Submit button").click();
  const expectedOutput = "Error loading file.";
  await expect(page.getByText(expectedOutput)).toBeVisible();
});

test("calling load twice will succeed", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("load_file empty.csv");
  await page.getByLabel("Submit button").click();
  const expectedOutput1 = "empty.csv";
  await expect(page.getByText(expectedOutput1)).toBeVisible();

  await page
    .getByLabel("Command input")
    .fill("load_file census/dol_ri_earnings_disparity.csv");
  await page.getByLabel("Submit button").click();
  const expectedOutput2 = "census/dol_ri_earnings_disparity.csv";
  await expect(page.getByText(expectedOutput2)).toBeVisible();
});
