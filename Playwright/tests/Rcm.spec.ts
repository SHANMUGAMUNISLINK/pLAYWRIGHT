import { test, expect } from '@playwright/test';

const newLocal = 'true';
test('Login to rcm', async ({ page }) => {
  
  await page.goto('https://beta.unislink.com/rcm/');
  
  await page.getByRole('button', { name: 'LOGIN WITH AD' }).click();
  
  await page.locator('[type="email"]').fill('shanmugarajeshwaran.m@unislink.com');
  
  await page.getByRole('button', { name: 'Next' }).click();
  
  await page.getByPlaceholder('Password').fill('Dur57272');
  
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.getByRole('button', { name: 'Yes' }).click();
 
  // await page.waitForLoadState('load');
 
  await page.getByRole('link', { name: 'Enterprise Reporting' }).click();
  const link = await page.getByRole('link', { name: 'Automation' });
  expect(await link.isVisible()).toBe(true);
  await link.click();
  await page.getByRole('link', { name: 'Bots' }).click();
  await page.waitForLoadState('load');
  const div = await page.getByRole('link', { name: 'Bot Dashboard' });
  await div.waitFor({state:'visible' });
  await div.click();
  const element = await page.locator('div:nth-of-type(1) > .b.bg-white.p-2');
  await element.screenshot({ path: 'link.png' });
  const dash = await page.locator('rpabotdashboard');
  await dash.screenshot({path:'full.png'});
 // console.log(dash.toString('base64'));
  
  });
