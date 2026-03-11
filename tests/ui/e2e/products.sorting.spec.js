const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../../../src/pages/ProductsPage');
const { sortOptions } = require('../../../src/data/sortOptions');
const { routes } = require('../../../src/config/routes');


test('products: sorting by price low->high orders prices ascending', async ({ page }) => {
  // ARRANGE
  await page.goto(routes.inventory);
  const productsPage = new ProductsPage(page);

  // ACT
  await expect(productsPage.inventoryItems.first()).toBeVisible();
  // sort by price (low to high)
  await productsPage.sortBy(sortOptions.priceLowToHigh);

  const pricesFromUI = await productsPage.getPrices();
  // create sorted copy of prices
  const expectedSortedPrices = [...pricesFromUI].sort((a, b) => a - b);

  // ASSERT
  expect(pricesFromUI).toEqual(expectedSortedPrices);
});