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

    // Wait for the login to complete 
    await page.waitForSelector("body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span");

    // Get the element's text
    const Hospitalname = await page.textContent("body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span");
    const date = await page.textContent('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > i > date-display > span'); // Add your second selector here
    if (Hospitalname  === null) {
      throw new Error('Practice element not found');
    }
    if(date === null){
        throw new Error('Date not found');
    }

    console.log('Hospital Name:', Hospitalname );
    console.log('DATE:',date);

    // Perform additional actions as needed
    await page.click('.text-primary', { timeout: 2000 });

    // Dropdown selection
    await page.locator('span').nth(3).click();

    // Click on 'New Practice'
    await page.click('your_new_practice_button_selector');

    // Click 'Switch Practice' button
    await page.click('button[name="Switch Practice"]');
    
    // Wait for some time (adjust the timeout as needed)
    await page.waitForTimeout(5000);

    return Hospitalname;
    
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
