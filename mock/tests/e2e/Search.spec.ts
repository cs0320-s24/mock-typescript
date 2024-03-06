import { expect, test } from "@playwright/test";

test.beforeEach(() => {
});


test("cannot do search without logging in", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Command input")).not.toBeVisible();
});


test("cannot do search without loading csv", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1 American");
  await page.getByLabel("Submit button").click();
  await expect(page.getByText("No CSV file is loaded. Please load a file using the load command to search!")).toBeVisible();
});


test("a search gets correct response", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file census/dol_ri_earnings_disparity.csv");
  await page.getByLabel("Submit button").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1 American");
  await page.getByLabel("Submit button").click();
  await expect(page.getByText("Native American/American Indian")).toBeVisible();

});

test("search doesn't care about capitalization", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file census/dol_ri_earnings_disparity.csv");
  await page.getByLabel("Submit button").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1 american");
  await page.getByLabel("Submit button").click();
  await expect(page.getByText("Native American/American Indian")).toBeVisible();
});

test("search can handle empty response", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file census/dol_ri_earnings_disparity.csv");
  await page.getByLabel("Submit button").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 american");
  await page.getByLabel("Submit button").click();
  await expect(page.getByText("No results found for the given column specification and search term!")).toBeVisible();
});


test("can do multiple searches one after the other", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file census/dol_ri_earnings_disparity.csv");
  await page.getByLabel("Submit button").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1 American");
  await page.getByLabel("Submit button").click();
  await expect(page.getByText("Native American/American Indian")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search EmployedPercent 75");
  await page.getByLabel("Submit button").click();
  await expect(page.getByText("White")).toBeVisible();
});


test("can do view, then search", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file census/dol_ri_earnings_disparity.csv");
  await page.getByLabel("Submit button").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit button").click();
  await expect(page.getByText("White")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1 American");
  await page.getByLabel("Submit button").click();
  await expect(page.locator('text="Native American/American Indian"').first()).toBeVisible(); // we have multiple now so we need to account for that
});

test("can do search WITHOUT view first", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file census/dol_ri_earnings_disparity.csv");
  await page.getByLabel("Submit button").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1 American");
  await page.getByLabel("Submit button").click();
  await expect(page.getByText("Native American/American Indian")).toBeVisible();
  await expect(page.getByText("White")).not.toBeVisible();
});

test("Search column can be index or name", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file census/dol_ri_earnings_disparity.csv");
  await page.getByLabel("Submit button").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1 American");
  await page.getByLabel("Submit button").click();
  await expect(page.getByText("Native American/American Indian")).toBeVisible();
  
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search DataType American");
  await page.getByLabel("Submit button").click();
  await expect(page.locator('text="Native American/American Indian"').first()).toBeVisible(); // we have multiple now so we need to account for that
});

test("Search works in file with no header", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file census/dol_ri_earnings_disparity_no_header.csv");
  await page.getByLabel("Submit button").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1 American");
  await page.getByLabel("Submit button").click();
  await expect(page.getByText("Native American/American Indian")).toBeVisible();
  
});

test(" Log in, load csv, do search, then sign out and log back in. Search shouldn't work because csv needs to be loaded again", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file census/dol_ri_earnings_disparity.csv");
  await page.getByLabel("Submit button").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1 American");
  await page.getByLabel("Submit button").click();
  await expect(page.getByText("No CSV file is loaded")).not.toBeVisible();
  await expect(page.getByText("Native American/American Indian")).toBeVisible();
  await page.getByLabel("Sign Out").click();

  await page.getByLabel("Login").click();
  
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1 American");
  await page.getByLabel("Submit button").click();
  await expect(page.getByText("No CSV file is loaded. Please load a file using the load command to search!")).toBeVisible();
});

