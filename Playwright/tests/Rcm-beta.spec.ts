dotenv.config();
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';


test('login to beta', async ({ page }) => {
  
  await page.goto('https://beta.unislink.com/rpt/');

 
  await page.getByRole('link', { name: 'Unislink AD' }).click();

  
  await page.locator('[type="email"]').fill(process.env.USERNAME);

 
  await page.getByRole('button', { name: 'Next' }).click();
  

  await page.getByPlaceholder('Password').fill(process.env.PASSWORD);

 
  await page.getByRole('button', { name: 'Sign in' }).click();

  
  const string = await page.locator('.icon-notebook').click();


  console.log(string);
});