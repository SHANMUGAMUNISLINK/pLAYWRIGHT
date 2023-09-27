import { firefox, Browser, Page } from 'playwright';

 async function loginAndFetchPracticeElementName(): Promise<string> {
  const browser: Browser = await firefox.launch();
  const page: Page = await browser.newPage();

  try {
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
   await page.waitForSelector('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span');
   // Get the practice element's text
    const hospitalname = await page.textContent('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span');
    const date = await page.textContent('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > i > date-display > span'); // Add your second selector here
    if (hospitalname === null) {
      throw new Error('Practice element not found');
    }
    console.log('Hospital Name:', hospitalname);
    console.log('DATE:',date)
    // Perform additional actions as needed
    await page.click('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(5) > a', { timeout: 2000 });
   // Dropdown selection
    await page.locator('body > app-root > app-layout > div > app-offsidebar > tabset > div > tab > div.col-12.list-group.text-center.offsider-pos-center > h5:nth-child(4) > span.text-primary.pointer.ng-star-inserted').click();
   // Click on 'New Practice'
    await page.click('body > modal-container > div > div > div.modal-body > div > div > div.col-8.p-0 > combo-component > ng-select > div > span');
    // Click 'Switch Practice' button
    await page.click('button[name="Switch Practice"]');
   //next praric
   await page.click('#a75367fb3e07-3 > span');
   //switch practice
   await page.click('body > modal-container > div > div > div.modal-footer > button');
    await page.waitForTimeout(5000);
   return hospitalname;

   
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }

  return ''; // Return a default value if necessary
}

async function main() {
    
  try {
    const practiceElementName = await loginAndFetchPracticeElementName();
    console.log('Current Practice Element:', practiceElementName);
  } catch (error) {
    console.error('Main Error:', error);
  }
}

main();