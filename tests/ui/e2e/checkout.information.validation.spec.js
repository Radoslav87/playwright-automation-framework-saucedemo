const { test, expect } = require('@playwright/test');
const { products } = require('../../../src/data/products');
const { createCheckoutUser } = require('../../../src/data/checkoutUserFactory');
const { CheckoutInformationPage } = require('../../../src/pages/CheckoutInformationPage');
const { goToCartWithProducts } = require('../../../src/flows/cartFlow');
const { routes } = require('../../../src/config/routes');

test('checkout step one: fill user info and continue to step two', async ({ page }) => {
  // ARRANGE
  const items = [products.bikeLight, products.fleeceJacket];
  const checkoutUser = createCheckoutUser();

  // ACT
  const { productsPage, cartPage } = await goToCartWithProducts(page, items);
  await expect(productsPage.cartBadge).toHaveText(String(items.length));

  await cartPage.checkout();

  await expect(page).toHaveURL(routes.checkoutStepOne);
  const checkoutInformationPage = new CheckoutInformationPage(page);
  await checkoutInformationPage.fillCustomerInfo(checkoutUser);
  await checkoutInformationPage.continue();

  // ASSERT
  await expect(page).toHaveURL(routes.checkoutStepTwo);
});