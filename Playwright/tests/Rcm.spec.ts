import { test, expect } from '@playwright/test';
import puppeteer from 'puppeteer';

test('Login to rcm', async ({ browser }) => {
  // const pupp = await puppeteer.launch({headless: false});
  // const pup = await pupp.newPage();
  const context = await browser.newContext({
    storageState:"./login.json"
  })
  const page = await context.newPage();
  //URL
  await page.goto('https://beta.unislink.com/rcm/', {waitUntil: 'load'});
  //login setup
  // await page.getByRole('button', { name: 'LOGIN WITH AD' }).click();
  // await page.locator('[type="email"]').fill('shanmugarajeshwaran.m@unislink.com');
  // await page.getByRole('button', { name: 'Next' }).click();
  // await page.getByPlaceholder('Password').fill('Dur57272');
  // await page.getByRole('button', { name: 'Sign in' }).click();
  // await page.getByRole('button', { name: 'Yes' }).click();
  // await page.waitForLoadState('load');
 //RCM page
  await page.getByRole('link', { name: 'Enterprise Reporting' }).click();
  const link = page.getByRole('link', { name: 'Automation' });
  expect(await link.isVisible()).toBe(true);
  await link.click();
  //it click bot
  await page.getByRole('link', { name: 'Bots' }).click();
  await page.waitForLoadState('load');
 //it click bot dashboard
  const div = page.getByRole('link', { name: 'Bot Dashboard' }).click();
  await page.screenshot({path:'Screenshot/bot.png'})
  await page.waitForLoadState('load');
 //fullpage
  const fullpage = page.locator('rpabotdashboard');
  
  await fullpage.screenshot({path: 'Screenshot/full.png'});
  //collection
  const collection = await page.locator('div:nth-of-type(1) > .b.bg-white.p-2');
  await collection.screenshot({path:'Screenshot/collection.png'})
  //1-cent
  const Adjustment = await page.locator('div:nth-of-type(2) > .b.bg-white.p-2');
  await page.waitForSelector('div:nth-of-type(2) > .b.bg-white.p-2'); 
  await Adjustment.screenshot({path:'Screenshot/1-Cent Adjustment.png'});
 
});