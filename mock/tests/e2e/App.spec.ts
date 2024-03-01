import { expect, test } from "@playwright/test";

test.beforeEach(() => {
  // TODO: Is there something we need to do before every test case to avoid repeating code?
});

test("on page load, i see a login button", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("on page load, i dont see the input box until login", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load, i see a button", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  //await expect(page.getByLabel("Submit button", { name: "Count is 0." })).toBeVisible();
  await expect(page.getByLabel("Submit button")).toBeVisible();
});

test("after I click the button, its label increments", async ({ page }) => {
  // Tests button counter functionality!
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Submit button").click();
  await expect(page.getByLabel("Submit button")).toBeVisible();
});

test("after I click the button, my command gets pushed", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("Awesome");
  await page.getByLabel("Submit button").click();
  const expectedOutput = "Awesome";
  await expect(page.getByText(expectedOutput)).toBeVisible();
});
