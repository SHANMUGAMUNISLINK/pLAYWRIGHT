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
  await page.getByPlaceholder('Password').fill('Shanmugam@1997');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.waitForLoadState('load');
  //hospital name
  const ref = await page.locator('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span').textContent();
  console.log("Name: "+ref);
 //date
  const date = await page.locator('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > i > date-display > span').textContent();
  console.log("Date: "+date); 
 
 //select new practic
 await page.locator('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(5) > a').click();
 //
 await page.locator('body > app-root > app-layout > div > app-offsidebar > tabset > div > tab > div.col-12.list-group.text-center.offsider-pos-center > h5:nth-child(4) > span.text-primary.pointer.ng-star-inserted').click();
 await page.waitForTimeout(3000);
 //dropdown
const clk=await page.locator('body > modal-container > div > div > div.modal-body > div > div > div.col-8.p-0 > combo-component > ng-select > div > div > div.ng-input > input[type=text]');
clk.click();
clk.fill("MS PHYSICIANS GROUP");
await page.waitForTimeout(2000);
clk.press('Enter');
  
 
// await clk .click();

//
await page.locator('.btn.btn-primary.btn-sm.mt-1.py-0').click();
await page.waitForTimeout(6000);
await page.getByRole('link', { name: 'Unislink AD' }).click();
const new1 = await page.locator('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span').textContent();
console.log("Name: "+new1);
//date
const date1 = await page.locator('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > i > date-display > span').textContent();
console.log("Date: "+date1); 
await page.waitForTimeout(5000);




 //    await page.locator('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(5) > a > em').click();
   
  
//    await page.locator('.text-primary').click({timeout:2000});
//  //dropdown 
//  await page.getByRole('dialog').locator('span').nth(3).click();
//   //newpratic
//   await page.getByText('Alsham Endocrinology').click();
//   await page.getByRole('button', { name: 'Switch Practice' }).click();
//   await page.waitForTimeout(5000);
//   //asy
//   const asy = await page.locator('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span').textContent();
//   console.log(`Name: ${asy}`);



});
 
