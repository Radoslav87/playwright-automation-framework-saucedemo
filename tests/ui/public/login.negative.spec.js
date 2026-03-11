const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../src/pages/LoginPage');
const { loginCases } = require('../../../src/data/loginCases');

test('login: invalid password shows error message', async ({ page }) => {
  // ARRANGE
  const loginPage = new LoginPage(page);
  const invalidUser = loginCases.invalidPassword;

  // ACT
  await loginPage.goto();
  await loginPage.login(invalidUser.username, invalidUser.password);

  // ASSERT
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toHaveText(invalidUser.expectedError);
});