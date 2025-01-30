import { Page } from '@playwright/test';
import { test } from '@playwright/test';

const bingHomepage = "https://www.bing.com/";
// const searchPhrase = "semrush";
// const selectors = {}

const phraseSearch = async (page: Page) => {
  await page.goto(bingHomepage);
}

test.beforeEach(async ({ page }) => {
  await phraseSearch(page);
});
