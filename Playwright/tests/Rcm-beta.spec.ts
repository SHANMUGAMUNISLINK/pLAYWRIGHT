// Import Playwright test and expect modules
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
// Define a test named 'login to beta'
test('login to beta', async ({ page }) => {
  // Go to the beta website
  await page.goto('https://beta.unislink.com/rpt/');

  // Click on the 'Unislink AD' link
  await page.getByRole('link', { name: 'Unislink AD' }).click();

  // Fill in the email field with the username from the environment variable
  await page.locator('[type="email"]').fill(process.env.USERNAME);

  // Click on the 'Next' button
  await page.getByRole('button', { name: 'Next' }).click();

  // Fill in the password field with the password from the environment variable
  await page.getByPlaceholder('Password').fill('process.env.PASSWORD');

  // Click on the 'Sign in' button
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Click on the notebook icon
  const string = await page.locator('.icon-notebook').click();

  // Print the string to the console
  console.log(string);
});