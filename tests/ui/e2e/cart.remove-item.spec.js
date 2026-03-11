const { test, expect } = require('@playwright/test');
const { products } = require('../../../src/data/products');
const { goToCartWithProducts } = require('../../../src/flows/cartFlow');

test('cart: remove one product updates badge and cart contents', async ({ page }) => {
  // ARRANGE
  const firstProduct = products.bikeLight;
  const secondProduct = products.fleeceJacket;
  const items = [firstProduct, secondProduct];

  // ACT
  const { productsPage, cartPage } = await goToCartWithProducts(page, items);

  // ASSERT: initial cart state
  const expectedCount = String(items.length);
  await expect(productsPage.cartBadge).toHaveText(expectedCount);
  await expect(cartPage.itemByName(firstProduct.name)).toBeVisible();
  await expect(cartPage.itemByName(secondProduct.name)).toBeVisible();

  // ACT
  await cartPage.removeItem(firstProduct);

  // ASSERT: cart is updated after removal
  await expect(cartPage.cartItems).toHaveCount(1);
  await expect(cartPage.itemByName(firstProduct.name)).toHaveCount(0);
  await expect(cartPage.itemByName(secondProduct.name)).toBeVisible();

  // ACT
  await page.goBack();

  // ASSERT
  await expect(productsPage.cartBadge).toHaveText('1');
});