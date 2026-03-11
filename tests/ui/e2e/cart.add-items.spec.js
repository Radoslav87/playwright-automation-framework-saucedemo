const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../../../src/pages/ProductsPage');
const { products } = require('../../../src/data/products');
const { routes } = require('../../../src/config/routes');

test('add 2 products and open cart', async ({ page }) => {
    // ARRANGE
    const items = [products.onesie, products.fleeceJacket];

    // ACT
    await page.goto(routes.inventory);
    const productsPage = new ProductsPage(page);
    await productsPage.addMultipleToCart(items);
    await productsPage.openCart();

    // ASSERT
    const expectedCount = String(items.length);
    await expect(productsPage.cartBadge).toBeVisible();
    await expect(productsPage.cartBadge).toHaveText(expectedCount);
    await expect(page).toHaveURL(routes.cart);
});

