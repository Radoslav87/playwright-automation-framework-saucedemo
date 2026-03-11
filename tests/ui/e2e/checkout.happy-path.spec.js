const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../../../src/pages/ProductsPage');
const { CheckoutCompletePage } = require('../../../src/pages/CheckoutCompletePage');
const { products } = require('../../../src/data/products');
const { createCheckoutUser } = require('../../../src/data/checkoutUserFactory');
const { goToCheckoutOverview } = require('../../../src/flows/checkoutFlow');
const { routes } = require('../../../src/config/routes');

test('full checkout: overview validates items and finish + back home', async ({ page }) => {
  // ARRANGE
  const checkoutUser = createCheckoutUser();
  const productsToBuy = [products.boltTshirt, products.fleeceJacket];

  // ACT
  const { overviewPage } = await goToCheckoutOverview(page, productsToBuy, checkoutUser);

  // ASSERT: overview page
  await expect(page).toHaveURL(routes.checkoutStepTwo);
  await expect(overviewPage.itemByName(products.boltTshirt.name)).toBeVisible();
  await expect(overviewPage.itemByName(products.fleeceJacket.name)).toBeVisible();
  await expect(overviewPage.itemTotal).toBeVisible();
  await expect(overviewPage.tax).toBeVisible();
  await expect(overviewPage.total).toBeVisible();

  // ACT
  await overviewPage.finish();

  // ASSERT: complete page
  await expect(page).toHaveURL(routes.checkoutComplete);

  const completePage = new CheckoutCompletePage(page);
  await expect(completePage.completeHeader).toHaveText('Thank you for your order!');
  await expect(completePage.backHomeButton).toBeVisible();

  // ACT
  await completePage.backHome();

  // ASSERT: back to inventory
  const productsPage = new ProductsPage(page);
  await expect(page).toHaveURL(routes.inventory);
  await expect(page.locator('.title')).toHaveText('Products');
  await expect(productsPage.cartBadge).toHaveCount(0);
});