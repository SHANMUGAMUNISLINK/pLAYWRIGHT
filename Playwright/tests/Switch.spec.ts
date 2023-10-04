import { chromium, Browser, Page } from 'playwright';

(async () => {
  const browser: Browser = await chromium.launch();
  const page: Page = await browser.newPage();
  await page.goto('https://beta.unislink.com/rpt/');

  const loginWithInput = async (hospitalName: string) => {
    await page.getByRole('link', { name: 'Unislink AD' }).click();
    await page.waitForLoadState('load');
    await page.getByPlaceholder('Email, phone, or Skype').fill('shanmugarajeshwaran.m@unislink.com');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByPlaceholder('Password').fill('Dur57272');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.waitForLoadState('load');
    await page.click('.icon-notebook'); 
    await page.click('.text-primary'); 

    // Select the hospital from the dropdown (if it's a select element)
    // await page.selectOption('select[name="hospital"]', { label: hospitalName });

    // Replace the following selector with the correct one for the hospital dropdown

    page.selectOption('body > modal-container > div > div > div.modal-body > div > div > div.col-8.p-0 > combo-component > ng-select > div > div > div.ng-input', { label:hospitalName });

    await page.waitForSelector('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span');
    
    // Get the practice element's text
    const practiceName = await page.textContent('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span');
    const date = await page.textContent('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > i > date-display > span');
    
    console.log('Practice Name:', practiceName);
    console.log('Practice DATE:', date);
    await page.click('.ng-input');
  }

  await loginWithInput('Buckeye Medical Center'); 
  await browser.close();
})();