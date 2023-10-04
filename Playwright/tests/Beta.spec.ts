import { chromium, Browser, Page } from 'playwright';

async function loginAndFetchPracticeElementName(): Promise<void> {
  const browser: Browser = await chromium.launch({ channel: 'chrome' }); 
  const page: Page = await browser.newPage();
  try {
    // Login
    page.goto('https://beta.unislink.com/rpt/', { waitUntil: 'load' });
    await page.getByRole('link', { name: 'Unislink AD' }).click();
    await page.waitForLoadState('load');
    await page.getByPlaceholder('Email, phone, or Skype').fill('shanmugarajeshwaran.m@unislink.com');
    await page.getByRole('button', { name: 'Next' }).click();
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
    console.log('DATE:', date)
    //click notebook  
    await page.click('.icon-notebook');
    //click pratic
    await page.click('.ng-star-inserted.pointer.text-primary',{timeout:2000});
    // Dropdown selection
    await page.locator('body > app-root > app-layout > div > app-offsidebar > tabset > div > tab > div.col-12.list-group.text-center.offsider-pos-center > h5:nth-child(4) > span.text-primary.pointer.ng-star-inserted').click();
    await page.getByRole('combobox').click();
  await page.click('.scrollable-content > div:nth-of-type(6)');
    await page.getByRole('button', { name: 'Switch Practice' }).click();
    await page.waitForTimeout(5000);
    await page.waitForSelector('#UnislinkAD');
    // Log out (assuming there's a logout button)
    await page.getByRole('link', { name: 'Unislink AD' }).click();
    await page.waitForLoadState('load');
    await page.waitForSelector('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span');
    // Get the current practice element's name
    const newname = await page.textContent("body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span");
    console.log('New Name:', newname);
    const newdate = await page.textContent('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > i > date-display > span');
    console.log('New Date:', newdate);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

async function main() {
  try {
    await loginAndFetchPracticeElementName();
  } catch (error) {
    console.error('Main Error:', error);
  }
}
main();
