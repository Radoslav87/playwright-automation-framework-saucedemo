const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutInformationPage } = require('../pages/CheckoutInformationPage');
const { CheckoutOverviewPage } = require('../pages/CheckoutOverviewPage');
const { routes } = require('../config/routes');

// Reusable flow: go from inventory to checkout overview page
async function goToCheckoutOverview(page, productsToBuy, checkoutUser) {
  await page.goto(routes.inventory);

  const productsPage = new ProductsPage(page);

  await productsPage.addMultipleToCart(productsToBuy);

  await productsPage.openCart();

  const cartPage = new CartPage(page);
  await cartPage.checkout();

  const checkoutInfoPage = new CheckoutInformationPage(page);
  await checkoutInfoPage.fillCustomerInfo(checkoutUser);
  await checkoutInfoPage.continue();

  const overviewPage = new CheckoutOverviewPage(page);

  return { productsPage, cartPage, checkoutInfoPage, overviewPage };
}
module.exports = { goToCheckoutOverview };

// Reusable flow: go only to checkout step one page
// Useful for negative checkout validation scenarios
async function goToCheckoutInformation(page, productsToBuy) {
  await page.goto(routes.inventory);

  const productsPage = new ProductsPage(page);
  await productsPage.addMultipleToCart(productsToBuy);
  await productsPage.openCart();

  const cartPage = new CartPage(page);
  await cartPage.checkout();

  const checkoutInfoPage = new CheckoutInformationPage(page);

  return { productsPage, cartPage, checkoutInfoPage };
}

module.exports = { goToCheckoutOverview, goToCheckoutInformation };