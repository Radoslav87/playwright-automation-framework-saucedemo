const { test, expect } = require('@playwright/test');
const { products } = require('../../../src/data/products');
const { goToCartWithProducts } = require('../../../src/flows/cartFlow');
const { routes } = require('../../../src/config/routes');

test('add products -> cart contains them -> proceed to checkout', async ({ page }) => {
  //Arrange
  const items = ([products.bikeLight, products.boltTshirt]);

  //Act
  const { productsPage, cartPage } = await goToCartWithProducts(page, items);

  //Assert: cart state
  const expectedCount = String(items.length);
  await expect(productsPage.cartBadge).toHaveText((expectedCount));
  await expect(page).toHaveURL(routes.cart);

  //ASSERT: cart contains the selected products
  await expect(cartPage.itemByName(products.bikeLight.name)).toBeVisible();
  await expect(cartPage.itemByName(products.boltTshirt.name)).toBeVisible();

  //Act
  await cartPage.checkout();

  //ASSERT: user is redirected to checkout step one
  await expect(page).toHaveURL(routes.checkoutStepOne);
});