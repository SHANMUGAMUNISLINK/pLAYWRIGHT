dotenv.config({
    path:'.env'
});
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';


test('login to beta', async ({ page }) => {
  
  await page.goto('https://beta.unislink.com/rpt/',{waitUntil: 'load'});

 
  await page.getByRole('link', { name: 'Unislink AD' }).click();

  await page.locator('[type="email"]').fill('shanmugarajeshwaran.m@unislink.com');
  //await page.locator('[type="email"]').fill(process.env.USERNAME);
//    await page.waitForTimeout(4000);
 
  await page.getByRole('button', { name: 'Next' }).click();
  
  await page.getByPlaceholder('Password').fill('Dur57272');
 // await page.getByPlaceholder('Password').fill(process.env.PASSWORD);
 await page.getByRole('button', { name: 'Sign in' }).click();
 await page.getByRole('button', { name: 'Yes' }).click();
 await page.locator('.icon-notebook').click();
 const locator = await page.locator('.font-12.p-2.text-dark.text-right > i'); 
const tex = await locator.textContent(); 
console.log("it show date:"+tex);

const string = await page.locator('.ng-star-inserted.pointer.text-primary');
await string.click();
const pass= await string.textContent();
console.log("it show hospital name:"+pass);
 
//await page.locator('.ng-arrow-wrapper').click();
//await page.locator('.ng-arrow-wrapper').click();
// const drop =await
//await page.locator('div[role="combobox"] > input[type="text"]').click();
// await drop.click();
//await drop.selectOption({value:'LAKESHORE OPEN MRI'})

await page.locator('.ng-arrow-wrapper').selectOption({ index: 2 });
//  await page.locator('.ng-arrow-wrapper').click();
//  await page.locator('.ng-arrow-wrapper').selectText()
 await page.waitForTimeout(6000);

 
});