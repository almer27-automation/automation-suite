const { test, expect } = require('@playwright/test');
const { generateUniqueString } = require('../src/utils');

test('Playwright form test', async ({ page }) => {
  const uniqueUser = generateUniqueString('user');
  
  await page.goto('https://www.saucedemo.com/');
  await page.fill('input[data-test="username"]', 'standard_user');
  await page.fill('input[data-test="password"]', 'secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  
  await expect(page).toHaveURL(/dashboard/);
});