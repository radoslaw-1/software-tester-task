import { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';

const bingHomepage = "https://www.bing.com/";
const searchPhrase = "semrush";

const selectors = {
  homepage: {
    searchBar: "#sb_form_q",
  },
  searchResults: {
    resultsList: "#b_results li:first-of-type",
  },
}

const phraseSearch = async (page: Page, phrase: string) => {
  await page.goto(bingHomepage);
  await page.fill(selectors.homepage.searchBar, phrase);
  await page.press(selectors.homepage.searchBar, "Enter");
  await page.waitForSelector("#b_content");
}

test.beforeEach(async ({ page }) => {
  await phraseSearch(page, searchPhrase);
});

test("verify the first result in the default search", async ({
  page
}) => {
  console.log(await page.locator(selectors.searchResults.resultsList).locator("cite").textContent());
});
