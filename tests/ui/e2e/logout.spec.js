const { test, expect } = require('@playwright/test');
const { SiteMenu } = require('../../../src/pages/SiteMenu');
const { LoginPage } = require('../../../src/pages/LoginPage');
const { routes } = require('../../../src/config/routes');

test('logout: user can log out from side menu', async ({ page }) => {
  // ARRANGE
  await page.goto(routes.inventory);
  const menu = new SiteMenu(page);

  // ACT
  await menu.logout();

  // ASSERT
  await expect(page).toHaveURL(routes.login);

  const loginPage = new LoginPage(page);
  await expect(loginPage.loginButton).toBeVisible();
  await expect(loginPage.userNameInput).toBeVisible();
});