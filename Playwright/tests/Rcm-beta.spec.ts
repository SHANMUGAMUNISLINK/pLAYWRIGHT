import { test, expect,} from '@playwright/test';
import { chromium, firefox, webkit } from 'playwright';
test('login to beta', async ({ page }) => {
   const browser = await firefox.launch();
  page.goto('https://beta.unislink.com/rpt/',{waitUntil: 'load'});
 
  await page.getByRole('link', { name: 'Unislink AD' }).click();
  await page.waitForLoadState('load');
  await page.getByPlaceholder('Email, phone, or Skype').click();
  await page.getByPlaceholder('Email, phone, or Skype').fill('shanmugarajeshwaran.m@unislink.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Dur57272');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.waitForLoadState('load');
  //hospital name
  const ref = await page.locator("span[title='Apex Internal Medicine PC']").textContent();
  console.log("Name: "+ref);
 //date
  const date = await page.locator('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > i > date-display > span').textContent();
  console.log("Date: "+date); 
  await page.waitForTimeout(3000);
 //select new practic
   await page.locator('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(5) > a > em').click();
   
  
   await page.locator('.text-primary').click({timeout:2000});
 //dropdown 
   await page.getByRole('dialog').locator('span').nth(3).click();
  //newpratic
  await page.getByText('Alsham Endocrinology').click();
  await page.getByRole('button', { name: 'Switch Practice' }).click();
  await page.waitForTimeout(5000);
  //asy
  const asy = await page.locator('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span').textContent();
  console.log(`Name: ${asy}`);



});
 
