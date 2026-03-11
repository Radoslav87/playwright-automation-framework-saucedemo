const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../src/pages/LoginPage');
const { loginCases } = require('../../../src/data/loginCases');

test('login: locked user cannot login', async ({ page }) => {
  // ARRANGE
  const loginPage = new LoginPage(page);
  const lockedUser = loginCases.lockedOutUser;

  // ACT
  await loginPage.goto();
  await loginPage.login(lockedUser.username, lockedUser.password);

  // ASSERT
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText(lockedUser.expectedError);
});