const { test, expect } = require('@playwright/test');
const { products } = require('../../../src/data/products');
const { checkoutInfoValidationCases } = require('../../../src/data/checkoutInfoValidationCases');
const { goToCheckoutInformation } = require('../../../src/flows/checkoutFlow');
const { routes } = require('../../../src/config/routes');

test.describe('checkout step one - negative validations', () => {
  for (const c of checkoutInfoValidationCases) {
    test(`checkout info: ${c.name}`, async ({ page }) => {
      // ARRANGE
      const items = [products.onesie];
      const { checkoutInfoPage } = await goToCheckoutInformation(page, items);

      // ACT
      await checkoutInfoPage.fillCustomerInfo(c.user);
      await checkoutInfoPage.continue();

      // ASSERT
      await expect(checkoutInfoPage.errorMessage).toBeVisible();
      await expect(checkoutInfoPage.errorMessage).toHaveText(c.expectedError);
      await expect(page).toHaveURL(routes.checkoutStepOne);
    });
  }
});