import { Page } from "@playwright/test";
import { test, expect } from "@playwright/test";

// TODO: think of a way to verify the results are relevant to the search phrase
// TODO: fix the issue where Bing randomly opens search results in new tabs

const bingHomepage = "https://www.bing.com";
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
    tabs: {
      images: "#b-scopeListItem-images",
      videos: "#b-scopeListItem-video",
      news: "#b-scopeListItem-news",
    },
    pageContent: "#b_content",
    resultsList: "#b_results li:first-of-type",
  },
};

const phraseSearch = async (page: Page, phrase: string) => {
  await page.goto(bingHomepage);
  await page.locator(selectors.homepage.cookieBanner.rejectionButton).click();
  await page.fill(selectors.homepage.searchBar, phrase);
  await page.press(selectors.homepage.searchBar, "Enter");
  await page.waitForSelector(selectors.searchResults.pageContent);
};

test.beforeEach(async ({ page }) => {
  await phraseSearch(page, searchPhrase);
});

test("verify the first result in the default search", async ({ page }) => {
  const firstResultCite = await page
    .locator(selectors.searchResults.resultsList)
    .locator("cite")
    .textContent();
  expect(firstResultCite).not.toBeNull();
  expect(firstResultCite).toContain(firstResultExpected);
});

for (const [key, id] of Object.entries(selectors.searchResults.tabs)) {
  test(`verify the ${key} filter`, async ({ page }) => {
    await page.locator(id).click();
    await page.waitForURL((url) =>
      url.toString().startsWith(`${bingHomepage}/${key}`)
    );
    expect(page.url().startsWith(`${bingHomepage}/${key}`)).toBeTruthy();
  });
}
