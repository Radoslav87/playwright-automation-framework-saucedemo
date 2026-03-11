const { test, expect } = require('@playwright/test');
const fs = require('fs');

const { LoginPage } = require('../../../src/pages/LoginPage');
const { users } = require('../../../src/config/testUsers');
const { authDir, storageStatePath } = require('../../../src/config/authPaths');
const { routes } = require('../../../src/config/routes');

test('login and save storageState (standard user)', async ({ page }) => {
  // ARRANGE: create the auth folder for Playwright storage state
  fs.mkdirSync(authDir, { recursive: true });

  // ACT: log in with the standard user
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  // ASSERT: user is successfully redirected to inventory
  await expect(page).toHaveURL(routes.inventory);
  await expect(page.getByText('Products')).toBeVisible();

  // SAVE: persist browser session for authenticated tests
  await page.context().storageState({ path: storageStatePath });
});