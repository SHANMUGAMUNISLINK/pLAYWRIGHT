import { firefox, Browser, Page } from 'playwright';

const links = [
  'https://beta.unislink.com/rpt/',
  'https://beta.unislink.com/rpt/',
];

async function loginAndGetElementText(): Promise<void> {
  const browser: Browser = await firefox.launch();
  const page: Page = await browser.newPage();

  try {
    for (const link of links) {
      await page.goto(link);

      // Check if the current page is the login page and fill in the credentials
      if (link === 'https://beta.unislink.com/rpt/') {
        await page.getByRole('link', { name: 'Unislink AD' }).click();
        await page.waitForLoadState('load');
        await page.getByPlaceholder('Email, phone, or Skype').fill('shanmugarajeshwaran.m@unislink.com');
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByPlaceholder('Password').click();
        await page.getByPlaceholder('Password').fill('Dur57272');
        await page.getByRole('button', { name: 'Sign in' }).click();
        await page.getByRole('button', { name: 'Yes' }).click();
        await page.waitForLoadState('load');
        // You may need to adjust selectors and waiting conditions for successful login
      }

      const nextname = page.locator('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span');
      console.log('New pratic: ', await nextname.textContent());

      const nextdate = await page.locator('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > i > date-display > span');
      console.log('New Date: ', await nextdate.textContent());

      // Perform additional actions as needed
    await page.click('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(5) > a', { timeout: 2000 });
    // Dropdown selection
     await page.locator('body > app-root > app-layout > div > app-offsidebar > tabset > div > tab > div.col-12.list-group.text-center.offsider-pos-center > h5:nth-child(4) > span.text-primary.pointer.ng-star-inserted').click();
    // Click on 'New Practice'
     await page.click('body > modal-container > div > div > div.modal-body > div > div > div.col-8.p-0 > combo-component > ng-select > div > span');
     // Click 'Switch Practice' button
     await page.waitForSelector('#a75367fb3e07-3 > span');
    //next praric
    await page.locator('#a75367fb3e07-3 > span').click();
    //switch practice
    await page.click('body > modal-container > div > div > div.modal-footer > button');
     await page.waitForTimeout(5000);

      // Perform any additional actions or store the data as needed

      // Logout logic (if applicable) can also be added here
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

async function main() {
  try {
    await loginAndGetElementText();
  } catch (error) {
    console.error('Main Error:', error);
  }
}

main();