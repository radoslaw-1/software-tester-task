import { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';

const bingHomepage = "https://www.bing.com/";
const searchPhrase = "semrush";
const firstResultExpected = "www.semrush.com";

const selectors = {
  homepage: {
    searchBar: "#sb_form_q",
    cookieBanner: {
      rejectionButton: "#bnp_btn_reject",
    },
  },
  searchResults: {
    pageContent: "#b_content",
    resultsList: "#b_results li:first-of-type",
  },
}

const phraseSearch = async (page: Page, phrase: string) => {
  await page.goto(bingHomepage);
  await page.locator(selectors.homepage.cookieBanner.rejectionButton).click();
  await page.fill(selectors.homepage.searchBar, phrase);
  await page.press(selectors.homepage.searchBar, "Enter");
  await page.waitForSelector(selectors.searchResults.pageContent);
}

test.beforeEach(async ({ page }) => {
  await phraseSearch(page, searchPhrase);
});

test("verify the first result in the default search", async ({
  page
}) => {
  const firstResultCite = await page.locator(selectors.searchResults.resultsList).locator("cite").textContent();
  expect(firstResultCite).toContain(firstResultExpected);
});
