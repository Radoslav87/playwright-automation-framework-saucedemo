const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { routes } = require('../config/routes');

// Reusable flow: open inventory, add products and navigate to cart
async function goToCartWithProducts(page, productsToAdd) {
  await page.goto(routes.inventory);

  const productsPage = new ProductsPage(page);
  await productsPage.addMultipleToCart(productsToAdd);
  await productsPage.openCart();

  const cartPage = new CartPage(page);
  return { productsPage, cartPage };
}

module.exports = { goToCartWithProducts };