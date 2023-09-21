import { test, expect } from '@playwright/test';


test('Login to rcm', async ({ page }) => {
  await page.goto('https://beta.unislink.com/rcm/');
  await page.getByRole('button', { name: 'LOGIN WITH AD' }).click();
  await page.locator('[type="email"]').fill('shanmugarajeshwaran.m@unislink.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByPlaceholder('Password').fill('Dur57272');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.waitForLoadState('load');
  await page.getByRole('link', { name: 'Enterprise Reporting' }).click();
  const link = page.getByRole('link', { name: 'Automation' });
  expect(await link.isVisible()).toBe(true);
  await link.click();
  await page.getByRole('link', { name: 'Bots' }).click();
  await page.waitForLoadState('load');
  const div = page.locator('a#bot-dashboard');
  await div.click();
  await page.waitForLoadState('load');
  
  const dash = page.getByRole('link', { name: 'Bot Dashboard' });
  await dash.screenshot({path:'full.png'});
  const element = page.locator('div:nth-of-type(1) > .b.bg-white.p-2');
  await page.waitForTimeout(7000);
  try {
     const collection = page.locator('div:nth-of-type(1) > .b.bg-white.p-2');
    await page.waitForSelector('element', { state: 'visible' });
  
   
    await collection.screenshot({ path: 'element_screenshot.png' });
  } catch (error) {
   
    console.error(`Error: ${error.message}`);
    await page.screenshot({ path: 'error_screenshot.png' });
  }
  
  

});