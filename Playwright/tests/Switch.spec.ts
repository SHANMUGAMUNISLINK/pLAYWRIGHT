import { chromium, Browser, Page } from 'playwright';

(async () => {
  const browser: Browser = await chromium.launch();
  const page: Page = await browser.newPage();
  await page.goto('https://beta.unislink.com/rpt/');

  const loginWithInput = async (hospitalName: string) => {
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

    // Select the hospital by name
    await page.locator('body > modal-container > div > div > div.modal-body > div > div > div.col-8.p-0 > combo-component > ng-select > div > span').selectOption({ label: hospitalName });
    await page.locator('body > modal-container > div > div > div.modal-footer > button').click();
    // Wait for the relevant elements to appear
    await page.waitForSelector('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span');
    
    // Get the practice element's text
    const practiceName = await page.textContent('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span');
    const date = await page.textContent('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > i > date-display > span');
    
    console.log('Practice Name:', practiceName);
    console.log('Practice DATE:', date);
  }

  
  await loginWithInput('Buckeye Medical Center');
  await loginWithInput('MS PHYSICIANS GROUP');
  

  await browser.close();
})();