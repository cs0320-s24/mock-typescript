import { expect, test } from "@playwright/test";

test("mode starts at brief", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("this is a test");
  await page.getByLabel("Submit button").click();
  const expectedOutput = "Command not found: this";
  await expect(page.getByText(expectedOutput)).toBeVisible();

  const unexpectedOutput = "Command: this is a test";
  await expect(page.getByText(unexpectedOutput)).not.toBeVisible();
});

test("mode can switch to verbose", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("mode verbose");
  await page.getByLabel("Submit button").click();

  const expectedOutput1 = "Command: mode verbose";
  const expectedOutput2 = "Output: Switched to verbose mode.";

  await expect(page.getByText(expectedOutput1)).toBeVisible();
  await expect(page.getByText(expectedOutput2)).toBeVisible();
});

test("specific commands will register as not found", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("nonsense");
  await page.getByLabel("Submit button").click();
  const expectedOutput = "Command not found: nonsense";
  await expect(page.getByText(expectedOutput)).toBeVisible();
});
